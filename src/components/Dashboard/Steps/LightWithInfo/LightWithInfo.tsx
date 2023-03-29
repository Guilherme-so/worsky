import React from "react";

import lightImg from "../../../../assets/image/light.png";

import styles from "./LightWithInfo.module.scss";

const LightWithInfo = (props: { className?: string }) => {
	return (
		<div className={`${props.className} ${styles.light_container}`}>
			<div className={styles.light_img}>
				<img src={lightImg} alt="" />
			</div>
			<p>
				Accessing your account here at ADS you will see the number of impressions of your
				ad.
			</p>
			<p id={styles.margin_p}>You will also have access to clicks.</p>
			<p>You can change your billing details after signing up.</p>
		</div>
	);
};

export default LightWithInfo;
