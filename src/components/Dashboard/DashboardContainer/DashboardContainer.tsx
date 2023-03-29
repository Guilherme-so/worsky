import React from "react";

import styles from "./DashboardContainer.module.scss";

const DashboardContainer = (props: { children: any; xPadding?: boolean }) => {
	return (
		<div
			className={`${styles.dashboard_container} ${
				props.xPadding ? styles.container_padding : ""
			}`}
		>
			{props.children}
		</div>
	);
};

export default DashboardContainer;
