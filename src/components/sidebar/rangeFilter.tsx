"use client";

import { FiltersFormState } from "@/libs/zod/filtersSchema";
import { IRangeOption } from "@/types/products.interface";
import { memo } from "react";
import { Control, Controller } from "react-hook-form";

type RangeFilterProps = {
	option: IRangeOption;
	control: Control<FiltersFormState>;
};

const RangeFilter: React.FC<RangeFilterProps> = ({ option, control }) => {
	return (
		<div className="pl-4">
			<Controller
				name={`${option.alias}.min`}
				control={control}
				render={({ field, fieldState }) => (
					<div>
						<label>От:</label>
						<input
							type="number"
							onChange={(e) => {
								field.onChange(e.target.value === "" ? undefined : Number(e.target.value));
							}}
							value={field.value ?? ""}
							placeholder={String(option.data.min)}
						/>
						{fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
					</div>
				)}
			/>

			<Controller
				name={`${option.alias}.max`}
				control={control}
				render={({ field, fieldState }) => (
					<div>
						<label>До:</label>
						<input
							type="number"
							onChange={(e) => {
								field.onChange(e.target.value === "" ? undefined : Number(e.target.value));
							}}
							value={field.value ?? ""}
							placeholder={String(option.data.max)}
						/>
						{fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
					</div>
				)}
			/>
		</div>
	);
};

export default memo(RangeFilter);
