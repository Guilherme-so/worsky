import AuthBtn from "components/Auth/AuthBtn/AuthBtn";
import { FaGoogle } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";

import { loginWithFirebase } from "redux/slices/authSlice/authAsyncActions";

import { googleAuth } from "constants/firebase";
import ROUTES from "routes/route";

import styles from "./GoogleBtn.module.scss";

const GoogleBtn = () => {
	const location = useLocation();
	const history = useHistory();
	const { from } = (location.state as { from: { pathname: string } }) || {
		from: { pathname: "/" },
	};

	const dispatch = useAppDispatch();

	const signInWithGoogle = async () => {
		try {
			const token = await googleAuth();
			if (!token) throw new Error("Missing token");

			const result = await dispatch(loginWithFirebase(token!));

			if (!loginWithFirebase.fulfilled.match(result)) throw new Error("");

			window.location.pathname = ROUTES.dashboard.steps;
			history.replace(from);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthBtn className={styles.google_btn} onClick={signInWithGoogle} type="button">
			<FaGoogle className={styles.icon} />
			<span>Enter with Google</span>
		</AuthBtn>
	);
};

export default GoogleBtn;
