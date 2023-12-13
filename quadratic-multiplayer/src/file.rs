use anyhow::Result;
use quadratic_core::{
    controller::{operation::Operation, transaction_summary::TransactionSummary, GridController},
    grid::{file::import, Grid},
};

pub(crate) fn load_file(file: &str) -> Result<Grid> {
    import(file)
}

pub(crate) fn apply_string_operations(
    grid: &mut GridController,
    operations: String,
) -> Result<TransactionSummary> {
    tracing::info!("Applying operations: {}", operations);

    let operations: Vec<Operation> = serde_json::from_str(&operations)?;

    apply_operations(grid, operations)
}

pub(crate) fn apply_operations(
    grid: &mut GridController,
    operations: Vec<Operation>,
) -> Result<TransactionSummary> {
    Ok(grid.apply_received_transaction(operations))
}

#[cfg(test)]
mod tests {
    use quadratic_core::test_util::assert_cell_value;
    use quadratic_core::{Array, CellValue, SheetPos};

    use super::*;

    #[test]
    fn loads_a_file() {
        let file = load_file(include_str!("../../rust-shared/data/grid/v1_4_simple.grid")).unwrap();

        let mut grid = GridController::from_grid(file);
        let sheet_id = grid.sheet_ids().first().unwrap().to_owned();
        let sheet_rect = SheetPos {
            x: 0,
            y: 0,
            sheet_id,
        }
        .into();
        let value = CellValue::Text("hello".to_string());
        let values = Array::from(value);
        let operation = Operation::SetCellValues { sheet_rect, values };

        let _ = apply_operations(&mut grid, vec![operation]);

        assert_cell_value(&grid, sheet_id, 0, 0, "hello");
    }
}
