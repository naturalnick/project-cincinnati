import { useEffect, useState } from "react";
import { useErrorHandler } from "../hooks/useErrorHandler";

import { Modal, Button, Spinner, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useFormik } from "formik";
import { addArtwork } from "src/services/users";
import { uploadToStorage } from "src/services/storage";

const validationSchema = yup.object().shape({
	file: yup.mixed().required("Image is required."),
	title: yup.string(),
	artist: yup.string(),
});

function ArtworkModal({ show, handleClose }) {
	const [loading, setLoading] = useState(false);
	const { setError, ErrorMessage } = useErrorHandler();
	const [uploaded, setUploaded] = useState(false);

	const {
		values,
		setFieldValue,
		handleSubmit,
		handleChange,
		touched,
		errors,
		resetForm,
	} = useFormik({
		initialValues: {
			file: null,
			title: "",
			artist: "",
		},
		onSubmit: handleUpload,
		validationSchema: validationSchema,
	});

	useEffect(() => {
		setUploaded(false);
	}, [values]);

	async function handleUpload(values) {
		setLoading(true);
		try {
			const artwork = await addArtwork(values);
			await uploadToStorage(artwork.id, values.file);
			setUploaded(true);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	}

	function handleChangeFile(e) {
		console.log(e.target.files[0]);
		setFieldValue("file", e.target.files[0], false);
	}

	function handleResetForm() {
		resetForm();
		setUploaded(false);
	}

	return (
		<Modal size="md" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>New Artwork</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="pb-2">
					<Form.Label>Image File (required)</Form.Label>
					<Form.Control
						type="file"
						name="file"
						onChange={handleChangeFile}
					/>
					{errors.file && touched.file && (
						<small className="text-danger">{errors.file}</small>
					)}
				</Form.Group>
				<Form.Group className="pb-2">
					<Form.Label>Title (optional)</Form.Label>
					<Form.Control
						name="title"
						value={values.title}
						onChange={handleChange}
						type="title"
					/>
					{errors.title && touched.title && (
						<small className="text-danger">{errors.title}</small>
					)}
				</Form.Group>
				<Form.Group className="pb-2">
					<Form.Label>Artist (optional)</Form.Label>
					<Form.Control
						name="artist"
						value={values.artist}
						onChange={handleChange}
						type="artist"
					/>
					{errors.artist && touched.artist && (
						<small className="text-danger">{errors.artist}</small>
					)}
				</Form.Group>
				{ErrorMessage}
			</Modal.Body>
			<Modal.Footer>
				{uploaded ? (
					<Alert
						className="w-100 d-flex justify-content-between align-items-center"
						variant="success"
					>
						Artwork uploaded successfully!
						<Button size="sm" onClick={handleResetForm}>
							Add Another
						</Button>
					</Alert>
				) : (
					<>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button disabled={loading} onClick={handleSubmit}>
							{loading ? <Spinner size="sm" /> : "Upload"}
						</Button>
					</>
				)}
			</Modal.Footer>
		</Modal>
	);
}

ArtworkModal.propTypes = {
	show: PropTypes.bool,
	handleClose: PropTypes.func,
};

export default ArtworkModal;
