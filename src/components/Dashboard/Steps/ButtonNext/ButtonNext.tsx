import React, { forwardRef, ForwardedRef } from "react";
import Loader from "react-loader-spinner";
import { Button } from "react-bootstrap";

import actions from "../../../../pages/Dashboard/Steps/reducer/StepActionsEnum";
import action from "../../utils/action";
import stepsState from "../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";

import styles from "./ButtonNext.module.scss";

const ButtonNext = forwardRef(
  (
    props: {
      onNext?: Function;
      state: stepsState;
      localDispatch: React.Dispatch<action>;
      style?: any;
      text?: string;
      isSpinning?: boolean;
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const { localDispatch, state } = props;

    const onNext = () => {
      localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
      if (state.step === 5)
        localDispatch({ type: actions.TRIGGER_RIGHT_TRANSITION });

      localDispatch({ type: actions.NEXT_STEP });
    };

    return (
      <Button
        variant="primary"
        className={styles.next_step_button}
        onClick={() => (props.onNext ? props.onNext() : onNext())}
        style={{ ...props.style }}
        ref={ref}
      >
        {props.isSpinning ? (
          <Loader
            type="Oval"
            color="white"
            height={35}
            width={35}
            // timeout={3000} //3 secs
          />
        ) : (
          `${props.text ? props.text : "Next"}`
        )}
      </Button>
    );
  }
);

export default ButtonNext;
