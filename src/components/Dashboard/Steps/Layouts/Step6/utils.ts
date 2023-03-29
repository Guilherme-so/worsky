import stepsState from "../../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";

export const generateForm = (state: stepsState) => {
	const form = new FormData();
	form.append("name", state.name);
	form.append("additional_info", state.additionalInformation);
	form.append("details_link", state.detailsLink);
	form.append("display_type", state.displayType);
	form.append("plan_id", state.plan!.id.toString());
	form.append("location_lat", state.location.lat);
	form.append("location_lng", state.location.lng);
	form.append("location_text", state.location.name);
	form.append("airport_id", state.location.airport_id ?? 0);
	form.append("logo_name", state.logoName);
	form.append("logo_file", state.logoFile as File);
	form.append("ad_category", state.category!.id.toString());

	if (state.displayFile) {
		form.append("display_file", state.displayFile as File);
		form.append("display_file_name", state.displayFileName);
	}

	return form;
};
