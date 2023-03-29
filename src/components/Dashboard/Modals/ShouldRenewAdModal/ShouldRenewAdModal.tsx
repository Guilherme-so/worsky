import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";

import SelectCountry from "components/Dashboard/Steps/SelectCountry/SelectCountry";

import { closeRenewModal } from "../../../../redux/slices/dashboardSlice/dashboardSlice";
import {
	selectRenewModal,
	selectRenewModalAd,
} from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import {
	currencyConversion,
	renewAd,
} from "../../../../redux/slices/dashboardSlice/dashboardAsyncActions";
import { Country } from "redux/slices/authSlice/authInterfaces";

import styles from "./ShouldRenewAdModal.module.scss";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { paymentMethod } from "constants/paymentTypes";

enum activeTabs {
	INITIAL = "INITIAL",
	CHOOSE_COUNTRY = "CHOOSE_COUNTRY",
	PAYPAL_PAYMENT = "PAYPAL_PAYMENT",
}

const ShouldRenewAdModal = () => {
	const [btnLoading, setBtnLoading] = useState(false);
	const [paypalLoading, setPaypalLoading] = useState(false);
	const [country, setCountry] = useState<Country | null>(null);
	const [paypalChargeAmount, setPaypalChargeAmount] = useState("0");
	const [{ options }, paypalDispatch] = usePayPalScriptReducer();
	const [activeTab, setActiveTab] = useState(activeTabs.INITIAL);

	const isOpen = useAppSelector(selectRenewModal);
	const ad = useAppSelector(selectRenewModalAd);
	const reduxDispatch = useAppDispatch();

	useEffect(() => {
		setBtnLoading(false);
		setActiveTab(activeTabs.INITIAL);
	}, [isOpen]);

	const close = () => {
		reduxDispatch(closeRenewModal({}));
	};

	const renew = () => {
		setBtnLoading(true);
		reduxDispatch(renewAd({ paymentMethod: paymentMethod.STRIPE }))
			.unwrap()
			.then((res) => setBtnLoading(false))
			.catch((err) => {
				console.log(err);
				setBtnLoading(false);
			});
	};

	useEffect(() => {
		if (country) {
			reduxDispatch(
				currencyConversion({
					country: country!,
					value: ad!.plan!.price,
				}),
			)
				.unwrap()
				.then((amount) => setPaypalChargeAmount(amount));

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
				renewAd({ paymentMethod: paymentMethod.PAYPAL, paypalOrderId: details.id }),
			)
				.unwrap()
				.then((res) => setPaypalLoading(false))
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
					<p>You have two options for renewing an ad.</p>
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
							forceReRender={[ad!.plan]}
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
				<Modal.Title>Do you want to renew your ad?</Modal.Title>
			</Modal.Header>

			<Modal.Body className={styles.modal_body}>{content}</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={close}>
					Cancel
				</Button>
				<Button
					variant="info"
					className={styles.btn_renew}
					onClick={renew}
					disabled={btnLoading}
				>
					{btnLoading ? (
						<Loader type="Oval" color="white" height={20} width={20} />
					) : (
						"Renew by Default Payment Method"
					)}
				</Button>

				<Button
					variant="info"
					className={styles.btn_renew}
					onClick={() => setActiveTab(activeTabs.CHOOSE_COUNTRY)}
				>
					Renew using PayPal
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ShouldRenewAdModal;
