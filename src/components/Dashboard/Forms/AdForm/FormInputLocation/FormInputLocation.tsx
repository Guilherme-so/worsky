import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { IoEarthSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { selectAdFormState } from "../../../../../redux/slices/createAndEditAdSlice/createAndEditAdSelectors";
import { toggleModal } from "../../../../../redux/slices/createAndEditAdSlice/createAndEditAdSlice";

import styles from "./FormInputLocation.module.scss";

const FormInputLocation = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectAdFormState);

	return (
		<Form.Group
			as={Row}
			className="mb-3 ms-0"
			controlId="formInputLocation"
		>
			<Form.Label column sm="3">
				Location
			</Form.Label>
			<Col sm="9">
				<div className={styles.location_input}>
					{state.location_text}
					<label
						onClick={() => {
							dispatch(toggleModal(true));
						}}
					>
						<IoEarthSharp className={styles.icon} />
					</label>
				</div>
			</Col>
		</Form.Group>
	);
};

export default FormInputLocation;
