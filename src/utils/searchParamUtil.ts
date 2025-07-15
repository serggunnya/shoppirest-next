import { FiltersFormState, IFiltersBody, IRangeValue } from "@/types/products.interface";

const searchParamUtil = {
	parse: (params: URLSearchParams): IFiltersBody => {
		const _parseStringValue = (value: string): string | number | boolean => {
			if (value.toLowerCase() === "true") return true;
			if (value.toLowerCase() === "false") return false;
			if (value.trim() !== "" && isFinite(Number(value))) return Number(value);
			return value;
		};

		const filters: IFiltersBody = {};
		const keys = Array.from(params.keys()).map((k) => k.replace(/_min$|_max$/, ""));

		for (const key of keys) {
			if (key === "page" || key === "limit" || key === "sortBy" || key === "lang") continue;

			const minVal = params.get(`${key}_min`);
			const maxVal = params.get(`${key}_max`);
			const valList = params.get(key);

			if (minVal || maxVal) {
				const rangeValue: IRangeValue = {};
				if (minVal) {
					const parsed = _parseStringValue(minVal);
					if (typeof parsed === "number") {
						rangeValue.min = parsed;
					}
				}
				if (maxVal) {
					const parsed = _parseStringValue(maxVal);
					if (typeof parsed === "number") {
						rangeValue.max = parsed;
					}
				}

				if (rangeValue.min !== undefined || rangeValue.max !== undefined) {
					filters[key] = rangeValue;
				}
			} else if (valList) {
				const valArr = valList.split("|").map(_parseStringValue);
				if (valArr.length > 0) {
					filters[key] = { val: valArr };
				}
			}
		}

		return filters;
	},
	stringify: (filters: IFiltersBody): string => {
		const searchParams = new URLSearchParams();
		for (const [key, value] of Object.entries(filters)) {
			if ("val" in value && Array.isArray(value.val)) {
				searchParams.append(key, value.val.join("|"));
				continue;
			}

			if ("min" in value && value.min !== undefined) {
				searchParams.append(`${key}_min`, value.min.toString());
			}
			if ("max" in value && value.max !== undefined) {
				searchParams.append(`${key}_max`, value.max.toString());
			}
		}

		return searchParams.toString();
	},
	trim: (filters: FiltersFormState): IFiltersBody => {
		const trimmed: IFiltersBody = {};

		for (const [key, value] of Object.entries(filters)) {
			if ("val" in value && Array.isArray(value.val) && value.val.length > 0) {
				trimmed[key] = { ...value };
				continue;
			}

			if (
				("min" in value && value.min !== undefined) ||
				("max" in value && value.max !== undefined)
			) {
				const copyRangeValue: IRangeValue = {};
				if (value.min !== undefined) {
					copyRangeValue.min = value.min;
				}
				if (value.max !== undefined) {
					copyRangeValue.max = value.max;
				}
				trimmed[key] = copyRangeValue;
			}
		}

		return trimmed;
	},
};

export default searchParamUtil;
