import { createSlice } from "@reduxjs/toolkit";
import { isValidEmail } from "../../../utils/validate";
import {
  changeUserAvatar,
  fetchCountries,
  addDataToFirebaseUser,
  getUserData,
  login,
  loginWithFirebase,
  updateUser,
  fetchUserCategories,
} from "./authAsyncActions";
import {
  AuthState,
  Country,
  emailErrorTypes,
  ProfileFormErrors,
  UserCategory,
} from "./authInterfaces";

const initialErrorForm: ProfileFormErrors = {
  hasNameError: false,
  hasEmailError: false,
  emailErrorType: null,
  hasUsernameError: false,
  hasPhoneError: false,
  hasBioError: false,
};

const initialState: AuthState = {
  countries: JSON.parse(localStorage.getItem("countries") ?? "[]"),
  userCategories: JSON.parse(localStorage.getItem("userCategories") ?? "[]"),
  accessToken: localStorage.getItem("accessToken") ?? null,
  expiresIn: localStorage.getItem("expiresIn") ?? null,
  user: JSON.parse(localStorage.getItem("user") ?? "{}"),
  profileForm: {
    name: "",
    email: "",
    username: "",
    phone: "",
    bio: "",
    country: {
      country_id: 3,
      name: "Afghanistan",
      label: "Afghanistan",
      code: "AF",
      dial_code: 93,
      currency_code: "AFN",
    },
  },
  profileFormError: initialErrorForm,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.accessToken = null;
      state.expiresIn = null;
      state.user = null;
      localStorage.clear();
    },
    populateEditForm: (state, action) => {
      const user = state.user;
      const countries = state.countries;
      const country = countries.find(
        (country) => country.country_id === user.country_id
      )!;

      state.profileForm = {
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        bio: user.bio,
        country: country,
      };

      state.profileFormError = initialErrorForm;
    },
    setProfileFormName: (state, action) => {
      state.profileForm.name = action.payload;
      if (action.payload === "") state.profileFormError.hasNameError = true;
      else state.profileFormError.hasNameError = false;
    },
    setProfileFormEmail: (state, action) => {
      state.profileForm.email = action.payload;

      if (action.payload === "") {
        state.profileFormError.hasEmailError = true;
        state.profileFormError.emailErrorType = emailErrorTypes.REQUIRED;
      } else if (!isValidEmail(action.payload)) {
        state.profileFormError.hasEmailError = true;
        state.profileFormError.emailErrorType = emailErrorTypes.INVALID;
      } else {
        state.profileFormError.hasEmailError = false;
        state.profileFormError.emailErrorType = null;
      }
    },
    setProfileFormUsername: (state, action) => {
      state.profileForm.username = action.payload;
      if (action.payload === "") state.profileFormError.hasUsernameError = true;
      else state.profileFormError.hasUsernameError = false;
    },
    setProfileFormBio: (state, action) => {
      state.profileForm.bio = action.payload;
      if (action.payload === "") state.profileFormError.hasBioError = true;
      else state.profileFormError.hasBioError = false;
    },
    setProfileFormCountry: (state, action) => {
      state.profileForm.country = state.countries.find(
        (country) => country.country_id === action.payload.country_id
      )!;
    },
    setProfileFormPhone: (state, action) => {
      state.profileForm.phone = action.payload;
      if (action.payload === "") state.profileFormError.hasPhoneError = true;
      else state.profileFormError.hasPhoneError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        const countries = action.payload;

        state.countries = countries.map((country: Country) => {
          country.label = country.name;

          return country;
        });

        localStorage.setItem("countries", JSON.stringify(action.payload));
      })
      .addCase(login.fulfilled, (state, action) => {
        const loginData = action.payload;
        const now = new Date();
        const expireDate = new Date(now.getTime() + loginData.expires_in);

        state.accessToken = loginData.access_token;
        state.expiresIn = expireDate.toISOString();

        localStorage.setItem("accessToken", loginData.access_token);
        localStorage.setItem("expiresIn", expireDate.toISOString());
      })
      .addCase(loginWithFirebase.fulfilled, (state, action) => {
        const loginData = action.payload;
        const now = new Date();
        const ONE_MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;
        const expireDate = new Date(now.getTime() + ONE_MONTH_IN_MS);

        state.accessToken = loginData.access_token;
        state.expiresIn = expireDate.toISOString();

        localStorage.setItem("accessToken", loginData.access_token);
        localStorage.setItem("expiresIn", expireDate.toISOString());
      })
      .addCase(addDataToFirebaseUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(changeUserAvatar.fulfilled, (state, action) => {
        const user = state.user;
        user.avatar = action.payload.avatar;
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUserCategories.fulfilled, (state, action) => {
        state.userCategories = action.payload.map((category: UserCategory) => {
          category.label = category.name;

          return category;
        });

        localStorage.setItem("userCategories", JSON.stringify(action.payload));
      });
  },
});

export const {
  logout,
  populateEditForm,
  setProfileFormBio,
  setProfileFormCountry,
  setProfileFormEmail,
  setProfileFormName,
  setProfileFormPhone,
  setProfileFormUsername,
} = authSlice.actions;

export default authSlice.reducer;
