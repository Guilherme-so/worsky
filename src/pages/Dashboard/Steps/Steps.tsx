import React, { useEffect, useReducer, useRef, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Redirect } from "react-router";
import {
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import MapComponent from "../../../components/Dashboard/Steps/MapComponent/MapComponent";
import Step1 from "../../../components/Dashboard/Steps/Layouts/Step1/Step1";
import Step2 from "../../../components/Dashboard/Steps/Layouts/Step2/Step2";
import Step3 from "../../../components/Dashboard/Steps/Layouts/Step3/Step3";
import Step4 from "../../../components/Dashboard/Steps/Layouts/Step4/Step4";
import Step5 from "../../../components/Dashboard/Steps/Layouts/Step5/Step5";
import Step6 from "../../../components/Dashboard/Steps/Layouts/Step6/Step6";
import CellPhone from "../../../components/Dashboard/Steps/CellPhone/CellPhone";
import LightWithInfo from "../../../components/Dashboard/Steps/LightWithInfo/LightWithInfo";

import reducer from "./reducer/StepReducer";
import actions from "./reducer/StepActionsEnum";
import initialState from "./reducer/InitialState";

import step1Img from "../../../assets/image/570.png";
import step2Img from "../../../assets/image/575.png";
import step3Img from "../../../assets/image/569.png";
import step4Img from "../../../assets/image/578.png";
import step5Img from "../../../assets/image/576.png";
import step6Img from "../../../assets/image/572.png";

import ROUTES from "../../../routes/route";

import styles from "./Steps.module.scss";
import "./transition.css";
import { useSelector } from "react-redux";
import { selectDashboard } from "redux/slices/dashboardSlice/dashboardSelectors";

const Steps = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const nodeRefLeft = useRef<any>(null);
  const nodeRefRight = useRef<any>(null);
  const [isDone, setIsDone] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paypalState, dispatch] = usePayPalScriptReducer();
  const { isAdmin } = useSelector(selectDashboard);

  useEffect(() => {
    dispatch({
      type: "setLoadingStatus",
      value: SCRIPT_LOADING_STATE.PENDING,
    });
  }, [dispatch]);

  const previousStep = () => {
    if (state.step > 1) {
      localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
      if (state.step === 4 || state.step === 6)
        localDispatch({ type: actions.TRIGGER_RIGHT_TRANSITION });
      localDispatch({ type: actions.PREVIOUS_STEP });
    }
  };

  const nextStep = () => {
    if (state.step < 6 && state.step + 1 <= state.maxStep) {
      localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
      if (state.step === 3 || state.step === 5)
        localDispatch({ type: actions.TRIGGER_RIGHT_TRANSITION });
      localDispatch({ type: actions.NEXT_STEP });
    }
  };

  let step: React.ReactElement | null = null,
    stepImage = "",
    stepText = "",
    rightContainer = null;

  const propsState = {
    state: state,
    localDispatch: localDispatch,
  };

  switch (state.step) {
    case 1:
      step = <Step1 {...propsState} />;
      stepImage = step1Img;
      stepText =
        "Enter your category and name so that your customers can recognize you";
      rightContainer = <CellPhone {...propsState} />;
      break;

    case 2:
      step = <Step2 {...propsState} />;
      stepImage = step2Img;
      stepText = "Business description:";
      rightContainer = <CellPhone {...propsState} />;
      break;

    case 3:
      step = <Step3 {...propsState} />;
      stepImage = step3Img;
      stepText = "Advertisement type:";
      rightContainer = <CellPhone {...propsState} />;
      break;

    case 4:
      step = <Step4 {...propsState} done={() => setIsDone(true)} />;
      stepImage = step4Img;
      stepText = "Place where your advertisement will appear:";
      rightContainer = <MapComponent {...propsState} />;

      break;

    case 5:
      step = <Step5 {...propsState} />;
      stepImage = step5Img;
      stepText = "Budget";
      rightContainer = <MapComponent {...propsState} isVirtualStatic />;

      break;

    case 6:
      step = <Step6 {...propsState} done={() => setIsDone(true)} />;
      stepImage = step6Img;
      stepText = "Billing";
      rightContainer = <LightWithInfo />;

      break;
  }

  if (isDone) return <Redirect to={ROUTES.dashboard.adCreated} />;
  else
    return (
      <div className={styles.steps}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            classNames="right_transition"
            nodeRef={nodeRefRight}
            addEndListener={(done: () => void) => {
              nodeRefRight.current?.addEventListener(
                "transitionend",
                done,
                false
              );
            }}
            key={state.rightTransitionTrigger}
          >
            <div className={styles.right_container}>
              <div
                ref={nodeRefRight}
                style={{ width: "100%", minHeight: "100%" }}
              >
                {rightContainer}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>

        <SwitchTransition mode="out-in">
          <CSSTransition
            classNames="left_transition"
            nodeRef={nodeRefLeft}
            addEndListener={(done: () => void) => {
              nodeRefLeft.current?.addEventListener(
                "transitionend",
                done,
                false
              );
            }}
            key={state.leftTransitionTrigger}
          >
            <div
              className={`${styles.step_container} ${styles.form_container}`}
              ref={nodeRefLeft}
            >
              <div className={styles.img_container}>
                <img src={stepImage} alt="" />
              </div>
              <div className={styles.step_indicator}>
                <div className={styles.icon_container}>
                  <MdNavigateBefore
                    className={styles.icon}
                    onClick={() => previousStep()}
                  />
                </div>
                <div className={styles.text_container}>
                  <span className={styles.step}>{state.step}</span>
                  {isAdmin ? " / 4" : " / 6 "}
                </div>

                <div className={styles.icon_container}>
                  <MdNavigateNext
                    className={styles.icon}
                    onClick={() => nextStep()}
                  />
                </div>
              </div>
              <h2
                className={`${styles.step_text} ${
                  state.step !== 1 ? styles.wide_step_text : ""
                }`}
              >
                {stepText}
              </h2>

              {step}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
};

export default Steps;
