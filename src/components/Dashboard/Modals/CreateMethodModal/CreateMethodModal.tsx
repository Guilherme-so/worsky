import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../../redux/hooks";
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import Loader from "react-loader-spinner";

import BtnBlue from "../../Buttons/BtnBlue/BtnBlue";
import { paymentAdded } from "../../../../redux/slices/dashboardSlice/dashboardSlice";
import axios from "../../../../constants/customAxios";

import styles from "./CreateMethodModal.module.scss";

enum errors {
	PAYMENT_ALREADY_EXISTS = "payment_method_already_exists",
}

const CreateMethodModal = (props: {
	show: boolean;
	handleClose: () => void;
}) => {
	const elements = useElements();
	const stripe = useStripe();
	const [checkbox, setCheckbox] = useState(false);
	const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
	const [btnDisabled, setBtnDisabled] = useState(false);
	const dispatch = useAppDispatch();

	let cardNumberEl: null | any = null,
		cardExpiryEl: null | any = null,
		cardCvcEl: null | any = null;

	if (elements) {
		cardNumberEl = elements!.getElement(CardNumberElement);
		cardExpiryEl = elements!.getElement(CardExpiryElement);
		cardCvcEl = elements!.getElement(CardCvcElement);
	}

	if (cardNumberEl && cardExpiryEl && cardCvcEl) {
		cardNumberEl!.update({ classes: { focus: styles.focused_input } });
		cardExpiryEl!.update({ classes: { focus: styles.focused_input } });
		cardCvcEl!.update({ classes: { focus: styles.focused_input } });
	}

	const addPaymentMethod = async () => {
		if (!checkbox) {
			alert("Checkbox must be marked");
			return;
		}

		setIsPaymentProcessing(true);
		setBtnDisabled(true);

		const cardElement = elements!.getElement(CardNumberElement)!;
		const { paymentMethod, error } = await stripe!.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (error) {
			console.log("[error]", error);
			setIsPaymentProcessing(false);
			setBtnDisabled(false);
			alert("There was an error while adding the payment method");
			return;
		}

		try {
			const response = await axios.post("v2/payment-methods", {
				paymentMethod: paymentMethod,
			});
			dispatch(paymentAdded(response.data));
		} catch (error: any) {
			console.log(error.response);

			const response = error?.response?.data?.error;

			if (response === errors.PAYMENT_ALREADY_EXISTS)
				alert("This method already exists");
			else alert("There was an error while adding the payment method");

			setIsPaymentProcessing(false);
			setBtnDisabled(false);
			return;
		}

		setIsPaymentProcessing(false);
		setBtnDisabled(false);
		props.handleClose();
	};

	return (
		<Modal show={props.show} onHide={props.handleClose} centered>
			<Modal.Body>
				<div className={styles.inputs_wrapper}>
					<CardNumberElement
						className={styles.mobile_input_container}
						options={{ placeholder: "Card Number" }}
					/>

					<CardExpiryElement
						className={styles.mobile_input_container}
						options={{ placeholder: "Expiration Date" }}
					/>

					<CardCvcElement
						className={styles.mobile_input_container}
						options={{ placeholder: "CVV" }}
					/>

					<Form.Check
						type="checkbox"
						className={styles.terms_checkbox}
					>
						<Form.Check.Input
							type="checkbox"
							isInvalid
							onChange={(event) =>
								setCheckbox(event.target.checked)
							}
						/>
						<Form.Check.Label>
							I accept Worsky's advertiser terms and Worsky's ad
							privacy policy."
						</Form.Check.Label>
					</Form.Check>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={props.handleClose}
					style={{
						fontSize: "1.7rem",
						borderRadius: "10px",
						padding: "0.2rem 1.5rem",
					}}
				>
					Close
				</Button>
				<BtnBlue
					onClick={addPaymentMethod}
					style={{ minWidth: "8rem" }}
					disabled={btnDisabled}
				>
					{isPaymentProcessing ? (
						<Loader
							type="Oval"
							color="white"
							height={35}
							width={35}
							// timeout={3000} //3 secs
						/>
					) : (
						"Add"
					)}
				</BtnBlue>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateMethodModal;
