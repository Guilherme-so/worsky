import React from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import {
	selectPdfPreview,
	selectPdfPreviewIsOpen,
} from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import { closePdfPreviewModal } from "../../../../redux/slices/dashboardSlice/dashboardSlice";

import styles from "./PdfPreviewModal.module.scss";

const PdfPreviewModal = () => {
	const shouldOpen = useAppSelector(selectPdfPreviewIsOpen);
	const pdf = useAppSelector(selectPdfPreview);
	const dispatch = useAppDispatch();

	const close = () => {
		dispatch(closePdfPreviewModal({}));
	};

	return (
		<Modal
			show={shouldOpen}
			onHide={close}
			centered
			dialogClassName={styles.modal}
			contentClassName={styles.content}
		>
			<Modal.Header closeButton>
				<Modal.Title>PDF Preview</Modal.Title>
			</Modal.Header>

			<Modal.Body className={styles.modal_body}>
				<embed
					src={URL.createObjectURL(pdf ? pdf : new Blob())}
					width="100%"
					height="100%"
				/>
			</Modal.Body>
		</Modal>
	);
};

export default PdfPreviewModal;
