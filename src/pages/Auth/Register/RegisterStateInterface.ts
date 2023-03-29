import { Country } from "../../../redux/slices/authSlice/authInterfaces";

export default interface RegisterState {
	username: string;
	email: string;
	name: string;
	country: Country | undefined;
	phone: string;
	password: string;
	passwordConfirmation: string;
}
