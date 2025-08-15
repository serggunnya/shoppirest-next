import { TypedDetail } from "@/types/products.interface";
import { JSX } from "react";

const getDetailValue = (detail: TypedDetail): JSX.Element | null => {
	switch (detail.type) {
		case "TEXT": {
			return <span>{detail.display_value && detail.display_value[detail.value]}</span>;
		}
		case "STRING": {
			return <span>{detail.value}</span>;
		}
		case "NUMBER":
		case "NUMERIC": {
			const value = detail.unit_div && detail.value / detail.unit_div;
			const unit = detail.unit_div && detail.display_value && detail.display_value[detail.unit_div];
			return (
				<span>
					{value} {unit}
				</span>
			);
		}
		case "BOOLEAN": {
			return <span>{detail.value ? "Есть" : "Нет"}</span>;
		}
		default:
			return null;
	}
};

export default getDetailValue;
