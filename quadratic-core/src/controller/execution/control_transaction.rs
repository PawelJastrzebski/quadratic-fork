use uuid::Uuid;

use super::{GridController, TransactionType};
use crate::{
    controller::{
        active_transactions::pending_transaction::PendingTransaction,
        operations::operation::Operation,
        transaction::Transaction,
        transaction_summary::{TransactionSummary, CELL_SHEET_HEIGHT, CELL_SHEET_WIDTH},
        transaction_types::JsCodeResult,
    },
    core_error::Result,
    Pos,
};

impl GridController {
    // loop compute cycle until complete or an async call is made
    pub(super) fn handle_transactions(&mut self, transaction: &mut PendingTransaction) {
        loop {
            if transaction.operations.is_empty() {
                transaction.complete = true;
                if transaction.has_async {
                    self.finalize_transaction(transaction);
                }
                break;
            }

            self.execute_operation(transaction);

            if transaction.waiting_for_async.is_some() {
                self.transactions.add_async_transaction(transaction.clone());
                break;
            }
        }
    }

    /// Creates and runs a new Transaction
    pub(super) fn start_transaction(&mut self, transaction: &mut PendingTransaction) {
        if matches!(transaction.transaction_type, TransactionType::User) {
            transaction.id = Uuid::new_v4();
        }

        self.handle_transactions(transaction);
    }

    /// Finalizes the transaction and pushes it to the various stacks (if needed)
    pub(super) fn finalize_transaction(&mut self, transaction: &mut PendingTransaction) {
        self.recalculate_sheet_bounds(transaction);
        match transaction.transaction_type {
            TransactionType::User => {
                let undo = transaction.to_undo_transaction();
                self.undo_stack.push(undo.clone());
                self.redo_stack.clear();
                self.transactions
                    .unsaved_transactions
                    .push((transaction.to_forward_transaction(), undo));
            }
            TransactionType::Undo => {
                let undo = transaction.to_undo_transaction();
                self.redo_stack.push(undo.clone());
                self.transactions
                    .unsaved_transactions
                    .push((transaction.to_forward_transaction(), undo));
            }
            TransactionType::Redo => {
                let undo = transaction.to_undo_transaction();
                self.undo_stack.push(undo.clone());
                self.transactions
                    .unsaved_transactions
                    .push((transaction.to_forward_transaction(), undo));
            }
            TransactionType::Multiplayer => (),
            TransactionType::MultiplayerKeepSummary => (),
            TransactionType::Unset => panic!("Expected a transaction type"),
        }
    }

    pub fn start_user_transaction(
        &mut self,
        operations: Vec<Operation>,
        cursor: Option<String>,
    ) -> TransactionSummary {
        let mut transaction = PendingTransaction {
            transaction_type: TransactionType::User,
            operations: operations.into(),
            cursor,
            ..Default::default()
        };
        self.start_transaction(&mut transaction);

        if transaction.complete {
            self.finalize_transaction(&mut transaction);
            transaction.prepare_summary(true)
        } else {
            transaction.prepare_summary(false)
        }
    }

    pub fn start_undo_transaction(
        &mut self,
        transaction: &Transaction,
        transaction_type: TransactionType,
        cursor: Option<String>,
    ) -> TransactionSummary {
        let mut pending = transaction.to_pending_transaction(transaction_type, cursor);
        pending.id = Uuid::new_v4();
        self.start_transaction(&mut pending);
        self.finalize_transaction(&mut pending);
        pending.prepare_summary(true);
        pending.summary
    }

    pub fn calculation_complete(&mut self, result: JsCodeResult) -> Result<TransactionSummary> {
        let transaction_id = Uuid::parse_str(&result.transaction_id())?;
        let mut transaction = self.transactions.remove_awaiting_async(transaction_id)?;

        if result.cancel_compute.unwrap_or(false) {
            self.handle_transactions(&mut transaction);
        }

        self.after_calculation_async(&mut transaction, result)?;

        self.finalize_transaction(&mut transaction);
        Ok(transaction.prepare_summary(transaction.complete))
    }
}

#[derive(Debug, PartialEq)]
pub struct CellHash(String);

impl CellHash {
    pub fn get(&self) -> String {
        self.0.clone()
    }
}

impl From<Pos> for CellHash {
    fn from(pos: Pos) -> Self {
        let hash_width = CELL_SHEET_WIDTH as f64;
        let hash_height = CELL_SHEET_HEIGHT as f64;
        let cell_hash_x = (pos.x as f64 / hash_width).floor() as i64;
        let cell_hash_y = (pos.y as f64 / hash_height).floor() as i64;
        let cell_hash = format!("{},{}", cell_hash_x, cell_hash_y);

        CellHash(cell_hash)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{grid::GridBounds, Array, CellValue, Pos, Rect, SheetPos, SheetRect};

    fn add_cell_value(sheet_pos: SheetPos, value: CellValue) -> Operation {
        let sheet_rect = SheetRect::single_sheet_pos(sheet_pos);

        Operation::SetCellValues {
            sheet_rect,
            values: Array::from(value),
        }
    }

    fn get_operations(gc: &mut GridController) -> (Operation, Operation) {
        let sheet_id = gc.sheet_ids()[0];
        let sheet_pos = SheetPos::from((0, 0, sheet_id));
        let value = CellValue::Text("test".into());
        let operation = add_cell_value(sheet_pos, value);
        let operation_undo = add_cell_value(sheet_pos, CellValue::Blank);
        (operation, operation_undo)
    }

    #[test]
    fn test_transactions_finalize_transaction() {
        let mut gc = GridController::new();
        let (operation, operation_undo) = get_operations(&mut gc);

        // TransactionType::User
        let mut transaction = PendingTransaction {
            transaction_type: TransactionType::User,
            operations: vec![operation].into(),
            ..Default::default()
        };
        gc.start_transaction(&mut transaction);
        gc.finalize_transaction(&mut transaction);

        assert_eq!(gc.undo_stack.len(), 1);
        assert_eq!(gc.redo_stack.len(), 0);
        assert_eq!(vec![operation_undo.clone()], gc.undo_stack[0].operations);

        // TransactionType::Undo
        let mut transaction = PendingTransaction {
            transaction_type: TransactionType::Undo,
            operations: vec![operation_undo.clone()].into(),
            ..Default::default()
        };
        gc.start_transaction(&mut transaction);
        gc.finalize_transaction(&mut transaction);

        assert_eq!(gc.undo_stack.len(), 1);
        assert_eq!(gc.redo_stack.len(), 1);
        assert_eq!(vec![operation_undo.clone()], gc.undo_stack[0].operations);
        assert_eq!(gc.redo_stack[0].operations.len(), 1);

        // TransactionType::Redo
        let mut transaction = PendingTransaction {
            transaction_type: TransactionType::Redo,
            operations: vec![operation_undo.clone()].into(),
            ..Default::default()
        };
        gc.start_transaction(&mut transaction);
        gc.finalize_transaction(&mut transaction);

        assert_eq!(gc.undo_stack.len(), 2);
        assert_eq!(gc.redo_stack.len(), 1);
        assert_eq!(vec![operation_undo.clone()], gc.undo_stack[0].operations);
        assert_eq!(gc.redo_stack[0].operations.len(), 1);
    }

    #[test]
    fn test_transactions_undo_redo() {
        let mut gc = GridController::new();
        let (operation, operation_undo) = get_operations(&mut gc);

        assert!(!gc.has_undo());
        assert!(!gc.has_redo());

        gc.start_user_transaction(vec![operation.clone()], None);
        assert!(gc.has_undo());
        assert!(!gc.has_redo());
        assert_eq!(vec![operation_undo.clone()], gc.undo_stack[0].operations);

        // undo
        gc.undo(None);
        assert!(!gc.has_undo());
        assert!(gc.has_redo());

        // redo
        gc.redo(None);
        assert!(gc.has_undo());
        assert!(!gc.has_redo());
    }

    #[test]
    fn test_transactions_transaction_summary() {
        let mut transaction = PendingTransaction::default();
        assert_eq!(
            transaction.prepare_summary(false),
            TransactionSummary::default()
        );
    }

    #[test]
    fn test_transactions_updated_bounds_in_transaction() {
        let mut gc = GridController::new();
        let (operation, _) = get_operations(&mut gc);
        assert_eq!(gc.grid().sheets()[0].bounds(true), GridBounds::Empty);

        let mut transaction = PendingTransaction {
            transaction_type: TransactionType::User,
            operations: vec![operation.clone()].into(),
            ..Default::default()
        };
        gc.start_transaction(&mut transaction);
        gc.finalize_transaction(&mut transaction);

        let expected = GridBounds::NonEmpty(Rect::single_pos((0, 0).into()));
        assert_eq!(gc.grid().sheets()[0].bounds(true), expected);
    }

    #[test]
    fn test_transactions_cell_hash() {
        let hash = "test".to_string();
        let cell_hash = CellHash(hash.clone());
        assert_eq!(cell_hash.get(), hash);

        let pos = Pos::from((0, 0));
        let cell_hash = CellHash::from(pos);
        assert_eq!(cell_hash, CellHash("0,0".into()));
    }
}
