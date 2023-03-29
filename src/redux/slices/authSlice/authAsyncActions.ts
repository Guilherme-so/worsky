import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {
  BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
} from "../../../constants/customAxios";
import RegisterState from "../../../pages/Auth/Register/RegisterStateInterface";
import { RootState } from "../../store";
import unConfigAxios from "axios";

export const fetchCountries = createAsyncThunk(
  "fetchCountries",
  async (_, thunk) => {
    const state = thunk.getState() as RootState;
    if (state.auth.countries.length) return thunk.rejectWithValue(null);
    try {
      const response = await axios.get("country");
      return response.data.data;
    } catch (error: any) {
      console.log(
        "COUNTRY: ERROR");
      alert(
        "There was an error while loading the page, try reloading the page again"
      );
      return thunk.rejectWithValue(null);
    }
  }
);

export const fetchUserCategories = createAsyncThunk(
  "fetchUserCategories",
  async (_, thunk) => {
    const state = thunk.getState() as RootState;
    if (state.auth.userCategories.length) return thunk.rejectWithValue(null);

    try {
      const response = await axios.get("user/categories");
      return response.data;
    } catch (error: any) {
      console.log(
        "categories: error");
      alert(
        "There was an error while loading the page, try reloading the page again"
      );
      return thunk.rejectWithValue(null);
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: RegisterState, thunk) => {
    const body = {
      country_id: data.country?.country_id,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      phone: data.phone,
      username: data.username,
      email: data.email,
      name: data.name,
    };

    try {
      const response = await axios.post("register", body);

      if (response.data.success === false)
        return thunk.rejectWithValue(response.data);

      return response.data;
    } catch (error) {
      alert(
        "There was an error while registering your account, try again after reloading the page"
      );
      return thunk.rejectWithValue(null);
    }
  }
);

export const passwordReset = createAsyncThunk(
  "passwordReset",
  async (data: { email?: string; username?: string }, thunk) => {
    try {
      const response = await axios.post("password/store", data);

      if (response.status === 404) return thunk.rejectWithValue(404);

      return response.data;
    } catch (error: any) {
      alert(
        "There was an error while trying to reset your password, try again after reloading the page"
      );
      return thunk.rejectWithValue(null);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (data: { username: string; password: string }, thunk) => {
    const body = {
      ...data,
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: "*",
    };

    try {
      const response = await unConfigAxios.post(BASE_URL + "oauth/token", body);

      if (response.data.success === false)
        return thunk.rejectWithValue(response.data);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      return response.data;
    } catch (error) {
      alert(
        "There was an error while trying to login on your account, try again after reloading the page"
      );
      return thunk.rejectWithValue(error);
    }
  }
);

export const loginWithFirebase = createAsyncThunk(
  "loginWithFirebase",
  async (credential: string, thunk) => {
    try {
      const response = await axios.post("oauth/google-authorize", {
        credential: credential,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert("Email already taken");

        return thunk.rejectWithValue(error.response);
      }

      alert(
        "There was an error while trying to login on your account, try again after reloading the page"
      );
      return thunk.rejectWithValue({ ...error });
    }
  }
);

export const addDataToFirebaseUser = createAsyncThunk(
  "addDataToFirebaseUser",
  async (
    data: {
      username?: string;
      country: number;
      phone: string;
      email?: string;
      category: number;
    },
    thunk
  ) => {
    try {
      const response = await axios.put("user/additional-data", {
        country_id: data.country,
        username: data.username,
        phone: data.phone,
        email: data.email,
        category: data.category,
      });

      return response.data;
    } catch (error) {
      alert("There was an error while trying to update your data ");
      return thunk.rejectWithValue(error);
    }
  }
);

export const getUserData = createAsyncThunk("getUserData", async (_, thunk) => {
  try {
    const response = await axios.get("user");

    return response.data;
  } catch (error: any) {
    alert(
      "There was an error while trying to login on your account, try again after reloading the page"
    );
    return thunk.rejectWithValue(error);
  }
});

export const changeUserAvatar = createAsyncThunk(
  "changeUserAvatar",
  async (file: File, thunk) => {
    try {
      const form = new FormData();
      form.append("avatar", file);
      const response = await axios.post(`user/avatar`, form);

      if (!response.data.success) {
        alert("There was an error while updating your avatar");
        return thunk.rejectWithValue(false);
      }

      return response.data.data;
    } catch (error: any) {
      alert("There was an error while updating your avatar");
      return thunk.rejectWithValue(false);
    }
  }
);

export const updateUser = createAsyncThunk("updateUser", async (_, thunk) => {
  try {
    const state = thunk.getState() as RootState;
    let profileForm = state.auth.profileForm as any;
    profileForm = {
      ...profileForm,
      country_id: profileForm.country.country_id,
      country: undefined,
    };
    delete profileForm.country;

    const response = await axios.put("user", profileForm);

    if (!response.data.success) {
      alert("There was an error while updating your profile data");
      return thunk.rejectWithValue(false);
    }

    return response.data.data;
  } catch (error: any) {
    // console.error(error.response);
    alert("There was an error while updating your profile data");
    return thunk.rejectWithValue(false);
  }
});
