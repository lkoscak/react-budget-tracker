import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";

import BudgetProvider from "./context/BudgetProvider";

ReactDOM.render(
	<React.StrictMode>
		<BudgetProvider>
			<App />
		</BudgetProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
