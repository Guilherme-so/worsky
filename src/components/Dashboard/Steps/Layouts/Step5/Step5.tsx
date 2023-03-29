import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

import actions from "../../../../../pages/Dashboard/Steps/reducer/StepActionsEnum";
import action from "../../../utils/action";
import stepsState from "../../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";
import ButtonNext from "../../ButtonNext/ButtonNext";

import { COLORS } from "../../../../../constants/colors";
import Plan from "../../../../../redux/interfaces/Plan";
import { selectDashboardStats, selectPlans } from "../../../../../redux/slices/dashboardSlice/dashboardSelectors";

import styles from "../../../../../pages/Dashboard/Steps/Steps.module.scss";
import { selectUser } from "redux/slices/authSlice/authSelectors";


const Step5 = (props: {
  state: stepsState;
  localDispatch: React.Dispatch<action>;
}) => {
  const { state, localDispatch } = props;
  const plans = useSelector(selectPlans);


  const dispatch = useDispatch()
  // console.log(plans)
  // console.log(user)

  console.log(state)

  useEffect(() => {
    if (plans.length)
      localDispatch({
        type: actions.PLAN,
        payload: plans.find((plan) => plan.id === 1),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const radioSelected = (plan: Plan) => {
    if (plan.id !== state.plan?.id)
      localDispatch({
        type: actions.PLAN,
        payload: plan,
      });
  };

  return (
    <div
      className={styles.even_spaced_vertical_content}
      style={{ width: "100%" }}
    >
      <label className={styles.gray_label}>
        Choose how many days you want to advertise
      </label>
      {plans.length ? (
        <Form className={styles.radio_form}>
          {plans.filter((plan) => plan.id !== 4).map((plan) => (
            <div className={styles.radio_select_area} key={plan.id}>
              <div className={styles.blue_border_box}>
                <div className={styles.price_display}>
                  <h3>USD</h3>
                  <h2>{(Math.round(plan.price * 100) / 100).toFixed(2)}</h2>
                </div>
              </div>
              <h4 className={styles.duration_label}>
                during {plan.time_bought} days
              </h4>

              {plan.id === 1 ? (
                <Form.Check
                  name="group1"
                  type="radio"
                  id={`inline-radio-${plan.id}`}
                  className={styles.radio_check}
                  defaultChecked
                  onChange={(event) =>
                    event.target.checked ? radioSelected(plan) : ""
                  }
                />
              ) : (
                <Form.Check
                  name="group1"
                  type="radio"
                  id={`inline-radio-${plan.id}`}
                  className={styles.radio_check}
                  onChange={(event) =>
                    event.target.checked ? radioSelected(plan) : ""
                  }
                />
              )}
            </div>
          ))}
        </Form>
      ) : (
        <Loader
          type="Oval"
          color={COLORS.stepsLightBlue}
          height={80}
          width={80}
        />
      )}

      <ButtonNext
        state={state}
        localDispatch={localDispatch}
        style={{ marginTop: "0.8rem" }}
        // onNext={() => onNext()}
      />
    </div>
  );
};

export default Step5;
