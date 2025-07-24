"use client";

import { FiltersFormState, IFiltersBody, ISelectableOption } from "@/types/products.interface";
import getCheckboxLabel from "@/utils/getCheckboxLabel";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "../ui/checkbox";

type CheckboxGroupProps = {
	option: ISelectableOption;
	type: string;
	display_value: Record<string, string> | null;
	updateFilters: (data: IFiltersBody) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
	type,
	option,
	display_value,
	updateFilters,
}) => {
	const { control, getValues } = useFormContext<FiltersFormState>();

	return (
		<div className="pl-4">
			<Controller
				name={`${option.alias}.val`}
				control={control}
				render={({ field }) => {
					const values = field.value || [];
					const selectValue = option.data.value;
					const isChecked = values.length > 0 && values?.includes(selectValue);

					const handleChange = () => {
						field.onChange(
							isChecked ? values.filter((v) => v !== selectValue) : [...values, selectValue],
						);
						updateFilters(structuredClone(getValues()));
					};

					return (
						<Checkbox
							isChecked={isChecked}
							isDisabled={option.amount === 0}
							onChange={handleChange}
						>
							{getCheckboxLabel(type, option, display_value)}
						</Checkbox>
					);
				}}
			/>
		</div>
	);
};

export default memo(CheckboxGroup);
