import React from "react";
import Loader from "react-loader-spinner";
import { COLORS } from "../../../constants/colors";

import styles from "./TableLoader.module.scss";

const TableLoader = (props: any) => (
	<div className={styles.loader_container}>
		<Loader
			type="TailSpin"
			color={COLORS.stepsLightBlue}
			height={100}
			width={100}
		/>
	</div>
);

export default TableLoader;
