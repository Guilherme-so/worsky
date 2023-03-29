import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom";

import SelectCountry from "components/Dashboard/Steps/SelectCountry/SelectCountry";

import {
	selectCreateAdModalIsOpen,
	selectDefaultPayment,
} from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import { currencyConversion } from "../../../../redux/slices/dashboardSlice/dashboardAsyncActions";
import { Country } from "redux/slices/authSlice/authInterfaces";
import { selectAdFormState } from "redux/slices/createAndEditAdSlice/createAndEditAdSelectors";
import { submitAdd } from "redux/slices/createAndEditAdSlice/createAndEditAdAsyncActions";

import ROUTES from "routes/route";

import styles from "./CreateAddModal.module.scss";

enum activeTabs {
	INITIAL = "INITIAL",
	CHOOSE_COUNTRY = "CHOOSE_COUNTRY",
	PAYPAL_PAYMENT = "PAYPAL_PAYMENT",
}

enum paymentMethod {
	PAYPAL = "paypal",
	STRIPE = "stripe",
}

const CreateAddModal = (props: { close: () => void }) => {
	const [btnLoading, setBtnLoading] = useState(false);
	const [paypalLoading, setPaypalLoading] = useState(false);
	const [country, setCountry] = useState<Country | null>(null);
	const [paypalChargeAmount, setPaypalChargeAmount] = useState("0");
	const [activeTab, setActiveTab] = useState(activeTabs.INITIAL);
	const [{ options }, paypalDispatch] = usePayPalScriptReducer();

	const isOpen = useAppSelector(selectCreateAdModalIsOpen);
	const form = useAppSelector(selectAdFormState);
	const defaultPayment = useAppSelector(selectDefaultPayment);
	const reduxDispatch = useAppDispatch();
	const history = useHistory();

	const { close } = props;

	useEffect(() => {
		setBtnLoading(false);
		setActiveTab(activeTabs.INITIAL);
	}, [isOpen]);

	useEffect(() => {
		if (country) {
			reduxDispatch(
				currencyConversion({
					country: country!,
					value: form.plan!.price,
				}),
			)
				.unwrap()
				.then((amount: any) => setPaypalChargeAmount(amount));

			paypalDispatch({
				type: "resetOptions",
				value: {
					...options,
					currency: country?.currency_code,
				},
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [country, paypalDispatch, reduxDispatch]);

	const done = () => {
		setBtnLoading(false);
		close();
		history.push(ROUTES.dashboard.ads);
	};

	const submitDefault = () => {
		setBtnLoading(true);

		reduxDispatch(
			submitAdd({ paymentType: paymentMethod.STRIPE, defaultPayment: defaultPayment }),
		)
			.unwrap()
			.then((res) => done())
			.catch((err) => {
				console.log(err);
				setBtnLoading(false);
			});
	};

	const createOrder = (data: any, actions: any) => {
		let value = (+paypalChargeAmount / 100).toFixed(2);
		if (+value <= 0) value = "1";

		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: value,
						},
					},
				],
			})
			.then((orderId: any) => orderId);
	};

	const onApprove = (data: any, actions: any) =>
		actions!.order!.capture().then(async (details: any) => {
			setPaypalLoading(true);

			reduxDispatch(
				submitAdd({ paymentType: paymentMethod.PAYPAL, paypalOrderId: details.id }),
			)
				.unwrap()
				.then((res) => {
					setPaypalLoading(false);
					done();
				})
				.catch((err) => {
					console.log(err);
					setPaypalLoading(false);
				});
		});

	let content = null;

	switch (activeTab) {
		default:
		case activeTabs.INITIAL:
			content = (
				<>
					<p>You have two options for creating an ad.</p>
					<p>
						You can pay by your registered payment method (check if you have one before
						choosing this option) or by PayPal
					</p>
				</>
			);
			break;

		case activeTabs.CHOOSE_COUNTRY:
			content = (
				<SelectCountry
					country={country}
					setCountry={(country) => setCountry(country)}
					nextTab={() => {
						setActiveTab(activeTabs.PAYPAL_PAYMENT);
						setPaypalLoading(false);
					}}
					flex
				/>
			);
			break;

		case activeTabs.PAYPAL_PAYMENT:
			content = (
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					{paypalLoading ? (
						<Loader type="Oval" color="black" height={70} width={70} />
					) : (
						<PayPalButtons
							fundingSource="paypal"
							className={styles.pay_pal}
							forceReRender={[form.plan]}
							createOrder={createOrder}
							onApprove={onApprove}
						/>
					)}
				</div>
			);
			break;
	}

	return (
		<Modal show={isOpen} onHide={close} centered dialogClassName={styles.modal} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Choose you payment option</Modal.Title>
			</Modal.Header>

			<Modal.Body className={styles.modal_body}>{content}</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={close}>
					Cancel
				</Button>
				<Button
					variant="info"
					className={styles.btn_renew}
					onClick={submitDefault}
					disabled={btnLoading}
				>
					{btnLoading ? (
						<Loader type="Oval" color="white" height={25} width={25} />
					) : (
						"Pay by Default Payment Method"
					)}
				</Button>

				<Button
					variant="info"
					className={styles.btn_renew}
					onClick={() => setActiveTab(activeTabs.CHOOSE_COUNTRY)}
				>
					Pay by PayPal
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateAddModal;
