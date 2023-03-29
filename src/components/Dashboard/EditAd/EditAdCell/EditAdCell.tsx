import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useHistory } from "react-router-dom";

import TableConfigIcon from "../../Buttons/TableConfigIcon/TableConfigIcon";
import StatusDropdown from "../../StatusDropdown/StatusDropdown";
import RenewBtn from "../../Buttons/RenewBtn/RenewBtn";

import {
	closeAdConfigMenu,
	closeStatusMenu,
	openAdConfigMenu,
	openStatusMenu,
	setAdToEdit,
	openPreviewModal,
} from "../../../../redux/slices/dashboardSlice/dashboardSlice";
import {
	selectOpenConfigMenuId,
	selectOpenStatusMenuId,
} from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import {
	alterAdStatus,
	deleteAd,
} from "../../../../redux/slices/dashboardSlice/dashboardAsyncActions";
import {
	defineDisplayType,
	formatDescription,
} from "../../../../constants/auxFunctions";
import ROUTES from "../../../../routes/route";

import styles from "./EditAdCell.module.scss";

const EditAdCell = (props: { ad: any }) => {
	const [statusOnIsLoading, setStatusOnIsLoading] = useState(false);
	const [statusOffIsLoading, setStatusOffIsLoading] = useState(false);
	const openStatusMenuId = useAppSelector(selectOpenStatusMenuId);
	const openConfigMenuId = useAppSelector(selectOpenConfigMenuId);
	const history = useHistory();
	const dispatch = useAppDispatch();

	const { ad } = props;

	const toggleStatusMenu = () => {
		if (openStatusMenuId === ad.id) dispatch(closeStatusMenu({}));
		else dispatch(openStatusMenu(ad.id));
	};

	const toggleConfigMenu = () => {
		if (openConfigMenuId === ad.id) dispatch(closeAdConfigMenu({}));
		else dispatch(openAdConfigMenu(ad.id));
	};

	const destroyAd = () => {
		if (
			window.confirm(
				"Are you sure you wanna delete this ad? This action is not reversible",
			)
		)
			dispatch(deleteAd(ad));
	};

	const changeStatus = async (newStatus: boolean) => {
		if (newStatus) {
			if (statusOffIsLoading) return;
			setStatusOnIsLoading(true);
		} else {
			if (statusOnIsLoading) return;
			setStatusOffIsLoading(true);
		}

		await dispatch(alterAdStatus({ newStatus: newStatus, ad: ad }));

		if (newStatus) setStatusOnIsLoading(false);
		else setStatusOffIsLoading(false);
		dispatch(closeStatusMenu({}));
	};

	const setEditForm = () => {
		dispatch(setAdToEdit(ad));
		history.push(ROUTES.dashboard.editAd);
	};

	const display_type = defineDisplayType(ad.display_type);
	const description = formatDescription(ad.additional_info);

	const openPreview = () => {
		dispatch(openPreviewModal(ad));
	};

	return (
		<tr>
			<td style={{ paddingTop: "1.5rem" }}>
				<StatusDropdown
					statusOn={() => changeStatus(true)}
					statusOff={() => changeStatus(false)}
					statusOffIsLoading={statusOffIsLoading}
					statusOnIsLoading={statusOnIsLoading}
					useLoad
					statusToggle={ad.status}
					toggleStatusMenu={() => toggleStatusMenu()}
					className={styles.status_container}
					toggleDropdownMenu={openStatusMenuId === ad.id}
					dropdownStyle={{ left: "-10%", top: "120%" }}
				/>
			</td>
			<td>
				<span className={styles.preview_link} onClick={openPreview}>
					{ad.name}
				</span>
			</td>
			<td className={styles.logo_container}>
				<img src={ad.logo_file_path} alt="" />
			</td>
			<td>{description}</td>
			<td>{display_type}</td>
			<td style={{ textAlign: "left", minWidth: "15rem" }}>
				{ad.location_text}
			</td>
			<td>{ad.views}</td>
			<td>{ad.clicks}</td>
			<td>{ad.plan.time_bought} days</td>
			<td>{ad.created}</td>
			<td>{ad.expires_in}</td>
			<td className={styles.actions_container}>
				<TableConfigIcon
					dropDownCondition={openConfigMenuId === ad.id}
					editBtnAction={setEditForm}
					deleteBtnAction={destroyAd}
					toggleMenu={toggleConfigMenu}
				/>
				<RenewBtn ad={ad} />
			</td>
		</tr>
	);
};

export default EditAdCell;
