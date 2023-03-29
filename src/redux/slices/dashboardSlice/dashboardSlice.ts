import { createSlice } from "@reduxjs/toolkit";
import PaymentMethod from "../../interfaces/PaymentMethod";
import { DashBoardState } from "./dashboardInterfaces";
import {
  alterAdStatus,
  changeDefaultPayment,
  deleteAd,
  deletePaymentMethod,
  fetchAds,
  fetchInvoices,
  fetchPendingRenewals,
  fetchAdCategories,
  getDashboardStats,
  getPlans,
  previewInvoice,
  renewAd,
  retrievePayments,
  fetchIsAirportAdmin,
} from "./dashboardAsyncActions";

const initialState: DashBoardState = {
  ads: [],
  adToEdit: localStorage.getItem("adToEdit")
    ? JSON.parse(localStorage.getItem("adToEdit") ?? "")
    : null,
  openAdStatusMenuId: null,
  openAdConfigMenuId: null,
  payments: [],
  defaultPayment: null,
  statsData: null,
  plans: [],
  editPreviewAd: null,
  editPreviewModal: false,
  renewModalIsOpen: false,
  renewCompleteModalIsOpen: false,
  renewModalAd: null,
  pendingRenewals: [],
  invoices: [],
  invoicePdfPreview: null,
  pdfPreviewIsOpen: false,
  createAddModalIsOpen: false,
  categories: [],
  isAdmin: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    openStatusMenu: (state, action) => {
      state.openAdStatusMenuId = action.payload;
    },
    closeStatusMenu: (state, action) => {
      state.openAdStatusMenuId = null;
    },
    openAdConfigMenu: (state, action) => {
      state.openAdConfigMenuId = action.payload;
    },
    closeAdConfigMenu: (state, action) => {
      state.openAdConfigMenuId = null;
    },
    setAdToEdit: (state, action) => {
      localStorage.setItem("adToEdit", JSON.stringify(action.payload));
      state.adToEdit = action.payload;
    },
    openPreviewModal: (state, action) => {
      state.editPreviewAd = action.payload;
      state.editPreviewModal = true;
    },
    closePreviewModal: (state, action) => {
      state.editPreviewAd = null;
      state.editPreviewModal = false;
    },
    openRenewModal: (state, action) => {
      state.renewModalAd = action.payload;
      state.renewModalIsOpen = true;
    },
    closeRenewModal: (state, action) => {
      state.renewModalAd = null;
      state.renewModalIsOpen = false;
    },
    closeRenewCompleteModal: (state, action) => {
      state.renewCompleteModalIsOpen = false;
    },
    closePdfPreviewModal: (state, action) => {
      state.pdfPreviewIsOpen = false;
      state.invoicePdfPreview = null;
    },
    adEdited: (state, action) => {
      const ad = action.payload;
      localStorage.setItem("adToEdit", JSON.stringify(ad));
      state.adToEdit = ad;
      const index = state.ads.findIndex((el: any) => el.id === ad.id);
      state.ads[index] = ad;
    },
    paymentAdded: (state, action) => {
      const payment = action.payload;

      const formattedPayment: PaymentMethod = {
        card_brand: payment.card.brand,
        last4: payment.card.last4,
        id: payment.id,
        created: payment.created,
        isDefault: payment.isDefault ? true : false,
      };

      const newPayments = state.payments;
      newPayments.push(formattedPayment);
      state.payments = newPayments;

      if (formattedPayment.isDefault) state.defaultPayment = formattedPayment;
    },
    openCreateAdModal: (state) => {
      state.createAddModalIsOpen = true;
    },
    closeCreateAdModal: (state) => {
      state.createAddModalIsOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.ads = action.payload;
      })
      .addCase(alterAdStatus.fulfilled, (state, action) => {
        const ads = state.ads;
        const { newStatus, ad } = action.payload;
        const indexOfAd = ads.findIndex((_ad) => _ad.id === ad.id);
        ads[indexOfAd].status = newStatus;
        state.ads = ads;
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        const ad = action.payload;
        const indexOfAd = state.ads.findIndex((_ad) => _ad.id === ad.id);
        state.ads.splice(indexOfAd, 1);
      })
      .addCase(retrievePayments.fulfilled, (state, action) => {
        const methods = action.payload;
        state.payments = methods;
        state.defaultPayment = methods.find(
          (method: PaymentMethod) => method.isDefault
        );
      })
      .addCase(retrievePayments.rejected, (state, action) => {
        if (action.payload) {
          state.payments = [];
          state.defaultPayment = null;
        }
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
      })
      .addCase(renewAd.fulfilled, (state, action) => {
        state.renewModalAd = null;
        state.renewModalIsOpen = false;
        state.renewCompleteModalIsOpen = true;

        const ads = state.ads.slice();
        const ad = action.payload;

        let index = ads.findIndex((wAd) => wAd.id === ad.id);

        const newAd = ads[index];
        if (!newAd) return;
        newAd.expires_in = ad.expires_in;

        ads.splice(index, 1);
        ads.unshift(newAd);

        state.ads = ads;
      })
      .addCase(renewAd.rejected, (state, action) => {
        alert(
          "There was an error while renewing your ad. Check your payment method, reload the page and try again"
        );
      })
      .addCase(fetchPendingRenewals.fulfilled, (state, action) => {
        state.pendingRenewals = action.payload;
      })
      .addCase(fetchPendingRenewals.rejected, (state, action) => {
        alert(
          "There was an error while fetching your expired ads, try reloading the page"
        );
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        alert(
          "There was an error while fetching your invoices, try reloading the page"
        );
      })
      .addCase(changeDefaultPayment.fulfilled, (state, action) => {
        const method = action.payload as any;
        const defaultPayment = state.defaultPayment;
        state.defaultPayment = method;
        const methods = state.payments;
        let index = 0;
        if (defaultPayment) {
          index = methods.findIndex((m) => m.id === defaultPayment!.id);
          methods[index].isDefault = false;
        }

        index = methods.findIndex((m) => m.id === method.id);
        methods[index].isDefault = true;

        state.payments = methods;
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        const method = action.payload as any;
        if (method.isDefault) state.defaultPayment = null;
        let methods = state.payments;
        methods = methods.filter((m) => m.id !== method.id);
        state.payments = methods;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.statsData = action.payload;
      })
      .addCase(previewInvoice.fulfilled, (state, action) => {
        state.invoicePdfPreview = action.payload;
        state.pdfPreviewIsOpen = true;
      })
      .addCase(fetchAdCategories.fulfilled, (state, action) => {
        const categories = action.payload;
        state.categories = categories.map((category: any) => ({
          id: category.id,
          name: category.name,
          label: category.name,
        }));
      })
      .addCase(fetchIsAirportAdmin.fulfilled, (state, action) => {
        const { is_admin } = action.payload;
        state.isAdmin = is_admin;
      });
  },
});

export const {
  openStatusMenu,
  closeStatusMenu,
  openAdConfigMenu,
  closeAdConfigMenu,
  setAdToEdit,
  adEdited,
  paymentAdded,
  openPreviewModal,
  closePreviewModal,
  openRenewModal,
  closeRenewModal,
  closePdfPreviewModal,
  closeRenewCompleteModal,
  openCreateAdModal,
  closeCreateAdModal,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
