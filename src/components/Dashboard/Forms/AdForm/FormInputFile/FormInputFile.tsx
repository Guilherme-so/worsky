import React from "react";
import { BsFolderPlus } from "react-icons/bs";
import { Form, Col, Row } from "react-bootstrap";

import styles from "./FormInputFile.module.scss";

const FormInputFile = (props: {
	label: string;
	placeholder: string;
	onChange: (payload: any) => void;
	disabled?: boolean;
}) => {
	return (
		<Form.Group as={Row} className="mb-3 ms-0" controlId="formFile">
			<Form.Label column sm="3">
				{props.label}
			</Form.Label>
			<Col sm="9">
				<div
					className={`${styles.file_input} ${
						props.disabled ? styles.input_disabled : ""
					}`}
				>
					{props.placeholder}
					<label>
						{props.disabled ? (
							<input
								type="file"
								placeholder="File"
								style={{ display: "none" }}
								onChange={(event) => props.onChange(event)}
								disabled
							/>
						) : (
							<input
								type="file"
								placeholder="File"
								style={{ display: "none" }}
								onChange={(event) => props.onChange(event)}
							/>
						)}

						<BsFolderPlus className={styles.icon} />
					</label>
				</div>
			</Col>
		</Form.Group>

		// <div className={styles.file_input_container}>
		// 	<label className={styles.file_name}>{state.logoName}</label>

		// </div>
	);
};

export default FormInputFile;
