import React, { ReactElement } from "react";

import styles from "./PageSubTitle.module.scss";

const PageSubTitle = (props: {
	children: string | ReactElement;
	style?: any;
	type: string;
}) => {
	return (
		<h3
			className={`${styles.sub_title} ${styles[props.type]}`}
			style={{ ...props.style }}
		>
			{props.children}
		</h3>
	);
};

export default PageSubTitle;
