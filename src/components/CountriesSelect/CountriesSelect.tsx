import Select from "react-select";
import { useAppSelector } from "../../redux/hooks";
import { selectCountries } from "../../redux/slices/authSlice/authSelectors";
import { customSelectStyles } from "../Dashboard/utils/customSelectStyles";

import styles from "./CountriesSelect.module.scss";

type CountriesSelect = {
	onChange: (selected: any) => void;
	country: any;
}

const CountriesSelect = ({onChange, country}: CountriesSelect) => {
	const countries = useAppSelector(selectCountries);
	return (
		<Select
			options={countries}
			className={`${styles.custom_select}`}
			classNamePrefix={styles.custom_select}
			value={country}
			onChange={onChange}
			styles={customSelectStyles}
		/>
	);
};

export default CountriesSelect;
