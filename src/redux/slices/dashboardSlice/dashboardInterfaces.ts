import Ad from "../../interfaces/Ad";
import PaymentMethod from "../../interfaces/PaymentMethod";
import Plan from "../../interfaces/Plan";

export interface AdCategory {
	id: number;
	name: string;
	label: string;
}

export interface DashBoardState {
	ads: Ad[];
	openAdStatusMenuId: number | null;
	openAdConfigMenuId: number | null;
	adToEdit: any | null;
	payments: PaymentMethod[];
	defaultPayment: PaymentMethod | null;
	statsData: {
		adsClicked: number;
		adsViewed: number;
		growthFactor: number;
	} | null;
	plans: Plan[];
	editPreviewAd: Ad | null;
	editPreviewModal: boolean;
	renewModalIsOpen: boolean;
	renewCompleteModalIsOpen: boolean;
	renewModalAd: Ad | null;
	pendingRenewals: Ad[];
	invoices: any[];
	invoicePdfPreview: Blob | null;
	pdfPreviewIsOpen: boolean;
	createAddModalIsOpen: boolean;
	categories: AdCategory[];
	isAdmin: boolean
}
