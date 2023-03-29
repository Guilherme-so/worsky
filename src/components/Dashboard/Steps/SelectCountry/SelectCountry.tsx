import BtnBlue from "components/Dashboard/Buttons/BtnBlue/BtnBlue";
import { COLORS } from "constants/colors";
import Select from "react-select";
import { useAppSelector } from "redux/hooks";
import { Country } from "redux/slices/authSlice/authInterfaces";
import { selectCountries } from "redux/slices/authSlice/authSelectors";

import styles from "./SelectCountry.module.scss";

const selectStyles = {
	option: (provided: any, state: any) => ({
		...provided,
		backgroundColor: state.isFocused ? COLORS.stepsLightBlue : undefined,
	}),
};

const SelectCountry = (props: {
	country: Country | null;
	setCountry: (country: Country) => void;
	nextTab: () => void;
	flex?: boolean;
}) => {
	const countries = useAppSelector(selectCountries);
	const { country, setCountry, nextTab } = props;

	return (
		<div className={`${props.flex ? styles.flex : ""}`}>
			<Select
				options={countries}
				className={styles.select}
				classNamePrefix={styles.select}
				value={country}
				onChange={(selected) => setCountry(selected!)}
				styles={selectStyles}
			/>

			<BtnBlue
				className={styles.btn_blue}
				disabled={country ? false : true}
				onClick={nextTab}
			>
				Chose this country
			</BtnBlue>
		</div>
	);
};

export default SelectCountry;
