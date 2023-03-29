import { displayType } from "components/Dashboard/utils/displayTypes";
import { createAndEditForm } from "redux/slices/createAndEditAdSlice/createAndEditAdInterfaces";
import { isValidLink } from "utils/validate";

export const validateForm = (form: createAndEditForm) => {
	if (!form.name || form.name === "") throw new Error("The name field can't be empty");

	if (!form.additional_info || form.additional_info === "")
		throw new Error("The description field can't be empty");

	if (!form.details_link || form.details_link === "")
		throw new Error("The link field can't be empty");

	if (form.details_link && !isValidLink(form.details_link))
		throw new Error(
			"Your link must start with either 'http://' or 'https://' to be considered valid",
		);

	if (
		!form.location_lat ||
		form.location_lat === "" ||
		!form.location_lng ||
		form.location_lng === ""
	)
		throw new Error("You must choose a location");

	if (!form.logo_file) throw new Error("You must choose a logo");

	if (form.display_type !== displayType.DISPLAY && !form.display_file)
		throw new Error("You must send a file for display types aside from 'Display'");
};
