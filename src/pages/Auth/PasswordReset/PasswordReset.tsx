import React from "react";
import { useState } from "react";

import Auth from "../../../components/Auth/Auth";
import ButtonBlue from "../../../components/Auth/ButtonBlue/ButtonBlue";
import SuccessScreen from "../../../components/Auth/SucessScreen/SucessScreen";
import { useAppDispatch } from "../../../redux/hooks";
import { isEmptyString, isValidEmail } from "../../../utils/validate";
import { passwordReset } from "../../../redux/slices/authSlice/authAsyncActions";

import authStyles from "../../../components/Auth/Auth.module.scss";
import styles from "./PasswordReset.module.scss";

enum errorTypes {
	REQUIRED = "REQUIRED",
	INVALID_EMAIL = "INVALID_EMAIL",
	USER_NOT_FOUND = "USER_NOT_FOUND",
}

const PasswordReset = (props: any) => {
	const [passwordResetFinished, setPasswordResetFinished] = useState(false);
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();

	const submitForm = async (data: { email?: string; username?: string }) => {
		const result = await dispatch(passwordReset(data));
		setIsLoading(false);

		if (passwordReset.fulfilled.match(result))
			setPasswordResetFinished(true);
		else setError(errorTypes.USER_NOT_FOUND);
	};

	const validateForm = (event: any) => {
		event.preventDefault();
		setIsLoading(true);
		let data = {};

		if (isEmptyString(emailOrUsername)) {
			setIsLoading(false);
			return setError(errorTypes.REQUIRED);
		}

		if (isValidEmail(emailOrUsername)) data = { email: emailOrUsername };
		else data = { username: emailOrUsername };

		submitForm(data);
	};

	return (
		<Auth
			title="Recover"
			innerContentClassName={styles.password_reset_area}
		>
			{passwordResetFinished ? (
				<SuccessScreen
					textLine1="E-mail has been sent to you."
					textLine2="Please also report it in your spam box."
				/>
			) : (
				<form
					className="form-control"
					onSubmit={(event) => validateForm(event)}
				>
					<div
						className={`${authStyles.error_container} ${
							error ? "error_container_active" : ""
						}`}
						style={{ width: "100%" }}
					>
						<input
							type="text"
							className="form-control"
							placeholder="username or email"
							onChange={(event) =>
								setEmailOrUsername(event.target.value)
							}
							value={emailOrUsername}
						/>
						{error ? (
							<span className={authStyles.error_message}>
								{error === errorTypes.REQUIRED
									? "*This field is required!"
									: error === errorTypes.USER_NOT_FOUND
									? "*Email or username not found! Are you sure the email is valid or the username is correct?"
									: ""}
							</span>
						) : (
							""
						)}
					</div>

					<ButtonBlue
						className={styles.btn_blue}
						isLoading={isLoading}
					>
						Recover
					</ButtonBlue>
				</form>
			)}
		</Auth>
	);
};

export default PasswordReset;
