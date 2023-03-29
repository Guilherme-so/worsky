import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { Form } from "react-bootstrap";

import { changePlan } from "../../../../../redux/slices/createAndEditAdSlice/createAndEditAdSlice";
import { selectAdFormState } from "../../../../../redux/slices/createAndEditAdSlice/createAndEditAdSelectors";
import {
  selectDashboard,
  selectPlans,
} from "../../../../../redux/slices/dashboardSlice/dashboardSelectors";

import styles from "./RadioContainer.module.scss";
import { useSelector } from "react-redux";

const RadioContainer = (props: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAdFormState);
  const plans = useAppSelector(selectPlans);
  const { isAdmin } = useSelector(selectDashboard);

  if (!state.plan) {
    dispatch(changePlan(plans.find((plan) => plan.id === 1)));
  }

  // if (isAdmin) {
  //   dispatch(changePlan(plans.find((plan) => plan.id === 4)));
  // }

  // if (isAdmin === true) return null;
  return (
    <div className={styles.radio_container}>
      <label className={styles.plan_label}>Plan:</label>
      <div className={styles.radio_btns}>
        {plans
          .filter((item) => item.id != 4)
          .map((plan) => (
            <div key={plan.id}>
              {state.plan?.id === plan.id ? (
                <Form.Check
                  inline
                  type="radio"
                  id="15"
                  label={`${plan.time_bought} days - ${parseFloat(
                    plan.price.toString()
                  ).toFixed(2)} USD`}
                  name="create-ad"
                  onClick={() =>
                    dispatch(
                      changePlan({
                        plan: plan,
                      })
                    )
                  }
                  defaultChecked
                />
              ) : (
                <Form.Check
                  inline
                  type="radio"
                  id="15"
                  label={`${plan.time_bought} days - ${parseFloat(
                    plan.price.toString()
                  ).toFixed(2)} USD`}
                  name="create-ad"
                  onClick={() =>
                    dispatch(
                      changePlan({
                        plan: plan,
                      })
                    )
                  }
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RadioContainer;
