import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { selectMenu, toggleUserMenu } from "../../../redux/slices/menuSlice";
import { logout as actionLogout } from "../../../redux/slices/authSlice/authSlice";
import ROUTES from "../../../routes/route";

import styles from "./ProfileMenu.module.scss";

const ProfileMenu = () => {
  const menu = useAppSelector(selectMenu);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const toggleMenu = () => {
    dispatch(toggleUserMenu({}));
  };

  const logout = () => {
    dispatch(actionLogout({}));
    dispatch(toggleUserMenu({}));
    history.push("/");
  };

  return (
    <ul
      className={`${styles.profile_menu_container} ${
        menu.isUserOpen ? styles.profile_open : styles.profile_close
      }`}
    >
      <li>
        <Link to={ROUTES.dashboard.editProfile} onClick={() => toggleMenu()}>
          <h4>Profile</h4>
        </Link>
      </li>

      <li>
        <Link to={ROUTES.dashboard.terms} onClick={() => toggleMenu()}>
          <h4>Terms and conditions</h4>
        </Link>
      </li>

      <li>
        <Link to={ROUTES.dashboard.help} onClick={() => toggleMenu()}>
          <h4>Help / FAQ</h4>
        </Link>
      </li>

      <hr />
      <li>
        <span onClick={() => logout()}>
          <h4>Log out</h4>
        </span>
      </li>
    </ul>
  );
};

export default ProfileMenu;
