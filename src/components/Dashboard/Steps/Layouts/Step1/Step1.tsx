import React, { useEffect, useState } from "react";
import Select from "react-select";
import { BsFolderPlus } from "react-icons/bs";

import actions from "../../../../../pages/Dashboard/Steps/reducer/StepActionsEnum";
import action from "../../../utils/action";
import stepsState from "../../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";

import ButtonNext from "../../ButtonNext/ButtonNext";
import { LOGO_FILE_SIZE } from "../../../../../constants/config";
import { useAppSelector } from "redux/hooks";
import { selectAdCategories } from "redux/slices/dashboardSlice/dashboardSelectors";
import { COLORS } from "../../../../../constants/colors";
import selectStyles from "./selectStyle";

import styles from "../../../../../pages/Dashboard/Steps/Steps.module.scss";

const Step1 = (props: {
  state: stepsState;
  localDispatch: React.Dispatch<action>;
}) => {
  const { state, localDispatch } = props;
  const [hasNameError, setHasNameError] = useState(false);
  const [hasLogoError, setHasLogoError] = useState(false);
  const [hasCategoryError, setHasCategoryError] = useState(false);
  const categories = useAppSelector(selectAdCategories);

  useEffect(() => {
    if (hasNameError && state.name.length) setHasNameError(false);
    if (hasLogoError && state.logoFile) setHasLogoError(false);
    if (hasCategoryError && state.category) setHasCategoryError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const uploadFile = (event: any) => {
    if (event.target.files && event.target.files?.length) {
      const file = event.target.files[0];

      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("The logo has to be an image");
        return;
      }

      if (file.size > LOGO_FILE_SIZE) {
        alert("The logo have to be 10 megabytes or smaller");
        return;
      }

      localDispatch({
        type: actions.UPLOAD_FILE,
        payload: { file: file, fileName: file.name },
      });
    }
  };

  const onNext = () => {
    if (!state.name.length || !state.logoFile || !state.category) {
      if (!state.name.length) setHasNameError(true);
      if (!state.logoFile) setHasLogoError(true);
      if (!state.category) setHasCategoryError(true);

      return;
    }

    localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
    localDispatch({ type: actions.NEXT_STEP });
  };

  return (
    <div
      className={styles.even_spaced_vertical_content}
      style={{ marginTop: 0 }}
    >
      <label></label> {/* empty label for unified spacing */}
      <div className={styles.centered_input_area}>
        <div className={`${styles.input_container}`}>
          <Select
            options={categories}
            styles={{
              ...selectStyles,
              option: (provided, styleState) => ({
                ...provided,
                background:
                  styleState.data.id === state.category?.id
                    ? COLORS.stepsLightBlue
                    : "white",
                color:
                  styleState.data.id === state.category?.id ? "white" : "black",
                "&:hover": {
                  background: COLORS.stepsLightBlue,
                  color: "white",
                },
              }),
              control: (provided, state) => {
                const control = {
                  ...provided,
                  ":hover": {
                    border: `2px solid ${COLORS.stepsLightBlue}`,
                  },
                };

                control.border = !hasCategoryError
                  ? `2px solid ${COLORS.stepsLightBlue}`
                  : `2px solid red`;

                if (state.isFocused)
                  control.boxShadow = `0 0 0 4px ${COLORS.lightGreenShadow}`;
                else if (hasCategoryError) control.boxShadow = "0 0 5px red";
                else control.boxShadow = "none";

                return control;
              },
            }}
            value={state.category}
            onChange={(selected) =>
              localDispatch({
                type: actions.CHANGE_CATEGORY,
                payload: selected,
              })
            }
          />
        </div>

        <div
          className={`${styles.input_container} ${
            hasNameError ? "error_container_active" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Name"
            className={`form-control ${styles.input}`}
            onChange={(event) =>
              localDispatch({
                type: actions.NAME,
                payload: event.target.value,
              })
            }
            value={state.name}
          />
        </div>

        <div className={`${styles.input_container}`}>
          <div
            className={styles.file_input_container}
            style={
              hasLogoError
                ? {
                    boxShadow: "0 0 5px red",
                    border: " 2px solid red",
                  }
                : undefined
            }
          >
            <label className={styles.file_name}>{state.logoName}</label>
            <label>
              <input
                type="file"
                placeholder="File"
                style={{ display: "none" }}
                onChange={(event) => uploadFile(event)}
              />
              <BsFolderPlus className={styles.file_input_icon} />
            </label>
          </div>
        </div>
      </div>
      <ButtonNext
        state={state}
        localDispatch={localDispatch}
        onNext={() => onNext()}
      />
    </div>
  );
};

export default Step1;
