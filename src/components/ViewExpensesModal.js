import { Modal, Button, Stack } from "react-bootstrap";

import useBudgetContext from "../hooks/useBudgetContext";
import { UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";
import { currencyFormater } from "../utils";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
	const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
		useBudgetContext();
	const budget =
		UNCATEGORIZED_BUDGET_ID === budgetId
			? { id: UNCATEGORIZED_BUDGET_ID, name: "Uncategorized" }
			: budgets.find((budget) => budget.id === budgetId);
	const expenses = getBudgetExpenses(budgetId);
	return (
		<Modal show={budgetId !== null} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					<Stack direction="horizontal" gap="2">
						<div>Expenses for {budget?.name}</div>
						{budgetId !== UNCATEGORIZED_BUDGET_ID && (
							<Button
								variant="danger"
								onClick={() => {
									deleteBudget(budgetId);
									handleClose();
								}}
							>
								Delete
							</Button>
						)}
					</Stack>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Stack direction="vertical" gap="3">
					{expenses.map((expense) => (
						<Stack direction="horizontal" gap={2} key={expense.id}>
							<div className="me-auto fs-4">{expense.description}</div>
							<div className="fs-5">
								{currencyFormater.format(expense.amount)}
							</div>
							<Button
								onClick={() => {
									deleteExpense(expense.id);
								}}
								size="sm"
								variant="outline-danger"
							>
								x
							</Button>
						</Stack>
					))}
				</Stack>
			</Modal.Body>
		</Modal>
	);
};

export default ViewExpensesModal;
