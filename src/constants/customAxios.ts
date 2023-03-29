import axios from "axios";

export const BASE_URL = window.location.href.includes("worskydev")
	? "https://backend.worskydev.ml/"
	: "https://backend.worsky.com/";
// export const BASE_URL = "http://localhost:8000/";
export const API_URL = BASE_URL + "api/";

export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET!;
export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID!;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.clientSecret = CLIENT_SECRET;
axios.defaults.headers.clientId = CLIENT_ID;

const accessToken = localStorage.getItem("accessToken");
axios.defaults.headers.common["Authorization"] = accessToken ? `Bearer ${accessToken}` : "";

export default axios;
