export const customSelectStyles = {
	valueContainer: (provided: any) => ({
		...provided,
		padding: "1rem 0.5rem 0.3rem 0.5rem",
		fontWeight: "bold",
	}),
	placeholder: (provided: any) => ({
		...provided,
		position: "absolute",
		bottom: "0.6rem",
		left: "0.8rem",
		fontWeight: 400,
	}),
	control: (provided: any) => ({
		...provided,
		border: "2px solid #727272",
	}),
	singleValue: (provided: any) => ({ ...provided, fontWeight: "bold" }),
	option: (provided: any) => ({ ...provided, zIndex: 1000 }),
};
