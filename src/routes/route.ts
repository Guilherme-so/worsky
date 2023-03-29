const ROUTES = {
	home: "/",

	about: {
		whyWorsky: "/why-worsky",
		howItWorks: "/how-it-works",
		adFormats: "/ad-formats",
		pricing: "/pricing",
	},

	auth: {
		login: "/login",
		register: "/register",
		passwordReset: "/password-reset",
	},

	dashboard: {
		home: "/dashboard",
		steps: "/dashboard/steps",
		adCreated: "/dashboard/ad-created",
		ads: "/dashboard/ads",
		editAd: "/dashboard/edit-ad",
		createAd: "/dashboard/create-ad",
		paymentMethods: "/dashboard/payment-methods",
		help: "/dashboard/help-faq",
		terms: "/dashboard/terms-of-use",
		editProfile: "/dashboard/profile",
		firebaseAddData: "/dashboard/user-add-data",
		invoices: "/dashboard/invoices",
	},
};

export default ROUTES;
