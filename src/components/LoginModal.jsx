import { useState } from "react";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, Form, Modal, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { loginUser } from "src/services/auth";

const validationSchema = yup.object().shape({
	email: yup.string().required("Email is required."),
	password: yup.string().required("Password is required."),
});

function LoginModal({ show, handleClose }) {
	const [loading, setLoading] = useState(false);
	const { setError, ErrorMessage } = useErrorHandler();

	const { values, handleSubmit, handleChange, touched, errors } = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: handleLogin,
		validationSchema: validationSchema,
	});

	async function handleLogin() {
		setLoading(true);
		try {
			await loginUser(values.email, values.password);
			handleClose();
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	}

	function handleKeyDown(e) {
		if (e.code === "Enter") {
			e.preventDefault();
			handleSubmit();
		}
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Admin Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onKeyDown={handleKeyDown}>
					<Form.Group className="pb-2">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							name="email"
							value={values.email}
							onChange={handleChange}
						/>
						{errors.email && touched.email && (
							<small className="text-danger">{errors.email}</small>
						)}
					</Form.Group>
					<Form.Group className="pb-2">
						<Form.Label>Password</Form.Label>
						<Form.Control
							name="password"
							value={values.password}
							onChange={handleChange}
							type="password"
						/>
						{errors.password && touched.password && (
							<small className="text-danger">{errors.password}</small>
						)}
					</Form.Group>
				</Form>
				{ErrorMessage}

				<Button
					variant="primary"
					onClick={handleSubmit}
					disabled={loading}
					className="w-100 mt-3"
				>
					{loading ? <Spinner size="sm" /> : "Login"}
				</Button>
			</Modal.Body>
		</Modal>
	);
}

LoginModal.propTypes = {
	show: PropTypes.bool,
	handleClose: PropTypes.func,
};

export default LoginModal;
