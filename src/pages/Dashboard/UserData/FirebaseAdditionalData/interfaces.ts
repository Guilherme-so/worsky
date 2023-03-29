export interface Values {
	username: string;
	phone: string;
	email: string;
	country: number;
	category: number;
}

export interface Errors {
	email?: string;
	username?: string;
	country?: string;
	phone?: string;
	category?: string;
}
