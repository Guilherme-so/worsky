import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { ImCheckmark } from "react-icons/im";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";

import AppTable from "../../../../components/Dashboard/AppTable/AppTable";
import DashboardContainer from "../../../../components/Dashboard/DashboardContainer/DashboardContainer";
import PageTitle from "../../../../components/Dashboard/PageTitle/PageTitle";
import CreateMethodModal from "../../../../components/Dashboard/Modals/CreateMethodModal/CreateMethodModal";

import {
	selectDefaultPayment,
	selectPayments,
} from "../../../../redux/slices/dashboardSlice/dashboardSelectors";
import {
	changeDefaultPayment,
	deletePaymentMethod,
} from "../../../../redux/slices/dashboardSlice/dashboardAsyncActions";
import PaymentMethod from "../../../../redux/interfaces/PaymentMethod";

import styles from "./PaymentMethods.module.scss";

const PaymentMethods = () => {
	const dispatch = useAppDispatch();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const payments = useAppSelector(selectPayments);
	const defaultPayment = useAppSelector(selectDefaultPayment);

	const destroyPaymentMethod = (payment: PaymentMethod) => {
		if (window.confirm("Do you want to delete this payment method?"))
			dispatch(deletePaymentMethod(payment));
	};

	const handleModalClose = () => {
		setIsCreateModalOpen(false);
	};

	const showCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const markAsDefault = (payment: PaymentMethod) => {
		if (
			window.confirm(
				"Do you want to set this method as your default payment method?",
			)
		)
			dispatch(changeDefaultPayment(payment));
	};

	return (
		<DashboardContainer xPadding>
			<CreateMethodModal
				show={isCreateModalOpen}
				handleClose={handleModalClose}
			/>
			<PageTitle>Payment method</PageTitle>

			<div className={styles.new_payment_method_container}>
				<Button onClick={showCreateModal}>Add payment method</Button>
			</div>

			<AppTable
				isEmpty={!payments.length}
				emptyMessage="You haven't added a payment method yet"
			>
				<thead>
					<tr>
						<th></th>
						<th>Card</th>
						<th>Final</th>
						<th>Created</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{payments.map((payment) => (
						<tr key={Math.random()}>
							<td>
								<div
									className={styles.method_choice_circle}
									onClick={() => markAsDefault(payment)}
									style={{
										border: `${
											defaultPayment?.id === payment.id
												? "3px solid #2edf17"
												: ""
										}`,
									}}
								>
									{defaultPayment?.id === payment.id && (
										<ImCheckmark
											className={styles.default_method}
										/>
									)}
								</div>
							</td>
							<td>{payment.card_brand}</td>
							<td>{payment.last4}</td>
							<td>{payment.created}</td>
							<td>
								<FaRegTrashAlt
									onClick={() =>
										destroyPaymentMethod(payment)
									}
									className={styles.trash_icon}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</AppTable>
		</DashboardContainer>
	);
};

export default PaymentMethods;
