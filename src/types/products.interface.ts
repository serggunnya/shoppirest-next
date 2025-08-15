export interface ICategory {
	id: number;
	name: string;
	description: string;
	slug: string;
	image: string;
	parent_id: number;
	children?: ICategory[];
}

export interface ISearchParams {
	category: string;
	page: number;
	limit: number;
	lang: string;
	sortBy: string;
}

export interface IFacetsParams {
	category: string;
	lang: string;
}

export interface ISelectableValue {
	val: (string | number | boolean)[];
}

export interface IRangeValue {
	min?: number;
	max?: number;
}

export type IFiltersBody = Record<string, ISelectableValue | IRangeValue>;

export type FiltersFormState = Record<string, ISelectableValue | IRangeValue>;

export interface ISearchRequest {
	params: ISearchParams;
	filters: IFiltersBody;
}

export interface IFacetsRequest {
	params: IFacetsParams;
	filters: IFiltersBody;
}

export interface IProduct {
	id: number;
	category_id: number;
	slug: string;
	sku: string;
	name: string;
	description: string;
	price: string;
	discount: number | null;
	old_price: number | null;
	stock: number;
	images: {
		id: number;
		url: string;
		order: number;
	};
	avg_rating: string;
	reviews_count: number;
}

export interface ISearchResponse {
	products: IProduct[];
	meta: {
		total: number;
		limit: number;
		currentPage: number;
		lastPage: number;
	};
}

export interface IStringOption {
	alias: string;
	amount: number;
	data: {
		value: string;
	};
}

export interface INumberOption {
	alias: string;
	amount: number;
	data: {
		value: number;
		unit_div: number;
	};
}

export interface IBooleanOption {
	alias: string;
	amount: number;
	data: {
		value: boolean;
	};
}

export interface IRangeOption {
	alias: string;
	data: {
		min: number;
		max: number;
	};
}

export interface SelectableOptionType {
	TEXT: IStringOption;
	STRING: IStringOption;
	NUMBER: INumberOption;
	BOOLEAN: IBooleanOption;
}

export interface OptionTypeMap extends SelectableOptionType {
	NUMERIC: IRangeOption;
}

export type AttributeType = keyof OptionTypeMap;

export interface IFacet<T extends AttributeType> {
	id: number;
	alias: string;
	type: T;
	name: string;
	description: string;
	display_value: Record<string, string> | null;
	order: number;
	options: Array<OptionTypeMap[T]>;
}

export type TypedFacet = {
	[K in AttributeType]: IFacet<K>;
}[AttributeType];

export interface DetailValueMap {
	TEXT: string;
	STRING: string;
	NUMBER: number;
	NUMERIC: number;
	BOOLEAN: boolean;
}

export type DetailType = keyof DetailValueMap;

interface IDetail<T extends DetailType> {
	alias: string;
	type: T;
	name: string;
	description: string;
	value: DetailValueMap[T];
	display_value: Record<string, string> | null;
	unit_div: number | null;
	order: number;
}

export type TypedDetail = {
	[K in DetailType]: IDetail<K>;
}[DetailType];

export interface IProductDetails extends IProduct {
	details: TypedDetail[];
}

// export interface ISelectableOption {
// 	alias: string;
// 	data: {
// 		value: string | number | boolean;
// 		unit_div?: number;
// 	};
// 	amount: number;
// }

// export interface IFacet {
// 	id: number;
// 	alias: string;
// 	type: string;
// 	name: string;
// 	description: string;
// 	display_value: Record<string, string> | null;
// 	order: number;
// 	options: Array<ISelectableOption | IRangeOption>;
// }
