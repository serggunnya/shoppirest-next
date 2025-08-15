export interface Category {
	id: number;
	name: string;
	description: string;
	slug: string;
	image: string;
	parent_id: number;
	children?: Category[];
}

export interface ProductsRequestParams {
	category: string;
	page: number;
	limit: number;
	lang: string;
	sortBy: string;
}

export interface FacetsRequestParams {
	category: string;
	lang: string;
}

export interface SelectValueRequest {
	val: (string | number | boolean)[];
}

export interface RangeValueRequest {
	min?: number;
	max?: number;
}

export type FiltersRequestData = Record<string, SelectValueRequest | RangeValueRequest>;

export type FiltersFormState = FiltersRequestData;

export interface ProductsRequest {
	params: ProductsRequestParams;
	filters: FiltersRequestData;
}

export interface FacetsRequest {
	params: FacetsRequestParams;
	filters: FiltersRequestData;
}

export interface Product {
	id: number;
	category_id: number;
	slug: string;
	sku: string;
	name: string;
	description: string;
	price: string;
	discount: number;
	old_price: number;
	stock: number;
	avg_rating: string;
	reviews_count: number;
	images: {
		id: number;
		url: string;
		order: number;
	};
}

export interface ProductsResponse {
	products: Product[];
	meta: {
		total: number;
		limit: number;
		currentPage: number;
		lastPage: number;
	};
}

export interface ProductStringOption {
	alias: string;
	amount: number;
	data: {
		value: string;
	};
}

export interface ProductNumberOption {
	alias: string;
	amount: number;
	data: {
		value: number;
		unit_div: number;
	};
}

export interface ProductBooleanOption {
	alias: string;
	amount: number;
	data: {
		value: boolean;
	};
}

export interface ProductRangeOption {
	alias: string;
	data: {
		min: number;
		max: number;
	};
}

export interface ProductOptionsMap {
	TEXT: ProductStringOption;
	STRING: ProductStringOption;
	NUMBER: ProductNumberOption;
	BOOLEAN: ProductBooleanOption;
	NUMERIC: ProductRangeOption;
}

export type ProductSelectOptionsMap = Omit<ProductOptionsMap, "NUMERIC">;

export type AttributeType = keyof ProductOptionsMap;

export interface BaseFacet<T extends AttributeType> {
	id: number;
	alias: string;
	type: T;
	name: string;
	description: string;
	display_value: Record<string, string> | null;
	order: number;
	options: Array<ProductOptionsMap[T]>;
}

export type TypedFacet = {
	[K in AttributeType]: BaseFacet<K>;
}[AttributeType];

export interface DetailValueMap {
	TEXT: string;
	STRING: string;
	NUMBER: number;
	NUMERIC: number;
	BOOLEAN: boolean;
}

export type DetailType = keyof DetailValueMap;

interface BaseDetail<T extends DetailType> {
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
	[K in DetailType]: BaseDetail<K>;
}[DetailType];

export interface ProductDetail extends Product {
	details: TypedDetail[];
}
