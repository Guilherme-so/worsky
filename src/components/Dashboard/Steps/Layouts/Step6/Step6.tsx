import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { AiFillCreditCard } from "react-icons/ai";
import { FaPaypal } from "react-icons/fa";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useAppDispatch } from "redux/hooks";

import BtnBlue from "components/Dashboard/Buttons/BtnBlue/BtnBlue";
import CardPayment from "../../CardPayment/CardPayment";

import action from "../../../utils/action";
import stepsState from "pages/Dashboard/Steps/reducer/StepsStateInterface";
import SelectCountry from "../../SelectCountry/SelectCountry";
import { Country } from "redux/slices/authSlice/authInterfaces";

import { currencyConversion } from "redux/slices/dashboardSlice/dashboardAsyncActions";
import { generateForm } from "./utils";
import axios from "constants/customAxios";

import styles from "pages/Dashboard/Steps/Steps.module.scss";
import localStyles from "./Step6.module.scss";
// import Mensagem from "components/Mensagem/Index";

enum activeTabs {
  CARD = "CARD",
  INITIAL = "INITIAL",
  SELECT_COUNTRY = "SELECT_COUNTRY",
  PAYPAL = "PAYPAL",
}

const Step6 = (props: {
  state: stepsState;
  localDispatch: React.Dispatch<action>;
  done: () => void;
}) => {
  const reduxDispatch = useAppDispatch();
  const { state, localDispatch, done } = props;
  const [activeTab, setActiveTab] = useState(activeTabs.INITIAL);
  const [country, setCountry] = useState<Country | null>(null);
  const [paypalChargeAmount, setPaypalChargeAmount] = useState("0");
  const [{ options }, paypalDispatch] = usePayPalScriptReducer();

  console.log(props)

  useEffect(() => {
    setActiveTab(activeTabs.INITIAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (country) {
      reduxDispatch(
        currencyConversion({
          country: country!,
          value: state.plan!.price,
        })
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
  }, [country, paypalDispatch, state.plan, reduxDispatch]);

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
      .then((orderId: any) => {
        return orderId;
      });
  };

  const onApprove = (data: any, actions: any) =>
    actions!.order!.capture().then(async (details: any) => {
      const adData = generateForm(state);
      adData.append("paypalOrderId", details.id);

      try {
        await axios.post("v2/ads", adData);
        localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
        localDispatch({ type: actions.TRIGGER_RIGHT_TRANSITION });
        setTimeout(() => done(), 500);
        return;
      } catch (error: any) {
        console.log(
          "There was an error while creating your ad, check your internet connection and paypal account and try again"
        );
      }
    });

  switch (activeTab) {
    default:
    case activeTabs.INITIAL:
      return (
        <div
          className={styles.even_spaced_vertical_content}
          style={{ width: "100%", justifyContent: "center", padding: "0 1rem" }}
        >
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <BtnBlue
              className={localStyles.btn_blue}
              onClick={() => setActiveTab(activeTabs.CARD)}
            >
              <AiFillCreditCard className={localStyles.btn_blue_icon} />
              <span>Payment with Card</span>
            </BtnBlue>
          </Row>

          <Row style={{ width: "100%", justifyContent: "center" }}>
            <BtnBlue
              className={localStyles.btn_blue}
              onClick={() => setActiveTab(activeTabs.SELECT_COUNTRY)}
            >
              <FaPaypal className={localStyles.btn_blue_icon} />
              <span>Payment with PayPal</span>
            </BtnBlue>
          </Row>
        </div>
      );

    case activeTabs.CARD:
      return (
        <CardPayment localDispatch={localDispatch} state={state} done={done} />
      );

    case activeTabs.SELECT_COUNTRY:
      return (
        <SelectCountry
          country={country}
          setCountry={(country) => setCountry(country)}
          nextTab={() => setActiveTab(activeTabs.PAYPAL)}
        />
      );

    case activeTabs.PAYPAL:
      return (
        <div className={localStyles.centered_div}>
          <PayPalButtons
            fundingSource="paypal"
            className={localStyles.pay_pal}
            forceReRender={[state.plan]}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </div>
      );
  }
};

export default Step6;
