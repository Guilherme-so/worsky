import React, { useEffect, useState } from "react";
import axios from "../../../../../constants/customAxios";

import actions from "../../../../../pages/Dashboard/Steps/reducer/StepActionsEnum";
import stepsState from "../../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";
import ButtonNext from "../../ButtonNext/ButtonNext";
import SearchLocation from "../../../../SearchLocation/SearchLocation";

import { useSelector } from "react-redux";
import {
  selectDashboard,
  selectPlans,
} from "redux/slices/dashboardSlice/dashboardSelectors";
import { generateForm } from "../Step6/utils";

import action from "../../../utils/action";
import styles from "../../../../../pages/Dashboard/Steps/Steps.module.scss";

const Step4 = (props: {
  state: stepsState;
  localDispatch: React.Dispatch<action>;
  done: () => void;
}) => {
  const { state, localDispatch, done } = props;

  const plans = useSelector(selectPlans);
  const { isAdmin } = useSelector(selectDashboard);

  useEffect(() => {
    if (isAdmin) {
      if (plans.length) {
        localDispatch({
          type: actions.PLAN,
          payload: plans.find((plan) => plan.id === 4),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAd = async () => {
    const adData = generateForm(state);
    try {
      await axios.post("v2/ads", adData);
      localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
      localDispatch({ type: actions.TRIGGER_RIGHT_TRANSITION });
      setTimeout(() => done(), 500);
      return;
    } catch (error: any) {
      console.log(error);
      alert("There was an error on creating your ad");
    }
  };

  const [hasLocationError, setHasLocationError] = useState(false);

  const setPosition = (position: any) =>
    localDispatch({ type: actions.GET_POSITION, payload: position });

  const positionError = (error: any) =>
    alert("You need to give position permission to use the map");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, positionError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasLocationError && state.location) setHasLocationError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onNext = () => {
    if (!state.location || !state.location.lat || !state.location.lng) {
      setHasLocationError(true);
      return;
    }

    if (!state.location.airport_id || !state.location.name) {
      if (
        window.confirm(
          "This ad is not linked to any airport in our system (you did not search for any). If you choose to proceed clients will still see the AD on their feeds and map, but it won't be showed on the about page of airports"
        )
      ) {
        localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
        localDispatch({ type: actions.NEXT_STEP });
      }
      return;
    }

    localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
    localDispatch({ type: actions.NEXT_STEP });
  };

  const searchForLocation = (inputValue: string, callback: any) => {
    axios
      .post("v2/search", {
        search: inputValue,
        lat: state.position ? state.position.coords.latitude : -14.7456013,
        lng: state.position ? state.position.coords.longitude : -40.0940494,
      })
      .then((response) => {
        const data = response.data.data;

        data.forEach((element: any) => {
          element.value = element.entity_id;
          element.label = element.name;
        });

        localDispatch({
          type: actions.LOCATION_FETCHED,
          payload: data,
        });

        callback(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.even_spaced_vertical_content}>
      <label className={styles.gray_label}>
        For better accuracy, you can move the pin
      </label>
      <div className={styles.input_container}>
        <SearchLocation
          searchForLocation={searchForLocation}
          onInputChange={(input) =>
            localDispatch({
              type: actions.LOCATION_SEARCHED,
              payload: input,
            })
          }
          onChange={(selected) =>
            localDispatch({
              type: actions.LOCATION_SELECTED,
              payload: selected,
            })
          }
          customSelectStyles={{
            control: (provided: any) => ({
              ...provided,
              boxShadow: hasLocationError ? "0 0 5px red" : "",
              border: hasLocationError ? "2px solid red" : "",
            }),
          }}
        />
      </div>

      {isAdmin === true ? (
        <ButtonNext
          state={state}
          localDispatch={localDispatch}
          style={{ marginTop: "0.8rem" }}
          onNext={() => createAd()}
          text="Create Ad"
        />
      ) : (
        <ButtonNext
          state={state}
          localDispatch={localDispatch}
          style={{ marginTop: "0.8rem" }}
          onNext={() => onNext()}
        />
      )}
    </div>
  );
};

export default Step4;
