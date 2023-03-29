import React from "react";
import { IoReloadCircle } from "react-icons/io5";

import { useAppDispatch } from "../../../../redux/hooks";
import { openRenewModal } from "../../../../redux/slices/dashboardSlice/dashboardSlice";

import styles from "./RenewBtn.module.scss";

const RenewBtn = (props: { ad: any }) => {
	const dispatch = useAppDispatch();
	const { ad } = props;

	const openModal = () => {
		dispatch(openRenewModal(ad));
	};

	let display = "none";

	let expireChunks = ad.expires_in.split("/");
	let expires: string | Date =
		expireChunks[2] + "/" + expireChunks[1] + "/" + expireChunks[0];
	expires = new Date(expires);

	const expiresIn = new Date(expires);
	const now = new Date();

	if (expiresIn.getTime() < now.getTime() && ad.status) display = "block";

	return (
		<IoReloadCircle
			className={styles.renew_btn_icon}
			style={{
				display: display,
			}}
			onClick={openModal}
		/>
	);
};

export default RenewBtn;
