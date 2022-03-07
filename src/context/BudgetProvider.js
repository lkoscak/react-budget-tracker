import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "../hooks/useLocalStorage";

import budgetContext, { UNCATEGORIZED_BUDGET_ID } from "./BudgetContext";

const BudgetProvider = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage("budgets", []);
	const [expenses, setExpenses] = useLocalStorage("expenses", []);
	const getBudgetExpenses = (budgetId) => {
		return expenses.filter((expense) => expense.budgetId === budgetId);
	};
	const addExpense = (budgetId, description, amount) => {
		setExpenses((prevExpenses) => [
			...prevExpenses,
			{ id: uuidv4(), budgetId, description, amount },
		]);
	};
	const addBudget = (name, max) => {
		if (budgets.some((budget) => budget.name === name)) return;
		setBudgets((prevBudgets) => [...prevBudgets, { id: uuidv4(), name, max }]);
	};
	const deleteExpense = (id) => {
		setExpenses((prevExpenses) =>
			prevExpenses.filter((expense) => expense.id !== id)
		);
	};
	const deleteBudget = (id) => {
		setExpenses((prevExpenses) => {
			return prevExpenses.map((expense) => {
				if (expense.budgetId !== id) return expense;
				return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
			});
		});
		setBudgets((prevBudgets) =>
			prevBudgets.filter((budget) => budget.id !== id)
		);
	};
	return (
		<budgetContext.Provider
			value={{
				budgets,
				expenses,
				addBudget,
				addExpense,
				getBudgetExpenses,
				deleteBudget,
				deleteExpense,
			}}
		>
			{children}
		</budgetContext.Provider>
	);
};

export default BudgetProvider;
