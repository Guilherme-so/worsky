import React from "react";
import {
	defineDisplayType,
	formatDescription,
} from "../../../constants/auxFunctions";
import { useAppDispatch } from "../../../redux/hooks";
import Ad from "../../../redux/interfaces/Ad";
import { openPreviewModal } from "../../../redux/slices/dashboardSlice/dashboardSlice";
import RenewBtn from "../Buttons/RenewBtn/RenewBtn";

import styles from "./ExpiredAdCell.module.scss";

const ExpiredAdCell = (props: { ad: Ad }) => {
	const dispatch = useAppDispatch();

	const { ad } = props;

	const display_type = defineDisplayType(ad.display_type);
	const description = formatDescription(ad.additional_info);

	const openPreview = () => {
		dispatch(openPreviewModal(ad));
	};

	const now = new Date();
	let expireChunks = ad.expires_in.split("/");
	let expires: string | Date =
		expireChunks[2] + "/" + expireChunks[1] + "/" + expireChunks[0];
	expires = new Date(expires);

	const msExpired = now.getTime() - expires.getTime();
	let daysExpired = Math.floor(msExpired / 1000 / 60 / 60 / 24);
	daysExpired = daysExpired > 0 ? daysExpired : 1;

	return (
		<tr>
			<td className={styles.align_start}>
				<span className={styles.preview_link} onClick={openPreview}>
					{ad.name}
				</span>
			</td>
			<td className={styles.logo_container}>
				<img src={ad.logo_file_path} alt="" />
			</td>
			<td className={styles.align_start}>{description}</td>
			<td>{display_type}</td>
			<td className={styles.align_start}>{ad.location_text}</td>
			<td>{ad.plan.time_bought} days</td>
			<td>{ad.expires_in}</td>
			<td className={styles.expired_text}>{daysExpired} days</td>
			<td className={styles.actions_container}>
				<RenewBtn ad={ad} />
			</td>
		</tr>
	);
};

export default ExpiredAdCell;
