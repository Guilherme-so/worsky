import Ad from "../../interfaces/Ad";
import Plan from "../../interfaces/Plan";

export interface createAndEditForm {
	status: boolean;
	logo_name: string;
	logo_file: File | null;
	additional_info: string;
	display_type: string;
	display_file: File | null;
	display_file_name: string;
	name: string;
	location_lng: string;
	location_lat: string;
	location_text: string;
	location_search: string;
	location_is_marker: boolean;
	plan: Plan | null;
	details_link: string | null;
	airport_id: number | null;
	category?: number;
}

export interface createAndEditState {
	data: createAndEditForm;
	isLocationModalOpen: boolean;
	ad: Ad | null;
}
