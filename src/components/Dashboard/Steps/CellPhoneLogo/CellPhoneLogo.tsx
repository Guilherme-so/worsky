import React from "react";
import stepsState from "../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";
import logoPlaceHolder from "../../../../assets/images/airport-logo.png";

import styles from "./CellPhoneLogo.module.scss";

const CellPhoneLogo = (props: { state: stepsState }) => {
	const { state } = props;

	return (
		<div className={styles.wrapper}>
			<div className={styles.white_container}>
				<img
					src={
						state.logoFile
							? URL.createObjectURL(state.logoFile)
							: logoPlaceHolder
					}
					alt="logo"
					className={styles.logo}
				/>
			</div>
			<div className={styles.bottom_of_box}></div>
		</div>
	);
};

export default CellPhoneLogo;
