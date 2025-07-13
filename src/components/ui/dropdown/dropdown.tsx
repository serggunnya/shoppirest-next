import React from "react";

interface DropdownProps {
	title: string;
	children: React.ReactNode;
}

import styles from "./dropdown.module.css";

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
	return (
		<div className={styles.dropdown}>
			{title}
			<div className={styles.dropdown_menu}>{children}</div>
		</div>
	);
};

export default Dropdown;
