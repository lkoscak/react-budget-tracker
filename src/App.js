import { useState } from "react";

import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";

import useBudgetContext from "./hooks/useBudgetContext";

import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "./context/BudgetContext";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

const App = () => {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
		useState(null);
	const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
	const [showAddExpenseModalBudgetId, setShowAddExpenseModalBudgetId] =
		useState();
	const { budgets, getBudgetExpenses } = useBudgetContext();
	const openAddExpenseModal = (budgetId) => {
		setShowAddExpenseModal(true);
		setShowAddExpenseModalBudgetId(budgetId);
	};
	return (
		<>
			<Container className="my-4">
				<Stack direction="horizontal" gap="2" className="mb-4">
					<h1 className="me-auto">Budgets</h1>
					<Button
						onClick={() => {
							setShowAddBudgetModal(true);
						}}
						variant="primary"
					>
						Add Budget
					</Button>
					<Button onClick={openAddExpenseModal} variant="outline-primary">
						Add Expense
					</Button>
				</Stack>
				<div className="grid">
					{budgets.map((budget) => {
						const totalExpenses = getBudgetExpenses(budget.id).reduce(
							(total, expense) => total + expense.amount,
							0
						);
						return (
							<BudgetCard
								key={budget.id}
								name={budget.name}
								amount={totalExpenses}
								max={budget.max}
								onAddExpenseHandler={() => {
									openAddExpenseModal(budget.id);
								}}
								onViewExpensesHandler={() => {
									setViewExpensesModalBudgetId(budget.id);
								}}
							></BudgetCard>
						);
					})}
					<UncategorizedBudgetCard
						onAddExpenseHandler={() => {
							openAddExpenseModal(UNCATEGORIZED_BUDGET_ID);
						}}
						onViewExpensesHandler={() => {
							setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID);
						}}
					></UncategorizedBudgetCard>
					<TotalBudgetCard></TotalBudgetCard>
				</div>
			</Container>
			<AddBudgetModal
				show={showAddBudgetModal}
				handleClose={() => {
					setShowAddBudgetModal(false);
				}}
			></AddBudgetModal>
			<AddExpenseModal
				show={showAddExpenseModal}
				defaultBudgetId={showAddExpenseModalBudgetId}
				handleClose={() => {
					setShowAddExpenseModal(false);
				}}
			></AddExpenseModal>
			<ViewExpensesModal
				budgetId={viewExpensesModalBudgetId}
				handleClose={() => {
					setViewExpensesModalBudgetId(null);
				}}
			></ViewExpensesModal>
		</>
	);
};

export default App;
