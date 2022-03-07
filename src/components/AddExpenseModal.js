import { Modal, Form, Button } from "react-bootstrap";

import { useRef } from "react";

import useBudgetContext from "../hooks/useBudgetContext";
import { UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
	const descRef = useRef();
	const amountRef = useRef();
	const budgetIdRef = useRef();
	const { addExpense, budgets } = useBudgetContext();
	const handleSubmit = (e) => {
		e.preventDefault();
		addExpense(
			budgetIdRef.current.value,
			descRef.current.value,
			parseFloat(amountRef.current.value)
		);
		handleClose();
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>New Expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="desc">
						<Form.Label>Description</Form.Label>
						<Form.Control ref={descRef} type="text" required></Form.Control>
					</Form.Group>
					<Form.Group className="mb-3" controlId="amount">
						<Form.Label>Amount</Form.Label>
						<Form.Control
							ref={amountRef}
							type="number"
							required
							min={0}
							ste={0.1}
						></Form.Control>
					</Form.Group>
					<Form.Group className="mb-3" controlId="budgetId">
						<Form.Label>Budget</Form.Label>
						<Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
							<option
								id={UNCATEGORIZED_BUDGET_ID}
								value={UNCATEGORIZED_BUDGET_ID}
							>
								Uncategorized
							</option>
							{budgets.map((budget) => (
								<option key={budget.id} value={budget.id}>
									{budget.name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<div className="d-flex justify-conmtent-end">
						<Button variant="primary" type="submit">
							Add
						</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	);
};

export default AddExpenseModal;
