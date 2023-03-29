import React from "react";
import { Form, Col } from "react-bootstrap";
import { RiErrorWarningLine } from "react-icons/ri";
import { isMobile } from "utils/utils";
import { emailErrorTypes } from "../../../../../redux/slices/authSlice/authInterfaces";

import styles from "./FormInputText.module.scss";

const FormInputText = (props: {
	label: string;
	placeholder: string;
	input?: string;
	onChange: (payload: string) => void;
	containerClassName?: string;
	hasError?: boolean;
	errorType?: string | null;
	isEmail?: boolean;
	name?: string;
}) => {
	const { hasError, errorType, isEmail } = props;

	return (
		<Form.Group
			className={`ms-0 ${
				hasError ? (isMobile() ? "mb-1" : "mb-3") : isMobile() ? "mb-3" : "mb-5"
			} ${isMobile() ? "col-md-12" : "col-md-5"}  ${props.containerClassName}`}
			controlId="formText"
		>
			<Form.Label
				column
				md="3"
				style={{
					fontSize: "1.25rem",
					fontWeight: 500,
					width: isMobile() ? "30%" : "inherit",
				}}
				className={styles.label}
			>
				{props.label}
			</Form.Label>
			<Col
				md="8"
				className={"position-relative"}
				style={{
					width: isMobile() ? "65%" : "inherit",
				}}
			>
				<Form.Control
					type="text"
					placeholder={props.placeholder}
					value={props.input}
					onChange={(event: any) => props.onChange(event.target.value)}
					className={hasError ? styles.error_input : ""}
					style={{ width: "100%" }}
					name={props.name}
				/>
				<RiErrorWarningLine
					style={{ display: hasError ? "block" : "none" }}
					className={styles.warn_icon}
				/>
			</Col>

			<Col sm="12" className="d-flex">
				<Col sm="3"></Col>
				<label
					className={`col-sm-8 ${styles.error_text}`}
					style={{ display: hasError ? "block" : "none" }}
				>
					{isEmail
						? errorType === emailErrorTypes.INVALID
							? "Type a valid Email!"
							: "This field is required!"
						: "This field is required!"}
				</label>
			</Col>
		</Form.Group>
	);
};

export default FormInputText;
