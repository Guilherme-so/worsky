import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentMethod } from "constants/paymentTypes";
import { displayType } from "../../../components/Dashboard/utils/displayTypes";
import axios from "../../../constants/customAxios";
import { isValidLink } from "../../../utils/validate";

const prepareDefaultForm = (formData: any) => {
	const body = new FormData();
	body.append("status", formData.status ? "1" : "0");
	body.append("name", formData.name);
	body.append("additional_info", formData.additional_info);
	body.append("location_lat", formData.location_lat);
	body.append("location_lng", formData.location_lng);
	body.append("location_text", formData.location_text);
	body.append("airport_id", formData.airport_id ?? 0);
	body.append("display_type", formData.display_type);
	body.append("ad_category", formData.category);

	if (formData.logo_file) {
		body.append("logo_file", formData.logo_file);
		body.append("logo_name", formData.logo_name);
	}

	if (formData.display_type !== displayType.DISPLAY) {
		body.append("display_file", formData.display_file);
		body.append("display_file_name", formData.display_file_name);
	}

	if (formData.plan) {
		body.append("plan_id", formData.plan.id);
	}

	if (formData.details_link) body.append("details_link", formData.details_link);

	return body;
};

export const submitEdit = createAsyncThunk("submitEdit", async (_, thunk) => {
	const state = thunk.getState() as any;
	const form = state.createAndEditForm.data;
	const ad = state.dashboard.adToEdit;
	const body = prepareDefaultForm(form);

	try {
		const response = await axios.post(`v2/ads/${ad.id}/edit-ad`, body);
		return { ad: response.data };
	} catch (error: any) {
		alert("There was an error while editing your AD, reload the page and try again");
		return thunk.rejectWithValue(true);
	}
});

export const submitAdd = createAsyncThunk(
	"submitAdd",
	async (
		data: { paymentType: paymentMethod; paypalOrderId?: string; defaultPayment?: any },
		thunk,
	) => {
		const state = thunk.getState() as any;
		const form = state.createAndEditForm.data;
		if (!isValidLink(form.details_link)) {
			alert(
				"Your link must start with either 'http://' or 'https://' to be considered valid",
			);
			return thunk.rejectWithValue(true);
		}

		const body = prepareDefaultForm(form);

		if (data.paymentType === paymentMethod.STRIPE) {
			body.append("paymentMethodId", data.defaultPayment.id);
			body.append("country_id", data.defaultPayment.country_id);
		} else body.append("paypalOrderId", data.paypalOrderId!);

		try {
			const response = await axios.post("v2/ads", body);
			return response.data;
		} catch (error: any) {
			alert("There was an error while creating your AD, reload the page and try again");
			return thunk.rejectWithValue(true);
		}
	},
);
