import React, { ReactElement } from "react";

import styles from "./PageTitle.module.scss";

const PageTitle = (props: { children: string | ReactElement; style?: any }) => {
	return (
		<h2 className={styles.title} style={{ ...props.style }}>
			{props.children}
		</h2>
	);
};

export default PageTitle;
