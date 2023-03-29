import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import EditAdCell from "../../../../components/Dashboard/EditAd/EditAdCell/EditAdCell";
import PageTitle from "../../../../components/Dashboard/PageTitle/PageTitle";
import AppTable from "../../../../components/Dashboard/AppTable/AppTable";
import DashboardContainer from "../../../../components/Dashboard/DashboardContainer/DashboardContainer";
import PreviewModal from "../../../../components/Dashboard/Modals/PreviewModal/PreviewModal";
import ShouldRenewAdModal from "../../../../components/Dashboard/Modals/ShouldRenewAdModal/ShouldRenewAdModal";
import RenewCompleteModal from "../../../../components/Dashboard/Modals/RenewCompleteModal/RenewCompleteModal";

import { fetchAds } from "../../../../redux/slices/dashboardSlice/dashboardAsyncActions";
import { selectAds } from "../../../../redux/slices/dashboardSlice/dashboardSelectors";

import styles from "./EditAdTablePage.module.scss";

const EditAdTablePage = () => {
	const dispatch = useAppDispatch();
	const ads = useAppSelector(selectAds);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		setIsFetching(true);
		dispatch(fetchAds()).then((result) => setIsFetching(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DashboardContainer xPadding>
			<PreviewModal />
			<ShouldRenewAdModal />
			<RenewCompleteModal />

			<PageTitle style={{ marginBottom: 0 }}>
				Edit advertisement
			</PageTitle>

			<div className={styles.info_text_container}>
				<span className={styles.info_text}>
					*(
					<i>
						You can click on advertisement name for a preview of the
						card that will be showed on cellphones
					</i>
					)
				</span>
			</div>
			<AppTable
				isFetching={isFetching}
				isEmpty={!ads.length}
				emptyMessage="You haven't created an AD yet, access the menu on the top left to create your first AD"
			>
				<thead>
					<tr>
						<th>Status</th>
						<th>Name</th>
						<th>Logo</th>
						<th>Description</th>
						<th>Type</th>
						<th>Location</th>
						<th>Views</th>
						<th>Clicks</th>
						<th>Plan</th>
						<th>Created</th>
						<th>Expires</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				{!isFetching && (
					<tbody>
						{ads.map((ad) => (
							<EditAdCell ad={ad} key={ad.id} />
						))}
					</tbody>
				)}
			</AppTable>
		</DashboardContainer>
	);
};

export default EditAdTablePage;
