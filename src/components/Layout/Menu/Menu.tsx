import React from "react";
import { Link } from "react-router-dom";
import { CgHome } from "react-icons/cg";
import { ImPencil } from "react-icons/im";
import { AiOutlineFolderAdd, AiOutlineCreditCard } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { FaFileInvoiceDollar } from "react-icons/fa";

import styles from "./Menu.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectMenu, toggleMenu } from "../../../redux/slices/menuSlice";
import ROUTES from "../../../routes/route";

const Menu = () => {
	const dispatch = useAppDispatch();
	const menu = useAppSelector(selectMenu);

	return (
		<ul
			className={`${styles.menu_container} ${
				menu.isOpen ? styles.menu_open : styles.menu_close
			}`}
		>
			<Link
				to={ROUTES.dashboard.home}
				onClick={() => dispatch(toggleMenu({}))}
			>
				<li>
					<CgHome className={styles.icon} />
					<h3>Overview</h3>
				</li>
			</Link>

			<Link
				to={ROUTES.dashboard.ads}
				onClick={() => dispatch(toggleMenu({}))}
			>
				<li>
					<ImPencil
						className={`${styles.icon} ${styles.icon_edit}`}
					/>
					<h3>Edit advertisement </h3>
				</li>
			</Link>

			<Link
				to={ROUTES.dashboard.createAd}
				onClick={() => dispatch(toggleMenu({}))}
			>
				<li>
					<AiOutlineFolderAdd className={styles.icon} />
					<h3>Create advertisement</h3>
				</li>
			</Link>

			<Link
				to={ROUTES.dashboard.paymentMethods}
				onClick={() => dispatch(toggleMenu({}))}
			>
				<li>
					<AiOutlineCreditCard className={styles.icon} />
					<h3>Payment method </h3>
				</li>
			</Link>

			<Link
				to={ROUTES.dashboard.invoices}
				onClick={() => dispatch(toggleMenu({}))}
			>
				<li>
					<FaFileInvoiceDollar className={styles.icon} />
					<h3>Invoice </h3>
				</li>
			</Link>

			<Link
				to={ROUTES.dashboard.help}
				onClick={() => dispatch(toggleMenu({}))}
			>
				<li>
					<FiHelpCircle className={styles.icon} />
					<h3>Help/FAQ </h3>
				</li>
			</Link>
		</ul>
	);
};

export default Menu;
