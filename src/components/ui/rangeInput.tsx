import { FiltersFormState } from "@/types/products.interface";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RangeInputProps {
	name: string;
	placeholder: string;
}

const RangeInput: React.FC<RangeInputProps> = ({ name, placeholder }) => {
	const { control } = useFormContext<FiltersFormState>();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<input
					className="w-[48%] p-2 font-medium text-gray-900 border border-gray-300 
							rounded-b-sm bg-gray-50 focus:border-purple-600 outline-purple-600"
					type="number"
					onChange={(e) => {
						field.onChange(
							e.target.value === "" || isNaN(Number(e.target.value))
								? undefined
								: Number(e.target.value),
						);
					}}
					value={String(field.value) ?? ""}
					placeholder={placeholder}
				/>
			)}
		/>
	);
};

export default RangeInput;
