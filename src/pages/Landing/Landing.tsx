import React from "react";

import styles from "./Landing.module.scss";

const Landing = (props: { className: string; children: any }) => (
	<div className={`${styles.landing} ${props.className}`}>
		{props.children}
	</div>
);

export default Landing;
