import BudgetCard from "./BudgetCard";

import useBudgetContext from "../hooks/useBudgetContext";
import { UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";

const UncategorizedBudgetCard = (props) => {
	const { getBudgetExpenses } = useBudgetContext();
	const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
		(total, expense) => total + expense.amount,
		0
	);
	if (amount === 0) return null;
	return (
		<BudgetCard
			gray
			name="Uncategorized"
			amount={amount}
			{...props}
		></BudgetCard>
	);
};

export default UncategorizedBudgetCard;
