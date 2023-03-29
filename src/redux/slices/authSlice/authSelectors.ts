import { RootState } from "../../store";

export const selectCountries = (state: RootState) => state.auth.countries;
export const selectToken = (state: RootState) => state.auth.accessToken;
export const selectExpiresIn = (state: RootState) => state.auth.expiresIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectProfileForm = (state: RootState) => state.auth.profileForm;
export const selectProfileFormErrors = (state: RootState) => state.auth.profileFormError;
export const selectUserCategories = (state: RootState) => state.auth.userCategories;
