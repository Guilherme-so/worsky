import React from "react";
import AsyncSelect from "react-select/async";

// import styles from "./SearchLocation.module.scss";

const selectStyles = {
	menu: (provided: any) => ({ ...provided, textAlign: "start" }),
	indicatorsContainer: (provided: any) => ({ ...provided, display: "none" }),
	valueContainer: (provided: any) => {
		const paddingY = "0.5rem";

		return {
			...provided,
			paddingTop: paddingY,
			paddingBottom: paddingY,
		};
	},
};

const SearchLocation = (props: {
	searchForLocation: (inputValue: string, callback: any) => void;
	onInputChange: (input: string) => void;
	onChange: (selected: string | null) => void;
	customSelectStyles: any;
}) => {
	return (
		<AsyncSelect
			loadOptions={props.searchForLocation}
			defaultOptions={[]}
			cacheOptions
			onInputChange={(input) => {
				props.onInputChange(input);
				return input;
			}}
			onChange={(selected) => props.onChange(selected)}
			styles={{
				...selectStyles,
				...props.customSelectStyles,
			}}
			placeholder="Ex: city, airport (kjfk), etc"
		/>
	);
};

export default SearchLocation;
