import { Field, Formik } from "formik";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import BtnBlue from "components/Dashboard/Buttons/BtnBlue/BtnBlue";

import { Country, UserCategory } from "redux/slices/authSlice/authInterfaces";
import { addDataToFirebaseUser } from "redux/slices/authSlice/authAsyncActions";
import {
	selectCountries,
	selectUser,
	selectUserCategories,
} from "redux/slices/authSlice/authSelectors";
import { isValidEmail } from "utils/validate";
import { Errors, Values } from "./interfaces";

import ROUTES from "routes/route";

import styles from "./FirebaseAdditionalData.module.scss";

const FirebaseAdditionalData = () => {
	const user = useAppSelector(selectUser);
	const countries = useAppSelector(selectCountries);
	const userCategories = useAppSelector(selectUserCategories);
	const dispatch = useAppDispatch();
	const history = useHistory();

	const handleSubmit = (values: Values, formik: any) => {
		dispatch(
			addDataToFirebaseUser({
				username: values.username,
				country: values.country,
				phone: values.phone,
				email: values.email,
				category: values.category,
			}),
		)
			.unwrap()
			.then((res) => {
				formik.setSubmitting(false);
				history.replace(ROUTES.dashboard.home);
			})
			.catch((err) => formik.setSubmitting(false));
	};

	const validate = (values: Values) => {
		const errors: Errors = {};

		if (!isValidEmail(values.email)) errors.email = "This field must be a valid email";

		if (!values.phone) errors.phone = "This field is required";
		if (!values.username) errors.username = "This field is required";
		if (!values.country) errors.country = "This field is required";
		if (!values.category) errors.category = "This field is required";

		return errors;
	};

	useEffect(() => {
		if (!user.need_add_data) history.replace(ROUTES.dashboard.home);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const initialValues: Values = {
		username: '',
		phone: '',
		email: '',
		country: 0,
		category: 0,
	}

	return (
		<div className={styles.container}>
			<div className={styles.innter_container}>
				<h2>Complete your profile information</h2>

				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validate={validate}
				>
					{(props) => (
						<Form onSubmit={props.handleSubmit}>
							<Form.Group className={styles.group}>
								<Form.Label className={styles.label} htmlFor="username">
									Username
								</Form.Label>

								<Form.Control
									type="text"
									value={props.values.username}
									onChange={props.handleChange}
									name="username"
								/>
							</Form.Group>
							{props.errors.username && props.touched.username ? (
								<div className={styles.alert}>{props.errors.username}</div>
							) : null}

							<Form.Group className={styles.group}>
								<Form.Label className={styles.label} htmlFor="phone">
									Phone number
								</Form.Label>

								<Form.Control
									type="text"
									value={props.values.phone}
									onChange={props.handleChange}
									name="phone"
								/>
							</Form.Group>
							{props.errors.phone && props.touched.phone ? (
								<div className={styles.alert}>{props.errors.phone}</div>
							) : null}

							<Form.Group className={styles.group}>
								<Form.Label className={styles.label} htmlFor="email">
									Email
								</Form.Label>

								<Form.Control
									type="text"
									value={props.values.email}
									onChange={props.handleChange}
									name="email"
								/>
							</Form.Group>
							{props.errors.email && props.touched.email ? (
								<div className={styles.alert}>{props.errors.email}</div>
							) : null}

							<Form.Group className={styles.group}>
								<Form.Label className={styles.label} htmlFor="email">
									Country
								</Form.Label>

								<Field
									component={CustomSelect}
									name="country"
									options={countries}
								/>
							</Form.Group>
							{props.errors.country && props.touched.country ? (
								<div className={styles.alert}>{props.errors.country}</div>
							) : null}

							<Form.Group className={styles.group}>
								<Form.Label className={styles.label} htmlFor="email">
									User Category
								</Form.Label>

								<Field
									component={CustomSelect}
									name="category"
									options={userCategories}
								/>
							</Form.Group>
							{props.errors.category && props.touched.category ? (
								<div className={styles.alert}>{props.errors.category}</div>
							) : null}

							<BtnBlue style={{ marginTop: "1rem", width: "50%" }}>
								{props.isSubmitting ? (
									<Loader type="Oval" color="white" height={35} width={35} />
								) : (
									"Save"
								)}
							</BtnBlue>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

const CustomSelect = (props: any) => (
	<Select
		options={props.options}
		className={styles.custom_select}
		classNamePrefix={styles.custom_select}
		name={props.field.name}
		value={props.options.find((option: Country | UserCategory) =>
			"country_id" in option
				? option.country_id === props.field.value
				: option.id === props.field.value,
		)}
		onChange={(option: Country | UserCategory) =>
			"country_id" in option
				? props.form.setFieldValue(props.field.name, option.country_id)
				: props.form.setFieldValue(props.field.name, option.id)
		}
	/>
);

export default FirebaseAdditionalData;
