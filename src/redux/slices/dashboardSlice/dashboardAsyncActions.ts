import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../constants/customAxios";
import PaymentMethod from "../../interfaces/PaymentMethod";
import { RootState } from "../../store";
import { Country } from "../authSlice/authInterfaces";

export const fetchAds = createAsyncThunk("fetchAds", async (_, thunk) => {
  try {
    const response = await axios.get("v2/ads");

    return response.data;
  } catch (error: any) {
    alert(
      "There was an error while fetching your ADS, reload the page and try again"
    );
    return thunk.rejectWithValue(true);
  }
});

export const alterAdStatus = createAsyncThunk(
  "alterAdStatus",
  async (data: { newStatus: boolean; ad: any }, thunk) => {
    try {
      await axios.put(`v2/ads/${data.ad.id}/status-change`, {
        status: data.newStatus,
      });
      return { newStatus: data.newStatus, ad: data.ad };
    } catch (error) {
      alert(
        "There was an error while altering your AD status, reload the page and try again"
      );
      return thunk.rejectWithValue(true);
    }
  }
);

export const deleteAd = createAsyncThunk("deleteAd", async (ad: any, thunk) => {
  try {
    const response = await axios.delete(`v2/ads/${ad.id}`);
    return response.data;
  } catch (error: any) {
    // console.log(error.response);
    alert(
      "There was an error while deleting your AD, reload the page and try again"
    );
    return thunk.rejectWithValue(true);
  }
});

export const retrievePayments = createAsyncThunk(
  "retrievePayments",
  async (_, thunk) => {
    try {
      const response = await axios.get("v2/payment-methods");
      return response.data;
    } catch (error: any) {
      if (error.response?.data === "not_stripe_customer_error")
        return thunk.rejectWithValue(true);

      alert(
        "There was an error while fetching your payment methods, reload the page and try again"
      );
      return thunk.rejectWithValue(false);
    }
  }
);

export const changeDefaultPayment = createAsyncThunk(
  "changeDefaultPayment",
  async (paymentMethod: PaymentMethod, thunk) => {
    try {
      await axios.post("v2/payment-methods/default", {
        paymentMethod: paymentMethod,
      });
      return paymentMethod;
    } catch (error: any) {
      alert(
        "There was an error while changing your default payment, reload the page and try again"
      );
      return thunk.rejectWithValue(true);
    }
  }
);

export const deletePaymentMethod = createAsyncThunk(
  "deletePaymentMethod",
  async (paymentMethod: PaymentMethod, thunk) => {
    try {
      await axios.delete(`v2/payment-methods/${paymentMethod.id}`);
      return paymentMethod;
    } catch (error: any) {
      alert(
        "There was an error while deleting the method, reload the page and try again"
      );
      return thunk.rejectWithValue(false);
    }
  }
);

export const getDashboardStats = createAsyncThunk(
  "getDashboardStats",
  async (_, thunk) => {
    try {
      const response = await axios.get(`v2/ads/dashboard`);
      return response.data;
    } catch (error: any) {
      alert(
        "There was an error while fetching your personal data, reload the page and try again"
      );
      return thunk.rejectWithValue(false);
    }
  }
);

export const getPlans = createAsyncThunk("getPlans", async (_, thunk) => {
  try {
    const response = await axios.get("v2/ads/plans");
    return response.data;
  } catch (error: any) {
    alert(
      "There was an error while loading the page, reload the page and try again"
    );
    return thunk.rejectWithValue(true);
  }
});

export const renewAd = createAsyncThunk(
  "renewAd",
  async (data: { paypalOrderId?: string; paymentMethod: string }, thunk) => {
    try {
      const state = thunk.getState() as RootState;
      const ad = state.dashboard.renewModalAd;
      const response = await axios.post("v2/ads/renew-ads", {
        ad: ad!.id,
        paymentMethod: data.paymentMethod,
        paypalOrderId: data.paypalOrderId,
      });
      return response.data;
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);

export const fetchPendingRenewals = createAsyncThunk(
  "fetchPendingRenewals",
  async (_, thunk) => {
    try {
      const response = await axios.get("v2/ads/renew-ads");

      return response.data;
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);

export const fetchInvoices = createAsyncThunk(
  "fetchInvoices",
  async (_, thunk) => {
    try {
      const response = await axios.get("v2/ads/invoices");

      return response.data;
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);

export const downloadInvoice = createAsyncThunk(
  "downloadInvoice",
  async (invoice_id: number, thunk) => {
    try {
      const response = await axios.get(`v2/invoices/${invoice_id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = `invoice-${invoice_id}.pdf`;

      link.click();
      link.remove();

      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);

export const previewInvoice = createAsyncThunk(
  "previewInvoice",
  async (invoice_id: number, thunk) => {
    try {
      const response = await axios.get(`v2/invoices/${invoice_id}/download`, {
        responseType: "blob",
      });

      return response.data;
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);

export const currencyConversion = createAsyncThunk(
  "dashboard/currencyConversion",
  async (data: { country: Country; value: number }, thunk) => {
    try {
      const response = await axios.post(
        `v2/countries/${data.country!.country_id}/amount-conversion`,
        { value: data.value }
      );

      return response.data.amount;
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);

export const fetchAdCategories = createAsyncThunk(
  "dashboard/fetchAdCategories",
  async (_, thunk) => {
    try {
      const response = await axios.get("ads/categories");

      return response.data;
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);

export const fetchIsAirportAdmin = createAsyncThunk(
  "dashboard/fetchIsAirportAdmin",
  async (_, thunk) => {
    try {
      const { auth } = thunk.getState() as RootState;
      const response = await axios.post("/user/is-airport-admin", {
        email: auth.user.email,
      });
      return response.data;
    } catch (error: any) {
      return thunk.rejectWithValue(true);
    }
  }
);
