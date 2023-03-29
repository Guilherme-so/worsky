import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import ROUTES from "../../../routes/route";

import logoIcon from "../../../assets/images/logo_color.png";

import writtenLogo from "../../../assets/image/logo-escrito.png";

import { toggleMenu, toggleUserMenu } from "../../../redux/slices/menuSlice";
import { selectUser } from "../../../redux/slices/authSlice/authSelectors";

import styles from "./Header.module.scss";
import { isMobile } from "utils/utils";
import LandingLinkNav from "./LandingLinkNav/LandingLinkNav";

const Header = () => {
  const location = useLocation();
  const [isInDashboard, setIsInDashboard] = useState(false);
  const [isInSteps, setIsInSteps] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (
      location.pathname.includes("dashboard") ||
      location.pathname.includes("steps")
    ) {
      if (location.pathname.includes("steps")) {
        setIsInDashboard(true);
        setIsInSteps(true);
      } else {
        setIsInDashboard(true);
        setIsInSteps(false);
      }
    } else {
      setIsInDashboard(false);
      setIsInSteps(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  let rightHeader = null;

  if (isInDashboard) {
    if (isInSteps)
      rightHeader = (
        <div className={styles.right_header_ads}>
          <Link to={ROUTES.dashboard.home} className={styles.manage_ads}>
            <div className={styles.manage_text}>Manage ADS</div>
            <div className={styles.icon_container}>
              <BsGearFill className={styles.icon} />
            </div>
          </Link>
        </div>
      );
    else
      rightHeader = (
        <div
          className={styles.user_icon}
          onClick={() => dispatch(toggleUserMenu({}))}
        >
          <FaUser className={styles.icon} />
        </div>
      );
  } else rightHeader = <LandingLinkNav />;

  let headerStyles = {};
  if (isMobile())
    headerStyles = {
      flexDirection: isInDashboard && !isInSteps ? "row" : "column",
    };

  return (
    <header className={styles.header} style={headerStyles}>
      <div
        className={`${styles.left_header}  ${
          isInDashboard && !isInSteps ? styles.left_header_menu : ""
        }`}
      >
        {isInDashboard && !isInSteps && (
          <div
            className={styles.header_menu}
            onClick={() => dispatch(toggleMenu({}))}
          >
            <GiHamburgerMenu className={styles.menu_icon} />
          </div>
        )}

        <Link
          to={isInDashboard && !isInSteps ? ROUTES.dashboard.home : ROUTES.home}
          style={{
            display: "flex",
            marginLeft: isMobile() ? (isInDashboard ? "1rem" : "0.5rem") : 0,
          }}
        >
          <div className={styles.header_logo}>
            <img src={logoIcon} alt="logo" />
          </div>
        </Link>

        <Link
          to={isInDashboard && !isInSteps ? ROUTES.dashboard.home : ROUTES.home}
          style={{
            display: "flex",
            marginLeft:
              isMobile() && (!isInDashboard || isInSteps) ? "1rem" : 0,
          }}
        >
          {isInDashboard && !isInSteps ? (
            <div className={styles.username}>
              <h3>{user?.username}</h3>
            </div>
          ) : (
            <div className={styles.header_logo}>
              <img src={writtenLogo} alt="" />
            </div>
          )}
        </Link>
      </div>

      {rightHeader}
    </header>
  );
};

export default Header;
