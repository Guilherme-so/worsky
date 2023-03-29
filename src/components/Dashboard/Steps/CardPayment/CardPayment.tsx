import { useRef, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { Form } from "react-bootstrap";

import ButtonNext from "components/Dashboard/Steps/ButtonNext/ButtonNext";

import actions from "pages/Dashboard/Steps/reducer/StepActionsEnum";
import action from "components/Dashboard/utils/action";
import stepsState from "pages/Dashboard/Steps/reducer/StepsStateInterface";

import axios from "constants/customAxios";
import { generateForm } from "../Layouts/Step6/utils";

import styles from "pages/Dashboard/Steps/Steps.module.scss";

const CardPayment = (props: {
  state: stepsState;
  localDispatch: React.Dispatch<action>;
  done: () => void;
}) => {
  const { state, localDispatch, done } = props;

  const stripe = useStripe();
  const elements = useElements();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const btnCreate = useRef<HTMLButtonElement>(null);

  const setBtnDisabled = (value: boolean) => {
    btnCreate!.current!.disabled = value;
  };

  const payWithCard = async () => {
    if (!state.checkbox) {
      alert("Checkbox must be marked");
      return;
    }

    setIsPaymentProcessing(true);
    setBtnDisabled(true);

    // const cardElement = elements!.getElement(CardNumberElement)!;
    const cardElement = elements!.getElement(CardElement)!;

    const { paymentMethod, error } = await stripe!.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("Error Strinpe: ", error);
      alert(
        "There was an error on processing your payment, check your card info or try with a diferent card."
      );
      setIsPaymentProcessing(false);
      setBtnDisabled(false);
      return;
    }

    if (!paymentMethod) {
      alert("All fields must be filled");
      setIsPaymentProcessing(false);
      setBtnDisabled(false);
      return;
    }

    const adData = generateForm(state);
    adData.append("paymentMethodId", paymentMethod!.id.toString());

    try {
      await axios.post("v2/ads", adData);
      localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
      localDispatch({ type: actions.TRIGGER_RIGHT_TRANSITION });
      setTimeout(() => done(), 500);
      return;
    } catch (error: any) {
      if (error.response?.data?.code === "payment_error") {
        alert(
          "There was an error on processing your payment, check your card info or try with a diferent card."
        );
        setIsPaymentProcessing(false);
        setBtnDisabled(false);
        return;
      }
      alert(
        "There was an error on processing your payment, check your card info or try with a diferent card."
      );
    }

    setIsPaymentProcessing(false);
    setBtnDisabled(false);
  };

  return (
    <div
      className={styles.even_spaced_vertical_content}
      style={{ width: "100%" }}
    >
      {/* <CardNumberElement
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
      /> */}

      <CardElement className={styles.mobile_input_container} />

      <Form.Check type="checkbox" className={styles.step_6_checkbox}>
        <Form.Check.Input
          type="checkbox"
          isInvalid
          onChange={(event) =>
            localDispatch({
              type: actions.CHECKBOX,
              payload: event.target.checked,
            })
          }
        />
        <Form.Check.Label>
          I accept Worsky's advertiser terms and Worsky's ad privacy policy."
        </Form.Check.Label>
      </Form.Check>

      <ButtonNext
        style={{
          marginTop: "0.8rem",
          minWidth: "320px",
          paddingBottom: "0.3rem",
        }}
        state={state}
        localDispatch={localDispatch}
        text="Create ADS account"
        isSpinning={isPaymentProcessing}
        onNext={() => payWithCard()}
        ref={btnCreate}
      />
    </div>
  );
};

export default CardPayment;
