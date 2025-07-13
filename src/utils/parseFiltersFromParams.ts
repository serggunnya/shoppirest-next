import { IFiltersBody, IRangeValue, ISelectableValue } from "@/types/products.interface";

const parseFiltersFromParams = (params: URLSearchParams): IFiltersBody => {
	const filters: IFiltersBody = {};
	const keys = new Set(Array.from(params.keys()).map((k) => k.replace(/_min$|_max$/, "")));

	for (const key of keys) {
		if (["page", "limit", "sortBy", "lang"].includes(key)) continue;

		filters[key] = {} as IRangeValue | ISelectableValue;

		const minVal = params.get(`${key}_min`);
		const maxVal = params.get(`${key}_max`);
		const valArr = params.get(key)?.split("|");

		if (minVal) {
			const parsed = parseStringValue(minVal);
			if (typeof parsed === "number") {
				(filters[key] as IRangeValue).min = parsed;
			}
		}

		if (maxVal) {
			const parsed = parseStringValue(maxVal);
			if (typeof parsed === "number") {
				(filters[key] as IRangeValue).max = parsed;
			}
		}

		if (valArr && valArr.length > 0) {
			// getAll() автоматически обрабатывает и одиночные значения, и массивы
			(filters[key] as ISelectableValue).val = valArr.map(parseStringValue);
		}
	}

	return filters;
};

export function parseStringValue(value: string): string | number | boolean {
	if (value.toLowerCase() === "true") return true;
	if (value.toLowerCase() === "false") return false;
	if (value.trim() !== "" && isFinite(Number(value))) return Number(value);
	return value;
}

export default parseFiltersFromParams;
