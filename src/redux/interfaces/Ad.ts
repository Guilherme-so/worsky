import Plan from "./Plan";

export default interface Ad {
	id: number;
	created_at: string;
	updated_at: string;
	name: string;
	logo_file_path: string;
	logo_name: string;
	additional_info: string;
	details_link: string;
	user_id: number;
	display_type: string;
	display_file_path: string | undefined;
	display_file_name: string | undefined;
	status: boolean;
	expires_in: string;
	location_text: string;
	location: any;
	plan_id: number;
	deleted_at: null;
	airport_id: number | null;
	country_id: number;
	should_notify: boolean;
	created: string;
	location_lat: string | number;
	location_lng: string | number;
	plan: Plan;
	logo_file: null | undefined | File;
	display_file: null | undefined | File;
	views: number;
	clicks: number;
}
