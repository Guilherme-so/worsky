import React from "react";
import Loader from "react-loader-spinner";
import { RiPlayFill } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoMdPause } from "react-icons/io";

import styles from "./StatusDropdown.module.scss";

const StatusDropdown = (props: {
	statusOn: () => void;
	statusOff: () => void;
	useLoad?: boolean;
	statusOffIsLoading?: boolean | null;
	statusOnIsLoading?: boolean | null;
	statusToggle: boolean;
	toggleStatusMenu: () => void;
	className: string;
	toggleDropdownMenu: boolean;
	dropdownStyle?: any;
}) => {
	const {
		statusOn,
		statusOff,
		statusOffIsLoading,
		statusOnIsLoading,
		useLoad,
		statusToggle,
		toggleStatusMenu,
		className,
		toggleDropdownMenu,
	} = props;

	return (
		<div className={className}>
			<div
				className={styles.status_indicator}
				onClick={() => toggleStatusMenu()}
			>
				{statusToggle ? (
					<div
						className={`${styles.status} ${styles.status_on}`}
					></div>
				) : (
					<div
						className={`${styles.status} ${styles.status_off}`}
					></div>
				)}
				<TiArrowSortedDown className={styles.icon} />
			</div>
			{toggleDropdownMenu && (
				<div
					className={styles.dropdown_menu}
					style={{ ...props.dropdownStyle }}
				>
					{statusOffIsLoading && useLoad ? (
						<div
							className={`${styles.dropdown_box} ${styles.loading_status_box}`}
						>
							<Loader
								type="Oval"
								color="gray"
								height={30}
								width={30}
							/>
						</div>
					) : (
						<div
							className={styles.dropdown_box}
							onClick={() => statusOff()}
						>
							<div
								className={`${styles.status} ${styles.status_off}`}
							></div>
							<IoMdPause className={styles.icon} />
							Pause
						</div>
					)}

					{statusOnIsLoading && useLoad ? (
						<div
							className={`${styles.dropdown_box} ${styles.loading_status_box}`}
						>
							<Loader
								type="Oval"
								color="gray"
								height={30}
								width={30}
							/>
						</div>
					) : (
						<div
							className={styles.dropdown_box}
							onClick={() => statusOn()}
						>
							<div
								className={`${styles.status} ${styles.status_on}`}
							></div>
							<RiPlayFill className={styles.icon} />
							Play
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default StatusDropdown;
