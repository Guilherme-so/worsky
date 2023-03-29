import React, { useState, useEffect } from "react";

import actions from "../../../../../pages/Dashboard/Steps/reducer/StepActionsEnum";
import action from "../../../utils/action";
import stepsState from "../../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";
import ButtonNext from "../../ButtonNext/ButtonNext";

import { isValidLink } from "../../../../../utils/validate";

import styles from "../../../../../pages/Dashboard/Steps/Steps.module.scss";
import stepStyles from "./Step2.module.scss";

const Step2 = (props: {
  state: stepsState;
  localDispatch: React.Dispatch<action>;
}) => {
  const { state, localDispatch } = props;
  const [hasInfoError, setHasInfoError] = useState(false);
  const [hasLinkError, setHasLinkError] = useState(false);

  useEffect(() => {
    if (hasInfoError && state.name.length) setHasInfoError(false);
    if (hasLinkError && state.detailsLink) setHasLinkError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onNext = () => {
    if (!state.additionalInformation.length || !state.detailsLink.length) {
      if (!state.additionalInformation.length) setHasInfoError(true);
      if (!state.detailsLink.length) setHasLinkError(true);

      return;
    }

    if (!isValidLink(state.detailsLink)) {
      setHasLinkError(true);
      alert(
        "Your link must start with either 'http://' or 'https://' to be considered valid"
      );
      return;
    }

    localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
    localDispatch({ type: actions.NEXT_STEP });
  };

  return (
    <div
      className={styles.even_spaced_vertical_content}
      style={{ justifyContent: "flex-end" }}
    >
      <div className={styles.centered_input_area}>
        <label>Provide additional information about your company</label>
        <div className={stepStyles.text_and_counter_container}>
          <div
            className={`${styles.input_container} ${
              hasInfoError ? "error_container_active" : ""
            } ${stepStyles.text_area_container}`}
          >
            <textarea
              className={`form-control`}
              placeholder="Additional info"
              value={state.additionalInformation}
              onChange={(event) =>
                state.additionalInformation.length < 80 &&
                localDispatch({
                  type: actions.ADDITIONAL_INFO,
                  payload: event.target.value,
                })
              }
              style={{ height: "110px", resize: "none" }}
            />
          </div>
          <span className={stepStyles.word_counter}>
            {state.additionalInformation.length} / 80
          </span>
        </div>

        <label>Past here the link about your business (More details) </label>

        <div className={stepStyles.link_input_wrapper}>
          <div
            className={`${styles.input_container} ${
              hasLinkError ? "error_container_active" : ""
            } ${stepStyles.input_container}`}
          >
            <input
              type="text"
              placeholder="https:\\www.example.com"
              className={`form-control ${styles.input}`}
              value={state.detailsLink}
              onChange={(event) =>
                localDispatch({
                  type: actions.ADDITIONAL_INFO_LINK,
                  payload: event.target.value,
                })
              }
            />
          </div>

          <ButtonNext
            state={state}
            localDispatch={localDispatch}
            style={{ height: "3.1rem" }}
            onNext={() => onNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
