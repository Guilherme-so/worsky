import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";

import BtnBlue from "../../../../components/Dashboard/Buttons/BtnBlue/BtnBlue";
import DashboardContainer from "../../../../components/Dashboard/DashboardContainer/DashboardContainer";
import FormInputFile from "../../../../components/Dashboard/Forms/AdForm/FormInputFile/FormInputFile";
import FormInputText from "../../../../components/Dashboard/Forms/AdForm/FormInputText/FormInputText";
import FormReadOnly from "../../../../components/Dashboard/Forms/AdForm/FormReadOnly/FormReadOnly";
import FormInputLocation from "../../../../components/Dashboard/Forms/AdForm/FormInputLocation/FormInputLocation";
import PageTitle from "../../../../components/Dashboard/PageTitle/PageTitle";
import FormContainer from "../../../../components/Dashboard/Forms/AdForm/FormContainer/FormContainer";
import LocationModal from "../../../../components/Dashboard/Modals/LocationModal/LocationModal";

import {
	changeAddInfo,
	changeDetailsLink,
	changeDisplayType,
	changeName,
	populateEditData,
} from "../../../../redux/slices/createAndEditAdSlice/createAndEditAdSlice";
import { adEdited } from "../../../../redux/slices/dashboardSlice/dashboardSlice";
import { displayType } from "../../../../components/Dashboard/utils/displayTypes";
import { selectAdToEdit } from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import { selectAdFormState } from "../../../../redux/slices/createAndEditAdSlice/createAndEditAdSelectors";
import { submitEdit } from "../../../../redux/slices/createAndEditAdSlice/createAndEditAdAsyncActions";
import {
	uploadDisplayType,
	uploadFile,
} from "../../../../components/Dashboard/utils/formFileUpload";
import ROUTES from "../../../../routes/route";

const EditAdFormPage = (props: any) => {
	const dispatch = useAppDispatch();
	const [btnLoading, setBtnLoading] = useState(false);
	const ad = useAppSelector(selectAdToEdit);
	const state = useAppSelector(selectAdFormState);
	const history = useHistory();

	useEffect(() => {
		dispatch(populateEditData(ad));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submit = (event: any) => {
		event.preventDefault();
		setBtnLoading(true);
		dispatch(submitEdit())
			.unwrap()
			.then((result) => {
				const ad = result?.ad;
				history.replace(ROUTES.dashboard.ads);
				dispatch(adEdited(ad));
			})
			.catch((err) => setBtnLoading(false));
	};

	return (
		<DashboardContainer xPadding>
			<LocationModal />
			<PageTitle>Edit Advertisement</PageTitle>
			<FormContainer>
				<FormInputText
					label="Name"
					placeholder="Piloto Brasil"
					input={state.name}
					onChange={(payload) => dispatch(changeName(payload))}
				/>

				<FormInputFile
					label="Logo"
					placeholder={state.logo_name}
					onChange={(event: any) => uploadFile(event, dispatch)}
				/>

				<FormInputText
					label="Description"
					placeholder="Materiais de estudo para avaliação"
					input={state.additional_info}
					onChange={(payload) => dispatch(changeAddInfo(payload))}
				/>

				<FormInputText
					label="Link (past here)"
					placeholder="https://example.com"
					input={state.details_link!}
					onChange={(payload) => dispatch(changeDetailsLink(payload))}
				/>

				{/* display type select */}
				<Form.Group
					as={Row}
					className="mb-3 ms-0"
					controlId="formPlaintextPassword"
				>
					<Form.Label column sm="3">
						Type
					</Form.Label>
					<Col sm="9">
						<Form.Select
							value={state.display_type}
							onChange={(event: any) =>
								dispatch(changeDisplayType(event.target.value))
							}
						>
							<option value={displayType.DISPLAY}>Display</option>
							<option value={displayType.BANNER}>Banner</option>
							<option value={displayType.VIDEO}>Video</option>
						</Form.Select>
					</Col>
				</Form.Group>

				{/* location input */}
				<FormInputLocation />

				<FormInputFile
					label="Banner or Video"
					placeholder={state.display_file_name}
					onChange={(event: any) =>
						uploadDisplayType(event, dispatch, state.display_type)
					}
					disabled={state.display_type === displayType.DISPLAY}
				/>

				<FormReadOnly
					label="Created"
					readOnly={ad.created_at}
					formatTimeStamp
				/>

				<FormReadOnly
					label="Expires"
					readOnly="20/11/21 - redial 15 days"
				/>

				<BtnBlue onClick={(event) => submit(event)}>
					{btnLoading ? (
						<Loader
							type="Oval"
							color="white"
							height={40}
							width={40}
						/>
					) : (
						"Save"
					)}
				</BtnBlue>
			</FormContainer>
		</DashboardContainer>
	);
};

export default EditAdFormPage;
