import React from "react";
import Loader from "react-loader-spinner";
import AuthBtn from "../AuthBtn/AuthBtn";

import styles from "./ButtonBlue.module.scss";

const ButtonBlue = (props: { children: any; className?: string; isLoading?: boolean }) => {
	return (
		<AuthBtn className={`${styles.btn_blue} ${props.className}`} type="submit">
			{props.isLoading ? (
				<Loader type="Oval" color="white" height={40} width={40} />
			) : (
				props.children
			)}
		</AuthBtn>
	);
};

export default ButtonBlue;
