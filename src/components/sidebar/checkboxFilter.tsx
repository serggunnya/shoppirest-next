"use client";

import { FiltersFormState } from "@/libs/zod/filtersSchema";
import { ISelectableOption } from "@/types/products.interface";
import { memo } from "react";
import { Control, Controller } from "react-hook-form";

type CheckboxFilterProps = {
	option: ISelectableOption;
	type: string;
	display_value: Record<string, string> | null;
	control: Control<FiltersFormState>;
};

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
	option,
	type,
	display_value,
	control,
}) => {
	return (
		<div className="pl-4">
			<Controller
				name={`${option.alias}.val`}
				control={control}
				render={({ field }) => {
					const values = field.value || [];
					const selectValue = option.data.value;
					const isChecked = values.includes(selectValue);

					const handleChange = () => {
						field.onChange(
							isChecked ? values.filter((v) => v !== selectValue) : [...values, selectValue],
						);
					};

					if (type === "TEXT") {
						return (
							<label>
								<input type="checkbox" checked={isChecked} onChange={handleChange} />
								<span className="ml-2">
									{`${display_value?.[String(option.data.value)] || option.data.value} (${option.amount})`}
								</span>
							</label>
						);
					} else if (type === "STRING") {
						return (
							<label>
								<input type="checkbox" checked={isChecked} onChange={handleChange} />
								<span className="ml-2">{`${option.data.value} (${option.amount})`}</span>
							</label>
						);
					} else if (type === "NUMBER") {
						const value = option.data.value as number;
						const unit_div = option.data?.unit_div as number;
						const unit = display_value ? display_value[unit_div] : "";

						return (
							<label>
								<input type="checkbox" checked={isChecked} onChange={handleChange} />
								<span className="ml-2">{`${value / unit_div} ${unit} (${option.amount})`}</span>
							</label>
						);
					} else {
						const value = option.data.value as boolean;
						return (
							<label>
								<input type="checkbox" checked={isChecked} onChange={handleChange} />
								<span className="ml-2">{`${value ? "Есть" : "Нет"} (${option.amount})`}</span>
							</label>
						);
					}
				}}
			/>
		</div>
	);
};

export default memo(CheckboxFilter);
