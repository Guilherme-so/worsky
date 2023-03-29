import React from "react";
import { useState } from "react";

import Auth from "../../../components/Auth/Auth";
import ButtonBlue from "../../../components/Auth/ButtonBlue/ButtonBlue";
import GoogleBtn from "components/Auth/SocialMedia/GoogleBtn/GoogleBtn";
import FacebookBtn from "components/Auth/SocialMedia/FacebookBtn/FacebookBtn";
import { isEmptyString, isValidEmail } from "../../../utils/validate";

import styles from "./Login.module.scss";
import authStyles from "../../../components/Auth/Auth.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { useHistory, useLocation } from "react-router-dom";
import ROUTES from "../../../routes/route";
import { login } from "../../../redux/slices/authSlice/authAsyncActions";

enum errorTypes {
	REQUIRED = "REQUIRED",
	INVALID_EMAIL = "INVALID_EMAIL",
	INVALID_PASSWORD = "INVALID_PASSWORD",
	WRONG_CREDENTIALS = "WRONG_CREDENTIALS",
}

interface errorPattern {
	type?: string;
	fields?: any;
}

const Login = (props: any) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<errorPattern>({});
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useAppDispatch();

	const location = useLocation();
	const history = useHistory();
	const { from } = (location.state as { from: { pathname: string } }) || {
		from: { pathname: "/" },
	};

	const requiredGate = () => {
		if (isEmptyString(email) || isEmptyString(password)) {
			const fields: { email?: string; password?: string } = {};

			if (isEmptyString(email)) fields.email = "email";
			if (isEmptyString(password)) fields.password = "password";

			const error = new Error() as errorPattern;
			error.type = errorTypes.REQUIRED;
			error.fields = fields;

			throw error;
		}
	};

	const validEmailGate = () => {
		if (!isValidEmail(email)) {
			const error = new Error() as errorPattern;
			error.type = errorTypes.INVALID_EMAIL;

			throw error;
		}
	};

	const validPasswordGate = () => {
		if (password.length < 8) {
			const error = new Error() as errorPattern;
			error.type = errorTypes.INVALID_PASSWORD;

			throw error;
		}
	};

	const submitForm = async () => {
		const data = { username: email, password: password };
		try {
			const result = await dispatch(login(data));
			setIsLoading(false);
			if (!login.fulfilled.match(result)) {
				setError({ type: errorTypes.WRONG_CREDENTIALS });
			} else {
				window.location.pathname = ROUTES.dashboard.steps;
				history.replace(from);
			}
		} catch (error) {
			setIsLoading(false);
			setError({ type: errorTypes.WRONG_CREDENTIALS });
		}
	};

	const validateForm = (event: any) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			requiredGate();
			validEmailGate();
			validPasswordGate();
		} catch (error: any) {
			setIsLoading(false);
			return setError(error);
		}

		submitForm();
	};

	return (
		<Auth
			title="Login (You can use your account from Worsky)"
			innerContentClassName={styles.login_area}
		>
			<form className="form-control" onSubmit={(event) => validateForm(event)}>
				<div
					className={`${authStyles.error_container} ${
						(error.type === errorTypes.REQUIRED && error.fields.email) ||
						error.type === errorTypes.INVALID_EMAIL ||
						error.type === errorTypes.WRONG_CREDENTIALS
							? "error_container_active"
							: ""
					}`}
				>
					<input
						type="text"
						className="form-control"
						placeholder="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					{error.type && (
						<span className={authStyles.error_message}>
							{error.type === errorTypes.REQUIRED && error.fields.email
								? "*This field is required!"
								: error.type === errorTypes.INVALID_EMAIL
								? "*Invalid email!"
								: error.type === errorTypes.WRONG_CREDENTIALS
								? "*Wrong credentials!"
								: ""}
						</span>
					)}
				</div>

				<div
					className={`${authStyles.error_container} ${
						(error.type === errorTypes.REQUIRED && error.fields.password) ||
						error.type === errorTypes.INVALID_PASSWORD ||
						error.type === errorTypes.WRONG_CREDENTIALS
							? "error_container_active"
							: ""
					}`}
				>
					<input
						type="password"
						className="form-control"
						placeholder="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					{error.type && (
						<span className={authStyles.error_message}>
							{error.type === errorTypes.REQUIRED && error.fields.password
								? "*This field is required!"
								: error.type === errorTypes.INVALID_PASSWORD
								? "*Invalid password, password need to have at least 8 characters!"
								: error.type === errorTypes.WRONG_CREDENTIALS
								? "*Wrong credentials!"
								: ""}
						</span>
					)}
				</div>

				<ButtonBlue isLoading={isLoading}>Enter</ButtonBlue>
				<GoogleBtn />
				<FacebookBtn />
			</form>
		</Auth>
	);
};

export default Login;
