import { createSlice } from "@reduxjs/toolkit";
import { displayType } from "../../../components/Dashboard/utils/displayTypes";
import { createAndEditState } from "./createAndEditAdInterfaces";

const initialState: createAndEditState = {
	data: {
		name: "",
		status: true,
		logo_file: null,
		logo_name: "logo.png",
		additional_info: "",
		display_type: displayType.DISPLAY,
		display_file_name: "video.mp4",
		display_file: null,
		location_lng: "5.44322",
		location_lat: "50.637402",
		location_text: "Choose a location",
		location_is_marker: false,
		plan: null,
		details_link: null,
		location_search: "",
		airport_id: null,
		category: undefined,
	},
	isLocationModalOpen: false,
	ad: null,
};

export const createAndEditAdSlice = createSlice({
	name: "createAndEditAd",
	initialState,
	reducers: {
		populateEditData: (state, action) => {
			const ad = action.payload;
			state.data.name = ad.name;
			state.data.status = ad.status;
			state.data.additional_info = ad.additional_info;
			state.data.display_file_name = ad.display_file_name
				? ad.display_file_name
				: "video.mp4";
			state.data.logo_name = ad.logo_name;
			state.data.display_type = ad.display_type;
			state.data.location_lng = ad.location_lng;
			state.data.location_lat = ad.location_lat;
			state.data.location_text = ad.location_text;
			state.data.location_search = ad.location_text;
			state.data.plan = null;
			state.data.details_link = ad.details_link;
			state.data.category = ad.ad_category_id;
			state.ad = ad;
		},
		dropAllData: (state, action) => {
			state.data = { ...initialState.data };
			state.ad = null;
		},
		changeName: (state, action) => {
			state.data.name = action.payload;
		},
		changeAddInfo: (state, action) => {
			state.data.additional_info = action.payload;
		},
		changeDetailsLink: (state, action) => {
			state.data.details_link = action.payload;
		},
		changeStatus: (state, action) => {
			state.data.status = action.payload;
		},
		changeDisplayType: (state, action) => {
			state.data.display_type = action.payload;
		},
		changeCategory: (state, action) => {
			state.data.category = action.payload;
		},
		setUploadedFile: (state, action) => {
			state.data.logo_file = action.payload.logo_file;
			state.data.logo_name = action.payload.logo_name;
		},
		setUploadedDisplayFile: (state, action) => {
			state.data.display_file = action.payload.display_file;
			state.data.display_file_name = action.payload.display_file_name;
		},
		toggleModal: (state, action) => {
			state.isLocationModalOpen = action.payload;
		},
		locationSearched: (state, action) => {
			state.data.location_search = action.payload;
		},
		locationSelected: (state, action) => {
			state.data.location_lat = action.payload.lat;
			state.data.location_lng = action.payload.lng;
			state.data.location_is_marker = action.payload.isMarker;

			if (action.payload.name && action.payload.airport_id) {
				state.data.location_text = action.payload.name;
				state.data.airport_id = action.payload.airport_id;
			}
		},
		changePlan: (state, action) => {
			state.data.plan = action.payload;
		},
	},
	extraReducers: (builder) => {},
});

export const {
	populateEditData,
	dropAllData,
	changeName,
	changeAddInfo,
	changeStatus,
	setUploadedFile,
	setUploadedDisplayFile,
	locationSearched,
	changeDisplayType,
	toggleModal,
	locationSelected,
	changePlan,
	changeDetailsLink,
	changeCategory,
} = createAndEditAdSlice.actions;
export default createAndEditAdSlice.reducer;
