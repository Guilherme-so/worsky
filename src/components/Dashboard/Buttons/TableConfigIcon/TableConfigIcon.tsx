import React from "react";
import { RiSettings5Fill } from "react-icons/ri";

import styles from "./TableConfigIcon.module.scss";

const TableConfigIcon = (props: {
	dropDownCondition: boolean;
	editBtnAction: () => void;
	deleteBtnAction: () => void;
	toggleMenu: () => void;
	dropDownStyle?: any;
	dropDownClass?: string;
}) => {
	let { dropDownStyle } = props;
	if (!dropDownStyle) dropDownStyle = {};

	return (
		<div
			className={styles.icon_container}
			onClick={() => props.toggleMenu()}
		>
			<RiSettings5Fill className={styles.config_icon} />

			{props.dropDownCondition && (
				<div
					className={`${styles.dropdown_menu} ${styles.dropdown_config_menu} ${props.dropDownClass}`}
					style={{ ...props.dropDownStyle }}
				>
					<div
						className={styles.dropdown_box}
						onClick={() => props.editBtnAction()}
					>
						Edit
					</div>

					<div
						className={styles.dropdown_box}
						onClick={() => props.deleteBtnAction()}
					>
						Delete
					</div>
				</div>
			)}
		</div>
	);
};

export default TableConfigIcon;
