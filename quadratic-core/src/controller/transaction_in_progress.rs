use indexmap::IndexSet;
use wasm_bindgen::JsValue;

use crate::{
    grid::{CellRef, CodeCellLanguage, CodeCellRunOutput, CodeCellRunResult, CodeCellValue},
    Error, ErrorMsg, Pos, Span,
};

use super::{
    code_cell_update::update_code_cell_value,
    operation::Operation,
    transaction_summary::TransactionSummary,
    transaction_types::{CellsForArray, JsCodeResult, JsComputeGetCells},
    transactions::{Transaction, TransactionType},
    GridController,
};

// only one InProgressTransaction can exist at a time (or no Transaction)

#[derive(Debug, Default, Clone)]
pub struct TransactionInProgress {
    reverse_operations: Vec<Operation>,
    cells_to_compute: IndexSet<CellRef>,
    pub cursor: Option<String>,
    cells_accessed: Vec<CellRef>,
    pub summary: TransactionSummary,
    pub transaction_type: TransactionType,

    // save code_cell info for async calls
    current_code_cell: Option<CodeCellValue>,
    pub current_cell_ref: Option<CellRef>,
    waiting_for_async: Option<CodeCellLanguage>,

    // true when transaction completes
    pub complete: bool,
}

impl TransactionInProgress {
    /// Creates and runs a new Transaction
    ///
    /// Description
    /// * `compute` triggers the computation cycle
    pub fn new(
        grid_controller: &mut GridController,
        operations: Vec<Operation>,
        cursor: Option<String>,
        compute: bool,
        transaction_type: TransactionType,
    ) -> Self {
        let mut transaction = Self {
            reverse_operations: vec![],
            summary: TransactionSummary::default(),
            cursor,
            transaction_type,
            cells_to_compute: IndexSet::new(),
            cells_accessed: vec![],

            current_code_cell: None,
            current_cell_ref: None,
            waiting_for_async: None,

            complete: false,
        };

        // run computations
        transaction.transact(grid_controller, operations);

        if compute {
            transaction.loop_compute(grid_controller)
        } else {
            transaction.complete = true
        }

        transaction
    }

    // loop compute cycle until complete or an async call is made
    fn loop_compute(&mut self, grid_controller: &mut GridController) {
        loop {
            self.compute(grid_controller);
            if self.waiting_for_async.is_some() {
                break;
            }
            if self.cells_to_compute.is_empty() {
                self.finalize(grid_controller);
                break;
            }
        }
    }

    /// returns the TransactionSummary
    pub fn transaction_summary(&mut self) -> TransactionSummary {
        let summary = self.summary.clone();
        self.summary.clear();
        summary
    }

    /// executes a set of operations
    fn transact(&mut self, grid_controller: &mut GridController, operations: Vec<Operation>) {
        // todo: move bounds recalculation to somewhere else?
        let mut sheets_with_changed_bounds = vec![];

        for op in operations.iter() {
            if cfg!(feature = "show-operations") {
                crate::util::dbgjs(&format!("[Operation] {:?}", op.to_string()));
            }

            if let Some(new_dirty_sheet) = op.sheet_with_changed_bounds() {
                if !sheets_with_changed_bounds.contains(&new_dirty_sheet) {
                    sheets_with_changed_bounds.push(new_dirty_sheet);
                }
            }
            let reverse_operation = grid_controller.execute_operation(
                op.clone(),
                &mut self.cells_to_compute,
                &mut self.summary,
            );
            self.reverse_operations.push(reverse_operation);
        }

        for dirty_sheet in sheets_with_changed_bounds {
            grid_controller
                .grid
                .sheet_mut_from_id(dirty_sheet)
                .recalculate_bounds();
        }
    }

    /// gets cells for use in async calculations
    pub fn get_cells(
        &mut self,
        grid_controller: &mut GridController,
        get_cells: JsComputeGetCells,
    ) -> Option<CellsForArray> {
        // ensure that the get_cells is not requesting a reference to itself
        let (current_sheet, pos) = if let Some(current_cell_ref) = self.current_cell_ref {
            let sheet = grid_controller.sheet(current_cell_ref.sheet);
            let pos = if let Some(pos) = sheet.cell_ref_to_pos(current_cell_ref) {
                pos
            } else {
                // this should only occur after an internal logic error
                crate::util::dbgjs(
                    "Expected current_cell_ref's sheet to be defined in transaction::get_cells",
                );
                return Some(CellsForArray::new(vec![], true));
            };
            (sheet, pos)
        } else {
            // this should only occur after an internal logic error
            crate::util::dbgjs(
                "Expected current_sheet_pos to be defined in transaction::get_cells",
            );
            return Some(CellsForArray::new(vec![], true));
        };

        if get_cells.rect().contains(pos) {
            // unable to find sheet by name, generate error
            let msg = if let Some(line_number) = get_cells.line_number() {
                format!("cell cannot reference itself at line {}", line_number)
            } else {
                "Sheet not found".to_string()
            };
            self.code_cell_sheet_error(grid_controller, msg, get_cells.line_number());
            self.loop_compute(grid_controller);
            return Some(CellsForArray::new(vec![], true));
        }

        let sheet_name = get_cells.sheet_name();

        // if sheet_name is None, use the sheet_id from the pos
        let sheet = sheet_name.clone().map_or_else(
            || Some(current_sheet),
            |sheet_name| grid_controller.grid.sheet_from_name(sheet_name),
        );

        if let Some(sheet) = sheet {
            let rect = get_cells.rect();
            let array = sheet.cell_array(rect);
            for y in rect.y_range() {
                for x in rect.x_range() {
                    if let Some(cell_ref) = sheet.try_get_cell_ref(Pos { x, y }) {
                        self.cells_accessed.push(cell_ref);
                    }
                }
            }
            Some(array)
        } else {
            // unable to find sheet by name, generate error
            let msg = if let (Some(sheet_name), Some(line_number)) =
                (sheet_name, get_cells.line_number())
            {
                format!("Sheet '{}' not found at line {}", sheet_name, line_number)
            } else {
                "Sheet not found".to_string()
            };
            self.code_cell_sheet_error(grid_controller, msg, get_cells.line_number());
            Some(CellsForArray::new(vec![], true))
        }
    }

    fn code_cell_sheet_error(
        &mut self,
        grid_controller: &mut GridController,
        error_msg: String,
        line_number: Option<i64>,
    ) {
        let cell_ref = if let Some(cell_ref) = self.current_cell_ref {
            cell_ref
        } else {
            panic!("Expected current_sheet_pos to be defined in transaction::code_cell_error");
        };
        let mut updated_code_cell_value =
            if let Some(code_cell_value) = self.current_code_cell.clone() {
                code_cell_value
            } else {
                panic!("Expected current_code_cell to be defined in transaction::code_cell_error");
            };
        let msg = ErrorMsg::PythonError(error_msg.clone().into());
        let span = if let Some(line_number) = line_number {
            Some(Span {
                start: line_number as u32,
                end: line_number as u32,
            })
        } else {
            None
        };
        let error = Error { span, msg };
        let result = CodeCellRunResult::Err { error };
        updated_code_cell_value.output = Some(CodeCellRunOutput {
            std_out: None,
            std_err: Some(error_msg.into()),
            result,
        });
        update_code_cell_value(
            grid_controller,
            cell_ref,
            Some(updated_code_cell_value),
            &mut Some(&mut self.cells_to_compute),
            &mut self.reverse_operations,
            &mut self.summary,
        );
        self.summary.code_cells_modified.insert(cell_ref.sheet);
        self.waiting_for_async = None;
    }

    /// finalize the compute cycle
    fn finalize(&mut self, grid_controller: &mut GridController) {
        self.complete = true;
        self.summary.save = true;
        grid_controller.finalize_transaction(self);
    }

    fn update_deps(&mut self, grid_controller: &mut GridController) {
        let old_deps = if let Some(current_code_cell) = self.current_code_cell.as_ref() {
            current_code_cell.cells_accessed_copy()
        } else {
            None
        };
        let deps = if self.cells_accessed.len() > 0 {
            Some(self.cells_accessed.clone())
        } else {
            None
        };
        if deps != old_deps {
            grid_controller.update_dependent_cells(self.current_cell_ref.unwrap(), deps, old_deps);
        }
    }

    /// continues the calculate cycle after an async call
    pub fn calculation_complete(
        &mut self,
        grid_controller: &mut GridController,
        result: JsCodeResult,
    ) {
        if self.complete {
            panic!("Transaction is already complete");
        }
        let (language, code_string) =
            if let Some(old_code_cell_value) = self.current_code_cell.clone() {
                (
                    old_code_cell_value.language,
                    old_code_cell_value.code_string,
                )
            } else {
                panic!("Expected current_code_cell to be defined in transaction::complete");
            };
        match self.waiting_for_async {
            None => {
                // this should only occur after an internal logic error
                crate::util::dbgjs("Expected transaction to be waiting_for_async to be defined in transaction::complete");
                return;
            }
            Some(waiting_for_async) => {
                match waiting_for_async {
                    CodeCellLanguage::Python => {
                        let updated_code_cell_value = result.into_code_cell_value(
                            language,
                            code_string,
                            &self.cells_accessed,
                        );
                        let cell_ref = if let Some(sheet_pos) = self.current_cell_ref {
                            sheet_pos
                        } else {
                            panic!(
                                "Expected current_sheet_pos to be defined in transaction::complete"
                            );
                        };
                        if update_code_cell_value(
                            grid_controller,
                            cell_ref,
                            Some(updated_code_cell_value),
                            &mut Some(&mut self.cells_to_compute),
                            &mut self.reverse_operations,
                            &mut self.summary,
                        ) {
                            // updates the dependencies only if the calculation was successful
                            self.update_deps(grid_controller);
                        }
                        self.waiting_for_async = None;
                    }
                    _ => {
                        crate::util::dbgjs("Transaction.complete called for an unhandled language");
                    }
                }
            }
        }
        // continue the compute loop after a successful async call
        self.loop_compute(grid_controller);
    }

    /// checks the next cell in the cells_to_compute and computes it
    /// returns true if an async call is made or the compute cycle is completed
    fn compute(&mut self, grid_controller: &mut GridController) {
        if cfg!(feature = "show-operations") {
            crate::util::dbgjs(&format!(
                "[Compute] Cells to compute: {}",
                self.cells_to_compute.len()
            ));
        }
        if let Some(cell_ref) = self.cells_to_compute.pop() {
            // todo: this would be a good place to check for cycles
            // add all dependent cells to the cells_to_compute
            if let Some(dependent_cells) = grid_controller.get_dependent_cells(cell_ref) {
                self.cells_to_compute.extend(dependent_cells);
            }

            let sheet = grid_controller.grid.sheet_mut_from_id(cell_ref.sheet);
            if let Some(pos) = sheet.cell_ref_to_pos(cell_ref) {
                if cfg!(feature = "show-operations") {
                    crate::util::dbgjs(&format!("[Compute] {:?}", pos));
                }
                // find which cells have code. Run the code and update the cells.
                // add the updated cells to the cells_to_compute

                if let Some(code_cell) = sheet.get_code_cell(pos) {
                    self.current_cell_ref = Some(cell_ref);
                    self.current_code_cell = Some(code_cell.clone());
                    let code_string = code_cell.code_string.clone();
                    let language = code_cell.language;
                    match language {
                        CodeCellLanguage::Python => {
                            // python is run async so we exit the compute cycle and wait for TS to restart the transaction
                            if !cfg!(test) {
                                let result = crate::wasm_bindings::js::runPython(code_string);

                                // run python will return false if python is not loaded (this can be generalized if we need to return a different error)
                                if result == JsValue::FALSE {
                                    let msg =
                                        "Python library not loaded (please run again)".to_string();
                                    self.code_cell_sheet_error(grid_controller, msg, None);
                                    return;
                                }
                            }
                            self.waiting_for_async = Some(language);
                        }
                        _ => {
                            crate::util::dbgjs(&format!(
                                "Compute language {} not supported in compute.rs",
                                language
                            ));
                        }
                    }
                }
            }
        }
    }
}

impl Into<Transaction> for &TransactionInProgress {
    fn into(self) -> Transaction {
        Transaction {
            ops: self.reverse_operations.clone().into_iter().rev().collect(),
            cursor: self.cursor.clone(),
        }
    }
}

impl Into<TransactionInProgress> for Transaction {
    fn into(self) -> TransactionInProgress {
        TransactionInProgress {
            cursor: self.cursor,
            ..Default::default()
        }
    }
}

#[cfg(test)]
mod test {
    use std::collections::HashSet;

    use bigdecimal::BigDecimal;

    use crate::{
        controller::{
            operation::Operation,
            transaction_types::{JsCodeResult, JsComputeGetCells},
            GridController,
        },
        grid::{CodeCellLanguage, CodeCellValue},
        wasm_bindings::controller::cells::CodeCell,
        CellValue, Pos,
    };

    #[test]
    fn test_execute_operation_set_cell_values() {
        let mut gc = GridController::new();
        let sheet_ids = gc.sheet_ids();
        let sheet = gc.grid.sheet_mut_from_id(sheet_ids[0]);
        let sheet_id = sheet.id.clone();
        sheet.set_cell_value(Pos { x: 0, y: 0 }, CellValue::Number(BigDecimal::from(10)));
        let cell_ref = sheet.get_or_create_cell_ref(Pos { x: 1, y: 0 });
        gc.set_in_progress_transaction(
            vec![Operation::SetCellCode {
                cell_ref,
                code_cell_value: Some(CodeCellValue {
                    language: CodeCellLanguage::Python,
                    code_string: "c(0, 0) + 1".to_string(),
                    formatted_code_string: None,
                    output: None,
                    last_modified: String::new(),
                }),
            }],
            None,
            true,
            crate::controller::transactions::TransactionType::Normal,
        );

        assert_eq!(
            gc.js_get_code_string(sheet_ids[0].to_string(), &Pos { x: 1, y: 0 }),
            Some(CodeCell::new(
                "c(0, 0) + 1".to_string(),
                CodeCellLanguage::Python
            ))
        );
        assert_eq!(gc.transaction_in_progress.is_some(), true);
        if let Some(transaction) = gc.transaction_in_progress.clone() {
            assert_eq!(transaction.complete, false);
            assert_eq!(transaction.cells_to_compute.len(), 0);
        }
        gc.calculation_get_cells(JsComputeGetCells::new(
            crate::Rect::single_pos(Pos { x: 0, y: 0 }),
            None,
            None,
        ));

        let result = JsCodeResult::new(true, None, None, None, Some("10".to_string()), None, None);

        let summary = gc.calculation_complete(result);
        assert_eq!(summary.save, true);
        assert_eq!(summary.code_cells_modified, HashSet::from([sheet_id]));
    }
}
