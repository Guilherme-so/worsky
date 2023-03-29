import AuthBtn from "components/Auth/AuthBtn/AuthBtn";
import { FaFacebookF } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";

import { loginWithFirebase } from "redux/slices/authSlice/authAsyncActions";

import { facebookAuth } from "constants/firebase";
import ROUTES from "routes/route";

import styles from "./FacebookBtn.module.scss";

const FacebookBtn = () => {
	const location = useLocation();
	const history = useHistory();
	const { from } = (location.state as { from: { pathname: string } }) || {
		from: { pathname: "/" },
	};

	const dispatch = useAppDispatch();

	const signInWithFacebook = async () => {
		try {
			const token = await facebookAuth();
			const result = await dispatch(loginWithFirebase(token!));

			if (!loginWithFirebase.fulfilled.match(result)) throw new Error("");

			window.location.pathname = ROUTES.dashboard.steps;
			history.replace(from);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthBtn className={styles.facebook_btn} onClick={signInWithFacebook} type="button">
			<FaFacebookF className={styles.icon} />
			<span>Enter with Facebook</span>
		</AuthBtn>
	);
};

export default FacebookBtn;
