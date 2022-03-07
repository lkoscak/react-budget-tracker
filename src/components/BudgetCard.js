import { Button, Card, ProgressBar, Stack } from "react-bootstrap";

import { currencyFormater } from "../utils";

const getProgressBarVariant = (amount, max) => {
	const ratio = amount / max;
	if (ratio < 0.5) return "primary";
	if (ratio < 0.75) return "warning";
	return "danger";
};

const BudgetCard = ({
	name,
	amount,
	max,
	gray,
	onAddExpenseHandler,
	onViewExpensesHandler,
	hideButtons,
}) => {
	console.log(hideButtons);
	const classNames = [];
	if (amount > max) classNames.push("bg-danger", "bg-opacity-10");
	else if (gray) classNames.push("bg-light");
	return (
		<Card className={classNames.join(" ")}>
			<Card.Body>
				<Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
					<div className="me-2">{name}</div>
					<div className="d-flex align-items-baseline">
						{currencyFormater.format(amount)}
						{max && (
							<span className="text-muted fs-6 ms-1">
								/ {currencyFormater.format(max)}
							</span>
						)}
					</div>
				</Card.Title>
				{max && (
					<ProgressBar
						className="rounded-pil"
						variant={getProgressBarVariant(amount, max)}
						min={0}
						max={max}
						now={amount}
					></ProgressBar>
				)}
				{!hideButtons && (
					<Stack direction="horizontal" gap={2} className="mt-4">
						<Button
							onClick={onAddExpenseHandler}
							variant="outline-primary"
							className="ms-auto"
						>
							Add Expense
						</Button>
						<Button onClick={onViewExpensesHandler} variant="outline-secondary">
							View Expenses
						</Button>
					</Stack>
				)}
			</Card.Body>
		</Card>
	);
};

export default BudgetCard;
