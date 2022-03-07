import BudgetCard from "./BudgetCard";

import useBudgetContext from "../hooks/useBudgetContext";

const TotalBudgetCard = () => {
	const { expenses, budgets } = useBudgetContext();
	const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
	const max = budgets.reduce((total, budget) => total + budget.max, 0);
	if (max === 0) return null;
	return (
		<BudgetCard
			gray
			name="Total"
			amount={amount}
			max={max}
			hideButtons
		></BudgetCard>
	);
};

export default TotalBudgetCard;
