import React from "react";
import { IoClose } from "react-icons/io5";

import CellPhoneLogo from "../CellPhoneLogo/CellPhoneLogo";

import cellPhone from "../../../../assets/image/celular.png";
import cellPhoneBackground from "../../../../assets/image/cellphonebackground.jpeg";
import logoPlaceHolder from "../../../../assets/images/airport-logo.png";

import stepsState from "../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";
import { displayType } from "../../utils/displayTypes";
import styles from "./CellPhone.module.scss";

const CellPhone = (props: { className?: string; state: stepsState }) => {
	const { state } = props;

	let content = null;
	switch (state.displayType) {
		case displayType.DISPLAY:
			content = (
				<div className={`${styles.display} ${styles.ad_display}`}>
					<div className={styles.logo}>
						<img
							src={
								state.logoFile
									? URL.createObjectURL(state.logoFile)
									: logoPlaceHolder
							}
							alt=""
						/>
					</div>

					<div className={styles.text_container}>
						<h2>{state.name.length ? state.name : "Name"}</h2>
						<p>
							{state.additionalInformation.length
								? state.additionalInformation
								: "Description... \n Description..."}
						</p>
					</div>

					<div className={styles.btn_container}>
						<div className={styles.icon_container}>
							<IoClose className={styles.icon} />
						</div>

						<div className={styles.more_details_btn}>MORE DETAILS</div>
					</div>
				</div>
			);
			break;

		case displayType.BANNER:
			content = (
				<div className={`${styles.display} ${styles.banner_display}`}>
					<img
						src={
							state.displayFile
								? URL.createObjectURL(state.displayFile)
								: logoPlaceHolder
						}
						alt=""
					/>

					<div className={styles.btn_container}>
						<div className={styles.icon_container}>
							<IoClose className={styles.icon} />
						</div>

						<div className={styles.more_details_btn}>MORE DETAILS</div>
					</div>
				</div>
			);
			break;

		case displayType.VIDEO:
			content = (
				<div className={`${styles.display} ${styles.banner_display}`}>
					<video
						src={state.displayFile ? URL.createObjectURL(state.displayFile) : ""}
						autoPlay
					></video>

					<div className={styles.btn_container}>
						<div className={styles.icon_container}>
							<IoClose className={styles.icon} />
						</div>

						<div className={styles.more_details_btn}>MORE DETAILS</div>
					</div>
				</div>
			);
			break;
	}

	return (
		<div className={styles.cellphone_container}>
			<div className={styles.cellphone}>
				<img src={cellPhone} alt="" />
				<div className={styles.cellphone_background}>
					<img src={cellPhoneBackground} alt="" />
					<CellPhoneLogo state={state} />
				</div>

				{content}
			</div>
		</div>
	);
};

export default CellPhone;
