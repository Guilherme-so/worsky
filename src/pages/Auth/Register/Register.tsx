import React, { useReducer, useState } from "react";
import Select from "react-select";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import Auth from "../../../components/Auth/Auth";
import ButtonBlue from "../../../components/Auth/ButtonBlue/ButtonBlue";
import SuccessScreen from "../../../components/Auth/SucessScreen/SucessScreen";

import RegisterState from "./RegisterStateInterface";
import { isValidEmail, isEmptyString } from "../../../utils/validate";
import localReducer, { cases } from "./RegisterReducer";
import errorTypes from "./errorTypes";
import { selectCountries } from "../../../redux/slices/authSlice/authSelectors";
import { registerUser } from "../../../redux/slices/authSlice/authAsyncActions";

import styles from "./Register.module.scss";
import authStyles from "../../../components/Auth/Auth.module.scss";

interface errorPattern {
  type?: string;
  fields?: any;
}

const initialState: RegisterState = {
  username: "",
  email: "",
  name: "",
  country: undefined,
  phone: "",
  password: "",
  passwordConfirmation: "",
};

const Register = () => {
  const [state, localDispatch] = useReducer(localReducer, initialState);
  const [errors, setErrors]: any[] = useState({});
  const [registerFinished, setRegisterFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const countries = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();
  const authContainer = useRef<HTMLDivElement>(null);

  const scrollToContainerTop = () =>
    authContainer.current?.scrollTo({ top: 0, behavior: "smooth" });

  const assignError = (error: errorPattern) => {
    setErrors({ type: error.type, fields: error.fields });
    scrollToContainerTop();
  };

  const isSomeFieldEmpty = () =>
    isEmptyString(state.username) ||
    isEmptyString(state.email) ||
    isEmptyString(state.name) ||
    isEmptyString(state.phone) ||
    isEmptyString(state.password) ||
    isEmptyString(state.passwordConfirmation) ||
    !state.country;

  const requiredFieldsGate = () => {
    if (isSomeFieldEmpty()) {
      const fields = {
        username: isEmptyString(state.username) ?? null,
        email: isEmptyString(state.email) ?? null,
        name: isEmptyString(state.name) ?? null,
        phone: isEmptyString(state.phone) ?? null,
        password: isEmptyString(state.password) ?? null,
        passwordConfirmation: isEmptyString(state.passwordConfirmation) ?? null,
        country: !state.country ? "country" : null,
      };

      const error = new Error() as errorPattern;
      error.type = errorTypes.REQUIRED;
      error.fields = fields;

      throw error;
    }
  };

  const invalidEmailGate = () => {
    if (!isValidEmail(state.email)) {
      const error = new Error() as errorPattern;
      error.type = errorTypes.INVALID_EMAIL;

      throw error;
    }
  };

  const passwordNotMatchGate = () => {
    if (state.password !== state.passwordConfirmation) {
      const error = new Error() as errorPattern;
      error.type = errorTypes.PASSWORD_NOT_MATCH;

      throw error;
    }
  };

  const invalidPasswordGate = () => {
    if (state.password.length < 8) {
      const error = new Error() as errorPattern;
      error.type = errorTypes.INVALID_PASSWORD;

      throw error;
    }
  };

  const emailTakenGate = (errorBody: any) => {
    if (
      errorBody.email &&
      errorBody.email[0] === "The email has already been taken."
    ) {
      const error = new Error() as errorPattern;
      error.type = errorTypes.EMAIL_TAKEN;

      throw error;
    }
  };

  const usernameTakenGate = (errorBody: any) => {
    if (
      errorBody.username &&
      errorBody.username[0] === "The username has already been taken."
    ) {
      const error = new Error() as errorPattern;
      error.type = errorTypes.INVALID_USERNAME;

      throw error;
    }
  };

  const submitForm = async () => {
    const resultAction = await dispatch(registerUser(state));
    setIsLoading(false);

    if (registerUser.fulfilled.match(resultAction))
      return setRegisterFinished(true);
    else {
      const payload = resultAction.payload as {
        success: boolean;
        data: { errors: any; message: string };
      };

      const errorBody = payload.data.errors;

      try {
        emailTakenGate(errorBody);
        usernameTakenGate(errorBody);
      } catch (error: any) {
        return assignError(error);
      }

      if (!errorBody.email && !errorBody.username) {
        alert("Server error, please reload the page");
      }

      scrollToContainerTop();
    }
  };

  const validateForm = (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      requiredFieldsGate();
      invalidEmailGate();
      invalidPasswordGate();
      passwordNotMatchGate();
    } catch (error: any) {
      setIsLoading(false);
      return assignError(error);
    }

    submitForm();
  };

  return (
    <Auth
      title="Register"
      innerContentClassName={styles.register_area}
      innerContentStyle={registerFinished ? { overflowY: "hidden" } : {}}
      containerRef={authContainer}
      linkAreaClassName={styles.link_area}
      className={styles.auth_area}
    >
      {registerFinished ? (
        <SuccessScreen
          textLine1="To finalize your registration, click on the link sent to your email."
          textLine2=" Also check your spam box."
        />
      ) : (
        <form
          className="form-control"
          onSubmit={(event) => validateForm(event)}
        >
          <div
            className={`${authStyles.error_container} ${
              (errors.type === errorTypes.REQUIRED && errors.fields.username) ||
              errors.type === errorTypes.INVALID_USERNAME
                ? "error_container_active"
                : ""
            }`}
          >
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={state.username}
              onChange={(event) =>
                localDispatch({
                  type: cases.USERNAME,
                  payload: event.target.value,
                })
              }
            />
            {errors.type ? (
              <span className={authStyles.error_message}>
                {errors.type === errorTypes.REQUIRED && errors.fields.username
                  ? "*This field is required!"
                  : errors.type === errorTypes.INVALID_USERNAME
                  ? "*Username already taken!"
                  : ""}
              </span>
            ) : (
              ""
            )}
          </div>

          <div
            className={`${authStyles.error_container} ${
              (errors.type === errorTypes.REQUIRED && errors.fields.email) ||
              errors.type === errorTypes.INVALID_EMAIL ||
              errors.type === errorTypes.EMAIL_TAKEN
                ? "error_container_active"
                : ""
            }`}
          >
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={state.email}
              onChange={(event) =>
                localDispatch({
                  type: cases.EMAIL,
                  payload: event.target.value,
                })
              }
            />
            {errors.type ? (
              <span className={authStyles.error_message}>
                {errors.type === errorTypes.REQUIRED && errors.fields.email
                  ? "*This field is required!"
                  : errors.type === errorTypes.INVALID_EMAIL
                  ? "*Email format invalid!"
                  : errors.type === errorTypes.EMAIL_TAKEN
                  ? "*Email already registered!"
                  : ""}
              </span>
            ) : (
              ""
            )}
          </div>

          <div
            className={`${authStyles.error_container} ${
              errors.type === errorTypes.REQUIRED && errors.fields.name
                ? "error_container_active"
                : ""
            }`}
          >
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={state.name}
              onChange={(event) =>
                localDispatch({
                  type: cases.NAME,
                  payload: event.target.value,
                })
              }
            />
            {errors.type ? (
              <span className={authStyles.error_message}>
                {errors.type === errorTypes.REQUIRED && errors.fields.name
                  ? "*This field is required!"
                  : ""}
              </span>
            ) : (
              ""
            )}
          </div>

          <div
            className={`${authStyles.error_container} ${
              errors.type === errorTypes.REQUIRED && errors.fields.phone
                ? "error_container_active"
                : ""
            }`}
          >
            <input
              type="text"
              className="form-control"
              placeholder="phone"
              value={state.phone}
              onChange={(event) =>
                localDispatch({
                  type: cases.PHONE,
                  payload: event.target.value,
                })
              }
            />
            {errors.type ? (
              <span className={authStyles.error_message}>
                {errors.type === errorTypes.REQUIRED && errors.fields.phone
                  ? "*This field is required!"
                  : ""}
              </span>
            ) : (
              ""
            )}
          </div>

          <div
            className={`${authStyles.error_container} ${
              (errors.type === errorTypes.REQUIRED && errors.fields.password) ||
              errors.type === errorTypes.INVALID_PASSWORD
                ? "error_container_active"
                : ""
            }`}
          >
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={state.password}
              onChange={(event) =>
                localDispatch({
                  type: cases.PASSWORD,
                  payload: event.target.value,
                })
              }
            />
            {errors.type ? (
              <span className={authStyles.error_message}>
                {errors.type === errorTypes.REQUIRED && errors.fields.password
                  ? "*This field is required!"
                  : errors.type === errorTypes.INVALID_PASSWORD
                  ? "*Password invalid, password need to have at least 8 characters!"
                  : errors.type === errorTypes.PASSWORD_NOT_MATCH
                  ? "*Password and confirmation did not match!"
                  : ""}
              </span>
            ) : (
              ""
            )}
          </div>

          <div
            className={`${authStyles.error_container} ${
              (errors.type === errorTypes.REQUIRED &&
                errors.fields.passwordConfirmation) ||
              errors.type === errorTypes.INVALID_PASSWORD
                ? "error_container_active"
                : ""
            }`}
          >
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={state.passwordConfirmation}
              onChange={(event) =>
                localDispatch({
                  type: cases.PASSWORD_CONFIRMATION,
                  payload: event.target.value,
                })
              }
            />
            {errors.type ? (
              <span className={authStyles.error_message}>
                {errors.type === errorTypes.REQUIRED &&
                errors.fields.passwordConfirmation
                  ? "*This field is required!"
                  : errors.type === errorTypes.PASSWORD_NOT_MATCH
                  ? "*Password and confirmation did not match!"
                  : ""}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className={`${authStyles.error_container}`}>
            <Select
              options={countries}
              className={styles.custom_select}
              classNamePrefix={styles.custom_select}
              value={state.country}
              onChange={(selected) =>
                localDispatch({
                  type: cases.COUNTRY,
                  payload: selected,
                })
              }
            />
            {errors.type ? (
              <span className={authStyles.error_message}>
                {errors.type === errorTypes.REQUIRED && errors.fields.country
                  ? "*This field is required!"
                  : ""}
              </span>
            ) : (
              ""
            )}
          </div>

          <ButtonBlue className={styles.btn_blue} isLoading={isLoading}>
            Register
          </ButtonBlue>
        </form>
      )}
    </Auth>
  );
};

export default Register;
