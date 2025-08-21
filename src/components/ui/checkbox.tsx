import React, { memo } from "react";

interface DropdownProps {
	isChecked: boolean;
	isEmpty: boolean;
	onChange: () => void;
	children: React.ReactNode;
}

const Checkbox: React.FC<DropdownProps> = ({ isChecked, isEmpty, onChange, children }) => {
	return (
		<label className="text-md cursor-pointer font-medium text-gray-600 dark:text-gray-500">
			<input
				type="checkbox"
				className={`w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm
				focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 
				 	focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-purple-600 
					${isEmpty && isChecked ? "accent-red-300" : ""}`}
				checked={isChecked}
				onChange={onChange}
			/>
			<span
				className={`
					ml-2 ${isEmpty ? "text-gray-300" : ""} 
					${isEmpty && isChecked ? "text-red-300" : ""}
				`}
			>
				{children}
			</span>
		</label>
	);
};

export default memo(Checkbox);
