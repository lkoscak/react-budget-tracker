import React from "react";

const budgetContext = React.createContext({
	budgets: [],
	expenses: [],
	getBudgetExpenses: () => {},
	addExpense: () => {},
	addBudget: () => {},
	deleteBudget: () => {},
	deleteExpense: () => {},
});

export const UNCATEGORIZED_BUDGET_ID = "uncategorized";

export default budgetContext;
