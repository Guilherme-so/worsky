import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BsFolderPlus } from "react-icons/bs";

import actions from "../../../../../pages/Dashboard/Steps/reducer/StepActionsEnum";
import action from "../../../utils/action";
import { displayType } from "../../../utils/displayTypes";
import ButtonNext from "../../ButtonNext/ButtonNext";
import stepsState from "../../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";
import { validateDisplayTypeUpload } from "../../../../../utils/validate";

import styles from "../../../../../pages/Dashboard/Steps/Steps.module.scss";

const Step3 = (props: {
  state: stepsState;
  localDispatch: React.Dispatch<action>;
}) => {
  const { state, localDispatch } = props;
  const [fileInputActive, setFileInputActive] = useState(false);
  const [hasFileInputError, setHasFileInputError] = useState(false);

  useEffect(() => {
    if (hasFileInputError && state.displayFile) setHasFileInputError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const radioSelected = (newDisplayType: string) => {
    if (newDisplayType !== state.displayType)
      localDispatch({
        type: actions.DISPLAY_TYPE,
        payload: newDisplayType,
      });
  };

  const uploadFile = (event: any) => {
    if (event.target.files && event.target.files?.length) {
      const file = event.target.files[0];

      try {
        validateDisplayTypeUpload(state.displayType, {
          name: file.name,
          size: file.size,
        });
      } catch (error: any) {
        alert(error.message);
        return;
      }

      localDispatch({
        type: actions.UPLOAD_DISPLAY_FILE,
        payload: { file: file, fileName: file.name },
      });
    }
  };

  const onNext = () => {
    if (
      (state.displayType === displayType.BANNER ||
        state.displayType === displayType.VIDEO) &&
      !fileInputActive
    ) {
      setFileInputActive(true);
      return;
    }

    if (fileInputActive && !state.displayFile) {
      setHasFileInputError(true);
      return;
    }

    localDispatch({ type: actions.TRIGGER_LEFT_TRANSITION });
    localDispatch({ type: actions.TRIGGER_RIGHT_TRANSITION });
    localDispatch({ type: actions.NEXT_STEP });
  };

  return (
    <div className={styles.even_spaced_vertical_content}>
      {fileInputActive ? (
        <>
          {/* label for right position */}
          <label></label>
          <div className={`${styles.input_container}`}>
            <div
              className={styles.file_input_container}
              style={
                hasFileInputError
                  ? {
                      boxShadow: "0 0 5px red",
                      border: " 2px solid red",
                    }
                  : undefined
              }
            >
              <label className={styles.file_name}>
                {state.displayFileName}
              </label>
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
        </>
      ) : (
        <Form className={styles.radio_form}>
          <div className={styles.radio_select_area}>
            <label>Display</label>
            <div
              className={`${styles.blue_border_box} ${styles.large_blue_border_box}`}
            >
              <div className={styles.blue_display}>
                <div className={styles.logo}>
                  <img src={URL.createObjectURL(state.logoFile!)} alt="" />
                </div>
                <div className={styles.logo_text}>
                  <h3>{state.name}</h3>
                  <p>{state.additionalInformation}</p>
                </div>
              </div>
            </div>

            <Form.Check
              inline
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              defaultChecked
              className={styles.radio_check}
              onChange={(event) =>
                event.target.checked ? radioSelected(displayType.DISPLAY) : ""
              }
              style={{ marginRight: 0 }}
            />
          </div>

          <div className={styles.radio_select_area}>
            <label>Banner</label>
            <div
              className={`${styles.blue_border_box} ${styles.large_blue_border_box}`}
            >
              <div className={styles.gray_display}>
                <h4>700 x 400 px jpg or png</h4>
              </div>
            </div>
            <Form.Check
              inline
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              className={styles.radio_check}
              onChange={(event) =>
                event.target.checked ? radioSelected(displayType.BANNER) : ""
              }
              style={{ marginRight: 0 }}
            />
          </div>

          <div className={styles.radio_select_area}>
            <label>Video</label>
            <div
              className={`${styles.blue_border_box} ${styles.large_blue_border_box}`}
            >
              <div className={styles.gray_display}>
                <h4>16:9 (700 x 400 px) 15 sec.</h4>
              </div>
            </div>
            <Form.Check
              inline
              name="group1"
              type="radio"
              id={`inline-radio-3`}
              className={styles.radio_check}
              onChange={(event) =>
                event.target.checked ? radioSelected(displayType.VIDEO) : ""
              }
              style={{ marginRight: 0 }}
            />
          </div>
        </Form>
      )}

      <ButtonNext
        state={state}
        localDispatch={localDispatch}
        style={{ marginTop: "0.8rem" }}
        onNext={() => onNext()}
      />
    </div>
  );
};

export default Step3;
