export const customSelectStyles = {
	container: (provided: any) => ({
		...provided,
		maxWidth: "90%",
	}),
	valueContainer: (provided: any) => ({
		...provided,
		padding: "0.5rem 0.5rem 0.3rem 0.5rem",
		fontWeight: "bold",
	}),
	placeholder: (provided: any) => ({
		...provided,
		fontWeight: 400,
	}),
	control: (provided: any) => ({
		...provided,
	}),
	singleValue: (provided: any) => ({ ...provided, fontWeight: "bold" }),
	option: (provided: any) => ({ ...provided, zIndex: 1000 }),
	indicatorsContainer: () => ({ display: "none" }),
	menu: (provided: any) => ({ ...provided, maxHeight: "220px" }),
	menuList: (provided: any) => ({
		...provided,
		maxHeight: "220px",
		textAlign: "start",
	}),
};
