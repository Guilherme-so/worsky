import RegisterState from "./RegisterStateInterface";

export enum cases {
	USERNAME = "USERNAME",
	EMAIL = "EMAIL",
	NAME = "NAME",
	COUNTRY = "COUNTRY",
	PHONE = "PHONE",
	PASSWORD = "PASSWORD",
	PASSWORD_CONFIRMATION = "PASSWORD_CONFIRMATION",
}

const localReducer = (
	state: RegisterState | any,
	action: { type: string; payload: any },
) => {
	switch (action.type) {
		case cases.USERNAME:
			return { ...state, username: action.payload };
		case cases.EMAIL:
			return { ...state, email: action.payload };
		case cases.NAME:
			return { ...state, name: action.payload };
		case cases.COUNTRY:
			return {
				...state,
				country: action.payload,
				phone: action.payload.dial_code,
			};
		case cases.PHONE:
			return { ...state, phone: action.payload };
		case cases.PASSWORD:
			return { ...state, password: action.payload };
		case cases.PASSWORD_CONFIRMATION:
			return { ...state, passwordConfirmation: action.payload };
		default:
			return state;
	}
};

export default localReducer;
