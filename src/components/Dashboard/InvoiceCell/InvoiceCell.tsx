import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
import { useAppDispatch } from "../../../redux/hooks";
import Loader from "react-loader-spinner";

import {
	downloadInvoice,
	previewInvoice,
} from "../../../redux/slices/dashboardSlice/dashboardAsyncActions";

import { COLORS } from "../../../constants/colors";
import styles from "./InvoiceCell.module.scss";

const InvoiceCell = (props: { invoice: any }) => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [isPreviewing, setIsPreviewing] = useState(false);

	const { invoice } = props;
	const dispatch = useAppDispatch();

	const initInvoiceDownload = async () => {
		setIsDownloading(true);
		await dispatch(downloadInvoice(invoice.id)).unwrap();
		setIsDownloading(false);
	};

	const preview = async () => {
		setIsPreviewing(true);
		await dispatch(previewInvoice(invoice.id)).unwrap();
		setIsPreviewing(false);
	};

	return (
		<tr>
			<td>{invoice.id}</td>
			<td style={{ textAlign: "start" }}>
				id: {invoice.ad_id} - {invoice.ad_name}
			</td>
			<td>{invoice.time_bought} days</td>
			<td>{(invoice.value / 100).toFixed(2)} USD</td>
			<td>
				{invoice.method
					? `Credit Card ${invoice.method?.card_brand} with end
				${invoice.method?.last4}`
					: invoice.paypal_order_id
					? "PayPal"
					: "undefined"}
			</td>
			<td>{invoice.created}</td>
			<td className={styles.actions_container}>
				{isPreviewing ? (
					<Loader type="Oval" color={COLORS.stepsLightBlue} height={22} width={22} />
				) : (
					<BiDetail
						className={styles.icon}
						style={{ marginRight: "0.5rem" }}
						onClick={preview}
					/>
				)}

				{isDownloading ? (
					<Loader type="Oval" color={COLORS.stepsLightBlue} height={22} width={22} />
				) : (
					<AiOutlineDownload
						className={styles.icon}
						style={{ marginLeft: "0.5rem" }}
						onClick={initInvoiceDownload}
					/>
				)}
			</td>
		</tr>
	);
};

export default InvoiceCell;
