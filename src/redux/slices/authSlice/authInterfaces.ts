export interface Country {
	country_id: number;
	name: string;
	code: string;
	dial_code: number;
	label: string;
	currency_code: string;
}

export interface ProfileForm {
	name: string;
	email: string;
	username: string;
	phone: string;
	bio: string;
	country: Country;
}

export enum emailErrorTypes {
	REQUIRED = "REQUIRED",
	INVALID = "INVALID",
}

export interface ProfileFormErrors {
	hasNameError: boolean;
	hasEmailError: boolean;
	emailErrorType: emailErrorTypes | null;
	hasUsernameError: boolean;
	hasPhoneError: boolean;
	hasBioError: boolean;
	// hasCountryError: boolean;
}

export interface AuthState {
	countries: Country[];
	accessToken: string | null;
	expiresIn: string | null;
	user: any;
	profileForm: ProfileForm;
	profileFormError: ProfileFormErrors;
	userCategories: UserCategory[];
}

export interface UserCategory {
	id: number;
	name: string;
	label: string;
}
