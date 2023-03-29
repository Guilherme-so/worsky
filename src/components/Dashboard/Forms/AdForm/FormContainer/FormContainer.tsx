import React, { ReactElement, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { selectAdFormState } from "../../../../../redux/slices/createAndEditAdSlice/createAndEditAdSelectors";
import { changeStatus } from "../../../../../redux/slices/createAndEditAdSlice/createAndEditAdSlice";
import StatusDropdown from "../../../StatusDropdown/StatusDropdown";
import FormPreview from "../FormPreview/FormPreview";

import styles from "./FormContainer.module.scss";

const FormContainer = (props: { children: ReactElement[] }) => {
	const state = useAppSelector(selectAdFormState);
	const [statusMenuIsOpen, setStatusMenuIsOpen] = useState(false);
	const dispatch = useAppDispatch();

	const toggleStatusMenu = () => {
		setStatusMenuIsOpen((prevState) => !prevState);
	};

	return (
		<div className={styles.page_container}>
			<div className={styles.form_container}>
				<Form>
					<Form.Group as={Row} className="mb-3 ms-0">
						<Form.Label column sm="3">
							Status
						</Form.Label>
						<StatusDropdown
							statusOn={() => {
								dispatch(changeStatus(true));
								setStatusMenuIsOpen(false);
							}}
							statusOff={() => {
								dispatch(changeStatus(false));
								setStatusMenuIsOpen(false);
							}}
							statusToggle={state.status}
							toggleStatusMenu={() => toggleStatusMenu()}
							className={styles.status_container}
							toggleDropdownMenu={statusMenuIsOpen}
							dropdownStyle={{
								top: "125%",
							}}
						/>
					</Form.Group>
					{props.children}
				</Form>
			</div>
			<FormPreview ad={state} />
		</div>
	);
};

export default FormContainer;
