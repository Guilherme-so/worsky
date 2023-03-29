import styles from "./AuthBtn.module.scss";

const AuthBtn = (props: {
	children: any;
	className?: string;
	type: "button" | "submit";
	onClick?: () => void;
}) => {
	return (
		<button
			className={`${styles.auth_btn} btn ${props.className}`}
			type={props.type}
			onClick={() => (props.onClick ? props.onClick() : () => {})}
		>
			{props.children}
		</button>
	);
};

export default AuthBtn;
