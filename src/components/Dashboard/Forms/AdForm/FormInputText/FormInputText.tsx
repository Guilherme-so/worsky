import React from "react";
import { Form, Col, Row } from "react-bootstrap";

// import styles from "./FormInputText.module.scss";

const FormInputText = (props: {
	label: string;
	placeholder: string;
	input?: string;
	onChange: (payload: string) => void;
	containerClassName?: string;
}) => {
	return (
		<Form.Group
			as={Row}
			className={`mb-3 ms-0 ${props.containerClassName}`}
			controlId="formText"
		>
			<Form.Label column sm="3">
				{props.label}
			</Form.Label>
			<Col sm="9">
				<Form.Control
					type="text"
					placeholder={props.placeholder}
					value={props.input}
					onChange={(event: any) =>
						props.onChange(event.target.value)
					}
				/>
			</Col>
		</Form.Group>
	);
};

export default FormInputText;
