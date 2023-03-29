import React from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import {
	selectPreviewAd,
	selectPreviewModal,
} from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import { closePreviewModal } from "../../../../redux/slices/dashboardSlice/dashboardSlice";
import { displayType } from "../../utils/displayTypes";

import styles from "./PreviewModal.module.scss";

const PreviewModal = () => {
	const shouldOpen = useAppSelector(selectPreviewModal);
	const ad = useAppSelector(selectPreviewAd);

	const dispatch = useAppDispatch();

	const close = () => {
		dispatch(closePreviewModal({}));
	};

	let content = null;

	switch (ad?.display_type) {
		case displayType.DISPLAY:
			content = (
				<div className={styles.display_container}>
					<a href={ad?.details_link} target="_blank" rel="noreferrer">
						<img
							src={
								ad?.logo_file
									? URL.createObjectURL(ad?.logo_file)
									: ad?.logo_file_path
							}
							alt=""
						/>
					</a>
					<div className={styles.display_text}>
						<h4>{ad?.name}</h4>
						<p>{ad?.additional_info}</p>
					</div>
				</div>
			);
			break;

		case displayType.BANNER:
			content = (
				<div className={styles.banner_container}>
					<a href={ad.details_link} target="_blank" rel="noreferrer">
						<img
							src={
								ad.display_file
									? URL.createObjectURL(ad.display_file)
									: ad?.display_file_path
							}
							alt=""
						/>
					</a>
				</div>
			);
			break;

		case displayType.VIDEO:
			content = (
				<div className={styles.banner_container}>
					<a href={ad.details_link} target="_blank" rel="noreferrer">
						<video
							autoPlay
							src={
								ad.display_file
									? URL.createObjectURL(ad.display_file)
									: ad?.display_file_path
							}
						></video>
					</a>
				</div>
			);
			break;
	}

	return (
		<Modal
			show={shouldOpen}
			onHide={close}
			centered
			dialogClassName={styles.modal}
		>
			<Modal.Header closeButton>
				<Modal.Title>Ad Preview</Modal.Title>
			</Modal.Header>

			<Modal.Body className={styles.modal_body}>
				<div className={styles.blue_box}>{content}</div>
			</Modal.Body>
		</Modal>
	);
};

export default PreviewModal;
