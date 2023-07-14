use serde::{Deserialize, Serialize};
use std::collections::{btree_map, BTreeMap, HashMap};
use std::hash::Hash;

mod block;
mod bounds;
mod column;
mod formatting;
mod ids;
mod value;

use self::block::CellValueOrSpill;
use crate::formulas::{FormulaError, Value};
use crate::Pos;
use block::{Block, BlockContent, CellValueBlockContent, SameValue};
pub use bounds::GridBounds;
use column::Column;
pub use ids::*;
pub use value::CellValue;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct File {
    sheet_ids: IdMap<SheetId, usize>,
    sheets: Vec<Sheet>,
}
impl Default for File {
    fn default() -> Self {
        Self::new()
    }
}
impl File {
    pub fn new() -> Self {
        let mut ret = File {
            sheet_ids: IdMap::new(),
            sheets: vec![],
        };
        ret.add_sheet();
        ret
    }

    pub fn add_sheet(&mut self) -> SheetId {
        let id = SheetId::new();
        self.sheets.push(Sheet {
            id,
            color: None,
            name: format!("Sheet {}", self.sheets.len() + 1),

            column_ids: IdMap::new(),
            row_ids: IdMap::new(),
            columns: BTreeMap::new(),
            column_widths: BTreeMap::new(),
            row_heights: BTreeMap::new(),
            code_cells: HashMap::new(),

            data_bounds: GridBounds::Empty,
            format_bounds: GridBounds::Empty,
        });
        self.sheet_ids.add(id, 0);
        id
    }

    pub fn sheets(&self) -> &[Sheet] {
        &self.sheets
    }
    pub fn sheets_mut(&mut self) -> &mut [Sheet] {
        &mut self.sheets
    }

    pub fn sheet_id_to_index(&self, id: SheetId) -> Option<usize> {
        self.sheet_ids.index_of(id)
    }
    pub fn sheet_index_to_id(&self, index: usize) -> Option<SheetId> {
        self.sheet_ids.id_at(index)
    }
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct IdMap<Id: Hash + Eq, Idx: Ord> {
    id_to_index: HashMap<Id, Idx>,
    index_to_id: BTreeMap<Idx, Id>,
}
impl<Id: Copy + Hash + Eq, Idx: Copy + Ord> IdMap<Id, Idx> {
    pub fn new() -> Self {
        Self {
            id_to_index: HashMap::new(),
            index_to_id: BTreeMap::new(),
        }
    }

    pub fn add(&mut self, id: Id, index: Idx) {
        self.id_to_index.insert(id, index);
        self.index_to_id.insert(index, id);
    }
    pub fn index_of(&self, id: Id) -> Option<Idx> {
        self.id_to_index.get(&id).copied()
    }
    pub fn id_at(&self, idx: Idx) -> Option<Id> {
        self.index_to_id.get(&idx).copied()
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Sheet {
    color: Option<[u8; 3]>,
    id: SheetId,
    name: String,

    column_ids: IdMap<ColumnId, i64>,
    row_ids: IdMap<RowId, i64>,

    columns: BTreeMap<i64, Column>,

    column_widths: BTreeMap<i64, f32>,
    row_heights: BTreeMap<i64, f32>,

    code_cells: HashMap<CellRef, CellCode>,

    data_bounds: GridBounds,
    format_bounds: GridBounds,
}
impl Sheet {
    /// Sets a cell value and returns a response object, which contains column &
    /// row IDs and the old cell value. Returns `None` if the cell was deleted
    /// and did not previously exist (so no change is needed). The reason for
    /// this is that the column and/or row may never have been generated,
    /// because there's no need.
    pub fn set_cell_value(
        &mut self,
        pos: Pos,
        value: Option<CellValueOrSpill>,
    ) -> Option<SetCellResponse<CellValueOrSpill>> {
        if value.is_none() && !self.columns.contains_key(&pos.x) {
            return None;
        }

        let (column_response, column) = self.get_or_create_column(pos.x);
        let old_value = column.values.set(pos.y, value).unwrap_or_default();
        let row_response = self.get_or_create_row(pos.y);
        Some(SetCellResponse {
            column: column_response,
            row: row_response,
            old_value,
        })
    }
    /// Returns a cell value.
    pub fn get_cell_value(&self, pos: Pos) -> CellValueOrSpill {
        self.get_column(pos.x)
            .and_then(|column| column.values.get(pos.y))
            .unwrap_or_default()
    }

    fn get_column(&self, index: i64) -> Option<&Column> {
        self.columns.get(&index)
    }
    fn get_or_create_column(&mut self, index: i64) -> (GetIdResponse<ColumnId>, &mut Column) {
        match self.columns.entry(index) {
            btree_map::Entry::Vacant(e) => {
                let column = e.insert(Column::new());
                self.column_ids.add(column.id, index);
                (GetIdResponse::new(column.id), column)
            }
            btree_map::Entry::Occupied(e) => {
                let column = e.into_mut();
                (GetIdResponse::old(column.id), column)
            }
        }
    }
    fn get_or_create_row(&mut self, index: i64) -> GetIdResponse<RowId> {
        match self.row_ids.id_at(index) {
            Some(id) => GetIdResponse::old(id),
            None => {
                let id = RowId::new();
                self.row_ids.add(id, index);
                GetIdResponse::new(id)
            }
        }
    }

    pub fn is_empty(&self) -> bool {
        self.data_bounds.is_empty() && self.format_bounds.is_empty()
    }
    pub fn clear(&mut self) {
        self.column_ids = IdMap::new();
        self.row_ids = IdMap::new();
        self.columns.clear();
        self.code_cells.clear();
        self.recalculate_bounds();
    }

    pub fn bounds(&self, ignore_formatting: bool) -> GridBounds {
        match ignore_formatting {
            true => self.data_bounds,
            false => GridBounds::merge(self.data_bounds, self.format_bounds),
        }
    }
    pub fn column_bounds(&self, x: i64, ignore_formatting: bool) -> Option<(i64, i64)> {
        let column = self.columns.get(&x)?;
        let range = column.range(ignore_formatting)?;
        Some((range.start, range.end - 1))
    }
    pub fn row_bounds(&self, y: i64, ignore_formatting: bool) -> Option<(i64, i64)> {
        let column_has_row = |(_x, column): &(&i64, &Column)| match ignore_formatting {
            true => column.has_anything_in_row(y),
            false => column.has_data_in_row(y),
        };
        let left = *self.columns.iter().find(column_has_row)?.0;
        let right = *self.columns.iter().rfind(column_has_row)?.0;
        Some((left, right))
    }

    pub fn recalculate_bounds(&mut self) {
        self.data_bounds.clear();
        self.format_bounds.clear();

        for (&x, column) in &self.columns {
            if let Some(data_range) = column.range(true) {
                let y = data_range.start;
                self.data_bounds.add(Pos { x, y });
                let y = data_range.end;
                self.data_bounds.add(Pos { x, y });
            }
            if let Some(format_range) = column.range(false) {
                let y = format_range.start;
                self.format_bounds.add(Pos { x, y });
                let y = format_range.end;
                self.format_bounds.add(Pos { x, y });
            }
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CellCode {
    language: CellCodeLanguage,
    code_string: String,
    formatted_code_string: Option<String>,
    output: Option<CellCodeRunOutput>,
}

#[derive(Serialize, Deserialize, Debug, Copy, Clone, PartialEq, Eq, Hash)]
pub enum CellCodeLanguage {
    Python,
    Formula,
    JavaScript,
    Sql,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CellCodeRunOutput {
    std_out: Option<String>,
    std_err: Option<String>,
    result: Result<CellCodeRunOk, FormulaError>,
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CellCodeRunOk {
    output_value: Value,
    cells_accessed: Vec<CellRef>,
}

#[derive(Serialize, Deserialize, Debug, Copy, Clone, PartialEq, Eq, Hash)]
pub struct SetCellResponse<V> {
    pub column: GetIdResponse<ColumnId>,
    pub row: GetIdResponse<RowId>,
    pub old_value: V,
}
#[derive(Serialize, Deserialize, Debug, Copy, Clone, PartialEq, Eq, Hash)]
pub struct GetIdResponse<I> {
    pub id: I,
    pub is_new: bool,
}
impl<I> GetIdResponse<I> {
    fn new(id: I) -> Self {
        Self { id, is_new: true }
    }
    fn old(id: I) -> Self {
        Self { id, is_new: false }
    }
}

#[cfg(test)]
mod tests;
