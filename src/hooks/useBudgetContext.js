import { useContext } from "react";

import budgetContext from "../context/BudgetContext";

const useBudgetContext = () => {
	return useContext(budgetContext);
};

export default useBudgetContext;
