import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { BiEdit } from "react-icons/bi";
import Loader from "react-loader-spinner";
import Select from "react-select";
import { RiErrorWarningLine } from "react-icons/ri";

import DashboardContainer from "../../../../components/Dashboard/DashboardContainer/DashboardContainer";
import FormInputText from "../../../../components/Dashboard/Forms/ProfileForm/FormInputText/FormInputText";
import PageTitle from "../../../../components/Dashboard/PageTitle/PageTitle";
import BtnBlue from "../../../../components/Dashboard/Buttons/BtnBlue/BtnBlue";

import {
	populateEditForm,
	setProfileFormBio,
	setProfileFormCountry,
	setProfileFormEmail,
	setProfileFormName,
	setProfileFormPhone,
	setProfileFormUsername,
} from "../../../../redux/slices/authSlice/authSlice";
import {
	selectCountries,
	selectProfileForm,
	selectProfileFormErrors,
	selectUser,
} from "../../../../redux/slices/authSlice/authSelectors";
import { changeUserAvatar, updateUser } from "../../../../redux/slices/authSlice/authAsyncActions";
import { customSelectStyles } from "./customSelectStyle";
import { isValidEmail } from "../../../../utils/validate";

import styles from "./Profile.module.scss";
import { isMobile } from "utils/utils";

const Profile = () => {
	const countries = useAppSelector(selectCountries);
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const profileForm = useAppSelector(selectProfileForm);
	const profileFormErrors = useAppSelector(selectProfileFormErrors);
	const [isAvatarEditLoading, setIsAvatarEditLoading] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(false);

	useEffect(() => {
		dispatch(populateEditForm({}));
	}, [dispatch]);

	const changeAvatar = (event: any) => {
		if (!event.target.files) {
			alert("There was an error while loading your file, try again");
			return;
		}

		setIsAvatarEditLoading(true);
		dispatch(changeUserAvatar(event.target.files[0])).then((any) => {
			setIsAvatarEditLoading(false);
			window.location.reload();
		});
	};

	const areRequiredFieldsEmpty = () =>
		profileForm.bio === "" ||
		profileForm.email === "" ||
		profileForm.name === "" ||
		profileForm.phone === "" ||
		profileForm.username === "" ||
		!profileForm.country.country_id;

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (areRequiredFieldsEmpty() || !isValidEmail(profileForm.email)) return;

		setIsFormLoading(true);

		dispatch(updateUser()).then(() => {
			setIsFormLoading(false);
			alert("Data updated");
		});
	};

	return (
		<DashboardContainer xPadding>
			<PageTitle style={{ marginBottom: "1.5rem" }}>Profile</PageTitle>

			<div className={styles.profile_img_container}>
				<div className={styles.profile_img}>
					<img src={user.avatar} alt="" />

					{isAvatarEditLoading ? (
						<div className={styles.loader_container}>
							<Loader type="Oval" color="rgb(13, 186, 230)" height={35} width={35} />
						</div>
					) : (
						<label className={styles.edit_icon}>
							<BiEdit />
							<input
								type="file"
								style={{ display: "none" }}
								onChange={(event) => changeAvatar(event)}
							/>
						</label>
					)}
				</div>
			</div>

			<Form className={styles.form}>
				<Col md="12" className={styles.flex_container}>
					<FormInputText
						label="Name"
						placeholder="some name"
						input={profileForm.name}
						onChange={(input) => dispatch(setProfileFormName(input))}
						containerClassName={styles.profile_text_input}
						hasError={profileFormErrors.hasNameError}
					/>

					<FormInputText
						label="Email"
						placeholder="example@gmail.com"
						input={profileForm.email}
						onChange={(input) => dispatch(setProfileFormEmail(input))}
						containerClassName={styles.profile_text_input}
						hasError={profileFormErrors.hasEmailError}
						isEmail
						errorType={profileFormErrors.emailErrorType}
					/>
				</Col>

				<Col md="12" className={styles.flex_container}>
					<FormInputText
						label="Username"
						placeholder="anyname"
						input={profileForm.username}
						onChange={(input) => dispatch(setProfileFormUsername(input))}
						containerClassName={styles.profile_text_input}
						hasError={profileFormErrors.hasUsernameError}
					/>

					<FormInputText
						label="Phone"
						placeholder="phone"
						input={profileForm.phone}
						onChange={(input) => dispatch(setProfileFormPhone(input))}
						containerClassName={styles.profile_text_input}
						hasError={profileFormErrors.hasPhoneError}
					/>
				</Col>

				<Row className="mb-5">
					<Col md={isMobile() ? "12" : "1"} className="d-flex align-items-center">
						<Form.Label className="h5 text-start">Country</Form.Label>
					</Col>
					<Col md={isMobile() ? "9" : "3"}>
						<Select
							options={countries}
							className={`${styles.custom_select}`}
							classNamePrefix={styles.custom_select}
							value={profileForm.country}
							onChange={(selected) => dispatch(setProfileFormCountry(selected))}
							styles={customSelectStyles}
						/>
					</Col>
				</Row>

				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Row className="my-2">
						<Form.Label className="h5">Bio</Form.Label>
					</Row>
					<div className={styles.area_container}>
						<Form.Control
							as="textarea"
							rows={6}
							style={{ resize: "none", width: "100%" }}
							value={profileForm.bio}
							onChange={(event) => dispatch(setProfileFormBio(event.target.value))}
							className={profileFormErrors.hasBioError ? styles.error_input : ""}
						/>
						<RiErrorWarningLine
							style={{
								display: profileFormErrors.hasBioError ? "block" : "none",
							}}
							className={styles.warn_icon}
						/>
					</div>

					<label
						className={`col-sm-12 mt-2 ${styles.error_text}`}
						style={{
							display: profileFormErrors.hasBioError ? "block" : "none",
						}}
					>
						This field is required!
					</label>
				</Form.Group>

				<Row className="m-0 mt-5">
					<div className={styles.submit_container}>
						<BtnBlue onClick={(event) => handleSubmit(event)} disabled={isFormLoading}>
							Save
						</BtnBlue>
					</div>
				</Row>
			</Form>
		</DashboardContainer>
	);
};

export default Profile;
