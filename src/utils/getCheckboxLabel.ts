import { ProductSelectOptionsMap } from "@/types/products.interface";

export type CheckboxLabelArgs = {
	[T in keyof ProductSelectOptionsMap]: {
		type: T;
		option: ProductSelectOptionsMap[T];
		display_value: Record<string, string> | null;
	};
}[keyof ProductSelectOptionsMap];

const getCheckboxLabel = (args: CheckboxLabelArgs) => {
	const { type, option, display_value } = args;
	const amount = `(${option.amount})`;

	switch (type) {
		case "TEXT": {
			return `${display_value?.[option.data.value]} ${amount}`;
		}
		case "STRING": {
			return `${option.data.value} ${amount}`;
		}
		case "NUMBER": {
			const unit_div = option.data.unit_div;
			const unit = display_value && unit_div ? display_value[unit_div] : "";
			return `${option.data.value / unit_div} ${unit} ${amount}`;
		}
		case "BOOLEAN": {
			return `${option.data.value ? "Есть" : "Нет"} ${amount}`;
		}
		default:
			return "";
	}
};

export default getCheckboxLabel;
