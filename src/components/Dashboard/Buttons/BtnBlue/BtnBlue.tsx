import React, { ReactElement } from "react";

import styles from "./BtnBlue.module.scss";

const BtnBlue = (props: {
	children: string | ReactElement | ReactElement[];
	onClick?: (event: any) => void;
	disabled?: boolean;
	style?: any;
	className?: string;
}) => {
	return (
		<button
			className={`${styles.btn_blue} ${props.className}`}
			onClick={(event: any) =>
				props.onClick ? props.onClick(event) : null
			}
			disabled={props.disabled}
			style={{ ...props.style }}
		>
			{props.children}
		</button>
	);
};

export default BtnBlue;
