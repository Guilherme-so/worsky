import { RootState } from "../../store";

export const selectDashboard = (state: RootState) => state.dashboard;
export const selectAds = (state: RootState) => state.dashboard.ads;
export const selectOpenStatusMenuId = (state: RootState) => state.dashboard.openAdStatusMenuId;
export const selectOpenConfigMenuId = (state: RootState) => state.dashboard.openAdConfigMenuId;
export const selectAdToEdit = (state: RootState) => state.dashboard.adToEdit;
export const selectPayments = (state: RootState) => state.dashboard.payments;
export const selectDefaultPayment = (state: RootState) => state.dashboard.defaultPayment;
export const selectDashboardStats = (state: RootState) => state.dashboard.statsData;
export const selectPlans = (state: RootState) => state.dashboard.plans;
export const selectPreviewModal = (state: RootState) => state.dashboard.editPreviewModal;
export const selectPreviewAd = (state: RootState) => state.dashboard.editPreviewAd;
export const selectRenewModal = (state: RootState) => state.dashboard.renewModalIsOpen;
export const selectRenewModalAd = (state: RootState) => state.dashboard.renewModalAd;
export const selectRenewCompleteModal = (state: RootState) =>
	state.dashboard.renewCompleteModalIsOpen;
export const selectPendingRenewals = (state: RootState) => state.dashboard.pendingRenewals;
export const selectInvoices = (state: RootState) => state.dashboard.invoices;
export const selectPdfPreviewIsOpen = (state: RootState) => state.dashboard.pdfPreviewIsOpen;
export const selectPdfPreview = (state: RootState) => state.dashboard.invoicePdfPreview;
export const selectCreateAdModalIsOpen = (state: RootState) => state.dashboard.createAddModalIsOpen;
export const selectAdCategories = (state: RootState) => state.dashboard.categories;
