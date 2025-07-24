"use client";

import {
	FiltersFormState,
	IFiltersBody,
	ISelectableOption,
	ISelectableValue,
} from "@/types/products.interface";
import getCheckboxLabel from "@/utils/getCheckboxLabel";
import { memo, useCallback } from "react";
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
	const { control, getValues, setValue } = useFormContext<FiltersFormState>();

	const handleChange = useCallback(() => {
		const fieldObject = getValues(option.alias);

		let fieldValues: (string | number | boolean)[] = [];
		if (fieldObject && "val" in fieldObject && Array.isArray(fieldObject.val)) {
			fieldValues = fieldObject.val;
		}

		const selectValue = option.data.value;
		const isChecked = fieldValues.length > 0 && fieldValues?.includes(selectValue);

		const newValues = isChecked
			? fieldValues.filter((v) => v !== selectValue)
			: [...fieldValues, selectValue];
		const updatedField: ISelectableValue = { val: newValues };

		// Обновляем значение поля, помечая форму как "грязную"
		setValue(option.alias, updatedField, { shouldDirty: true });

		// Вызываем колбэк для обновления фасетов
		updateFilters(structuredClone(getValues()));
	}, [option.alias, getValues, setValue, option.data.value, updateFilters]);

	return (
		<div className="pl-4">
			<Controller
				name={`${option.alias}.val`}
				control={control}
				render={({ field }) => {
					const values = field.value || [];
					const selectValue = option.data.value;
					const isChecked = values.length > 0 && values?.includes(selectValue);

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
