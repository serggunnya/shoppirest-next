export interface ICategory {
	id: number;
	name: string;
	description: string;
	slug: string;
	image: string;
	parent_id: number;
}

export interface ISelectableValue {
	val: Array<string | number | boolean>;
}

export interface IRangeValue {
	min: number;
	max: number;
}

export interface IFiltersBody {
	[key: string]: ISelectableValue | IRangeValue;
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

export interface IProductDetails extends IProduct {
	details: Array<{
		alias: string;
		type: string;
		name: string;
		description: string;
		value: string | number | boolean;
		display_value: Record<string, string> | null;
		unit_div?: number;
		order: number;
	}>;
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

export interface ISelectableOption {
	alias: string;
	data: {
		value: string | number | boolean;
		unit_div?: number;
	};
	amount: number;
}

export interface IRangeOption {
	alias: string;
	data: {
		min: number;
		max: number;
	};
}

export interface IFacet {
	id: number;
	alias: string;
	type: string;
	name: string;
	description: string;
	display_value: Record<string, string> | null;
	order: number;
	options: Array<ISelectableOption | IRangeOption>;
}
