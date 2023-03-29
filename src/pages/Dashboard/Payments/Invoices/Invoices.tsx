import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import AppTable from "../../../../components/Dashboard/AppTable/AppTable";
import DashboardContainer from "../../../../components/Dashboard/DashboardContainer/DashboardContainer";
import ShouldRenewAdModal from "../../../../components/Dashboard/Modals/ShouldRenewAdModal/ShouldRenewAdModal";
import ExpiredAdCell from "../../../../components/Dashboard/ExpiredAdCell/ExpiredAdCell";
import PageSubTitle from "../../../../components/Dashboard/PageSubTitle/PageSubTitle";
import PageTitle from "../../../../components/Dashboard/PageTitle/PageTitle";
import InvoiceCell from "../../../../components/Dashboard/InvoiceCell/InvoiceCell";
import PdfPreviewModal from "../../../../components/Dashboard/Modals/PdfPreviewModal/PdfPreviewModal";
import RenewCompleteModal from "../../../../components/Dashboard/Modals/RenewCompleteModal/RenewCompleteModal";

import {
	selectInvoices,
	selectPendingRenewals,
} from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import {
	fetchInvoices,
	fetchPendingRenewals,
} from "../../../../redux/slices/dashboardSlice/dashboardAsyncActions";

// import styles from "./Invoices.module.scss";

const Invoices = (props: any) => {
	const dispatch = useAppDispatch();
	const adsExpired = useAppSelector(selectPendingRenewals);
	const invoices = useAppSelector(selectInvoices);

	const [adsLoading, setAdsLoading] = useState(false);
	const [invoicesLoading, setInvoicesLoading] = useState(false);

	useEffect(() => {
		setAdsLoading(true);
		setInvoicesLoading(true);
		dispatch(fetchPendingRenewals()).then((result) => setAdsLoading(false));
		dispatch(fetchInvoices()).then((result) => setInvoicesLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DashboardContainer xPadding>
			<ShouldRenewAdModal />
			<RenewCompleteModal />
			<PdfPreviewModal />

			<PageTitle>Invoices</PageTitle>

			<PageSubTitle type="warning">Pendent renewals</PageSubTitle>

			<AppTable
				isFetching={adsLoading}
				isEmpty={!adsExpired.length}
				emptyMessage="You don't have pendents ads"
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Logo</th>
						<th>Description</th>
						<th>Type</th>
						<th>Location</th>
						<th>Plan</th>
						<th>Expires</th>
						<th>Expired for</th>
						<th></th>
					</tr>
				</thead>
				{!adsLoading && (
					<tbody>
						{adsExpired.map((ad) => (
							<ExpiredAdCell ad={ad} key={ad.id} />
						))}
					</tbody>
				)}
			</AppTable>

			<PageSubTitle type="info">Invoices</PageSubTitle>

			<AppTable
				isFetching={invoicesLoading}
				isEmpty={!invoices.length}
				emptyMessage="You don't have invoices"
			>
				<thead>
					<tr>
						<th>ID</th>
						<th>Ad</th>
						<th>Plan</th>
						<th>Value</th>
						<th>Method</th>
						<th>Created</th>
						<th></th>
					</tr>
				</thead>
				{!invoicesLoading && (
					<tbody>
						{invoices.map((invoice) => (
							<InvoiceCell invoice={invoice} key={invoice.id} />
						))}
					</tbody>
				)}
			</AppTable>
		</DashboardContainer>
	);
};

export default Invoices;
