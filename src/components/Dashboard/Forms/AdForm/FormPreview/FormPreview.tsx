import React from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import {
	selectAdFormState,
	selectCurrentAd,
} from "../../../../../redux/slices/createAndEditAdSlice/createAndEditAdSelectors";
import { displayType } from "../../../utils/displayTypes";

import styles from "./FormPreview.module.scss";

const FormPreview = (props: { ad: any }) => {
	const ad = useAppSelector(selectCurrentAd);
	const form = useAppSelector(selectAdFormState);

	let content = null;

	switch (form.display_type) {
		case displayType.DISPLAY:
			content = (
				<div className={styles.display_container}>
					{(form.logo_file || ad?.logo_file_path) && (
						<img
							src={
								form.logo_file
									? URL.createObjectURL(form.logo_file)
									: ad?.logo_file_path
							}
							alt=""
						/>
					)}

					<div className={styles.display_text}>
						<h4>{form.name}</h4>
						<p>{form.additional_info}</p>
					</div>
				</div>
			);
			break;

		case displayType.BANNER:
			content = (
				<div className={styles.banner_container}>
					<img
						src={
							form.display_file
								? URL.createObjectURL(form.display_file)
								: ad?.display_file_path
						}
						alt=""
					/>
				</div>
			);
			break;

		case displayType.VIDEO:
			content = (
				<div className={styles.banner_container}>
					<video
						autoPlay
						src={
							form.display_file
								? URL.createObjectURL(form.display_file)
								: ad?.display_file_path
						}
					></video>
				</div>
			);
			break;
	}

	return (
		<div className={styles.preview_container}>
			<div className={styles.preview_box}>
				<h3>{form.display_type}</h3>
				<div className={styles.blue_box}>{content}</div>
			</div>
		</div>
	);
};

export default FormPreview;
