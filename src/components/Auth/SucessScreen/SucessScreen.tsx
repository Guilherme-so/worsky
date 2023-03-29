import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

import styles from "./SuccessScreen.module.scss";

const SuccessScreen = (props: {
	className?: string;
	textLine1: string;
	textLine2?: string;
}) => (
	<div className={`${styles.success_layout} ${props.className}`}>
		<AiFillCheckCircle className={styles.success_icon} />
		<h2>{props.textLine1}</h2>
		<h2>{props.textLine2}</h2>
	</div>
);

export default SuccessScreen;
