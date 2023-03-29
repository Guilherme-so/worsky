import React from "react";
import { Form, Col, Row } from "react-bootstrap";

import styles from "./FormReadOnly.module.scss";

const FormReadOnly = (props: {
	label: string;
	readOnly: string;
	formatTimeStamp?: boolean;
}) => {
	let text = props.readOnly;

	if (props.formatTimeStamp) {
		text = props.readOnly.split(" ")[0];
		let newText = text.split("-");
		text = newText[2] + "/" + newText[1] + "/" + newText[0];
	}

	return (
		<Form.Group
			as={Row}
			className="mb-3 ms-0"
			controlId="formPlaintextEmail"
		>
			<Form.Label column sm="3">
				{props.label}
			</Form.Label>
			<Col sm="9">
				<Form.Control
					plaintext
					readOnly
					defaultValue={text}
					className={styles.read_only_input}
				/>
			</Col>
		</Form.Group>
	);
};

export default FormReadOnly;
