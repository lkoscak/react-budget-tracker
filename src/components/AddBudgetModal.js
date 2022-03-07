import { Modal, Form, Button } from "react-bootstrap";

import { useRef } from "react";

import useBudgetContext from "../hooks/useBudgetContext";

const AddBudgetModal = ({ show, handleClose }) => {
	const nameRef = useRef();
	const maxRef = useRef();
	const { addBudget } = useBudgetContext();
	const handleSubmit = (e) => {
		e.preventDefault();
		addBudget(nameRef.current.value, parseFloat(maxRef.current.value));
		handleClose();
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>New Budget</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control ref={nameRef} type="text" required></Form.Control>
					</Form.Group>
					<Form.Group className="mb-3" controlId="max">
						<Form.Label>Maximum spending</Form.Label>
						<Form.Control
							ref={maxRef}
							type="number"
							required
							min={0}
							ste={0.1}
						></Form.Control>
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

export default AddBudgetModal;
