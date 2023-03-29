import { RootState } from "../../store";

export const selectAdFormState = (state: RootState) =>
	state.createAndEditForm.data;
export const selectCurrentAd = (state: RootState) => state.createAndEditForm.ad;
export const selectIsLocationModalOpen = (state: RootState) =>
	state.createAndEditForm.isLocationModalOpen;
