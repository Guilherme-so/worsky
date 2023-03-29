/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "../../routes/route";

import styles from "./Auth.module.scss";

const Auth = (props: {
	className?: string;
	innerContentClassName?: string;
	innerContentStyle?: any;
	children: any;
	title: string;
	containerRef?: any;
	linkAreaClassName?: string;
}) => (
	<div className={`${styles.auth} ${props.className}`}>
		<div className={`${styles.transparent_box} `}>
			<h1>{props.title}</h1>
			<div
				className={`${styles.inner_content} ${props.innerContentClassName} `}
				style={props.innerContentStyle}
				ref={props.containerRef}
			>
				{props.children}
				<div
					className={`${styles.link_area} ${props.linkAreaClassName}`}
				>
					<Link to={ROUTES.auth.passwordReset}>
						Forgot username or password
					</Link>

					<a> |</a>
					<Link to={ROUTES.auth.register}>Register</Link>
				</div>
			</div>
		</div>
	</div>
);

export default Auth;
