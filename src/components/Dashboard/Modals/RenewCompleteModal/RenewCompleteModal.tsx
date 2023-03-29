import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Modal, Button } from "react-bootstrap";

import { closeRenewCompleteModal } from "../../../../redux/slices/dashboardSlice/dashboardSlice";
import { selectRenewCompleteModal } from "../../../../redux/slices/dashboardSlice/dashboardSelectors";

import styles from "./RenewCompleteModal.module.scss";

const RenewCompleteModal = () => {
	const isOpen = useAppSelector(selectRenewCompleteModal);
	const dispatch = useAppDispatch();

	const close = () => {
		dispatch(closeRenewCompleteModal({}));
	};

	return (
		<Modal
			show={isOpen}
			onHide={close}
			centered
			dialogClassName={styles.modal}
		>
			<Modal.Header closeButton>
				<Modal.Title>Your AD was renewed</Modal.Title>
			</Modal.Header>

			<Modal.Body className={styles.modal_body}>
				<p>Payment accept! Your advertisement is now active!</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={close}>
					OK
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RenewCompleteModal;
