import { ISelectableOption } from "@/types/products.interface";

const getCheckboxLabel = (
	type: string,
	option: ISelectableOption,
	display_value: Record<string, string> | null,
) => {
	const amount = `(${option.amount})`;
	const optionValue = option.data.value;

	switch (type) {
		case "TEXT":
			return `${display_value?.[String(optionValue)]} ${amount}`;
		case "STRING":
			return `${optionValue} ${amount}`;
		case "NUMBER":
			const value = optionValue as number;
			const unit_div = option.data?.unit_div as number;
			const unit = display_value && unit_div ? display_value[unit_div] : "";
			return `${value / unit_div} ${unit} ${amount}`;
		case "BOOLEAN":
			return `${optionValue ? "Есть" : "Нет"} ${amount}`;
		default:
			return String(optionValue);
	}
};

export default getCheckboxLabel;
