import {
	ICategory,
	IFacet,
	IFiltersBody,
	IProductDetails,
	ISearchResponse,
} from "@/types/products.interface";
import fetchBaseApi from "./fetchBaseApi";

const FetchProductsService = {
	getCategories: async (lang: string): Promise<ICategory[]> => {
		return fetchBaseApi(`/categories?lang=${lang}`, { next: { revalidate: 60 * 60 } });
	},
	getCategoryBySlug: async (slug: string, lang: string): Promise<ICategory> => {
		return fetchBaseApi(`/categories/${slug}?lang=${lang}`, { next: { revalidate: 60 * 60 } });
	},
	getProducts: async (params: URLSearchParams, filters: IFiltersBody): Promise<ISearchResponse> => {
		return fetchBaseApi(`/products/search?${params}`, {
			method: "POST",
			body: filters,
			cache: "no-cache",
		});
	},
	getFacets: async (params: URLSearchParams, filters: IFiltersBody): Promise<IFacet[]> => {
		return fetchBaseApi(`/products/facets?${params}`, {
			method: "POST",
			body: filters,
			cache: "no-cache",
		});
	},
	getProductDetails: async (slug: string, lang: string): Promise<IProductDetails> => {
		return fetchBaseApi(`/products/${slug}?lang=${lang}`, { next: { revalidate: 60 * 60 } });
	},
};

export default FetchProductsService;
