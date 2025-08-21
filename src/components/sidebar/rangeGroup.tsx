"use client";

import { ProductRangeOption } from "@/types/products.interface";
import { memo } from "react";
import RangeInput from "../ui/rangeInput";

type RangeGroupProps = {
	option: ProductRangeOption;
};

const RangeGroup: React.FC<RangeGroupProps> = ({ option }) => {
	return (
		<div className="flex justify-between">
			<RangeInput name={`${option.alias}.min`} placeholder={`от ${option.data.min}`} />

			<RangeInput name={`${option.alias}.max`} placeholder={`от ${option.data.max}`} />
		</div>
	);
};

export default memo(RangeGroup);
