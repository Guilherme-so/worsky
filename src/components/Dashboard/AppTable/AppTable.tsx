import React from "react";

import TableLoader from "../TableLoader/TableLoader";

import styles from "./AppTable.module.scss";

const AppTable = (props: {
	children: any;
	isFetching?: boolean;
	isEmpty?: boolean;
	emptyMessage?: string;
}) => {
	let emptyMessage = props.emptyMessage;
	if (!emptyMessage) emptyMessage = "This table is empty";
	return (
		<div
			className={styles.table_container}
			style={
				props.isFetching || props.isEmpty
					? { flexDirection: "column" }
					: {}
			}
		>
			<table>{props.children}</table>
			{props.isEmpty && !props.isFetching && (
				<div className="w-75 mt-5 text-danger h4">
					<strong> {emptyMessage}</strong>
				</div>
			)}
			{props.isFetching && <TableLoader />}
		</div>
	);
};

export default AppTable;
