import { StylesConfig } from "react-select";
import { AdCategory } from "redux/slices/dashboardSlice/dashboardInterfaces";

type IsMulti = false;

const selectStyles: StylesConfig<AdCategory, IsMulti> = {
	container: (provided, state) => ({
		...provided,
		width: "100%",
	}),
	menuList: (provided, state) => ({
		...provided,
		maxHeight: 250,
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding: "0.375rem 0.7rem",
	}),
};

export default selectStyles;
