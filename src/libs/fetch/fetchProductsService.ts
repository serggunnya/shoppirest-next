import {
	Category,
	FiltersRequestData,
	ProductDetail,
	ProductsResponse,
	TypedFacet,
} from "@/types/products.interface";
import fetchBaseApi from "./fetchBaseApi";

const FetchProductsService = {
	getCategories: async (lang: string): Promise<Category[]> => {
		return fetchBaseApi(`/categories?lang=${lang}`, { next: { revalidate: 60 * 60 } });
	},
	getCategoryBySlug: async (slug: string, lang: string): Promise<Category> => {
		return fetchBaseApi(`/categories/${slug}?lang=${lang}`, { next: { revalidate: 60 * 60 } });
	},
	getProducts: async (
		params: URLSearchParams,
		filters: FiltersRequestData,
	): Promise<ProductsResponse> => {
		return fetchBaseApi(`/products/search?${params}`, {
			method: "POST",
			body: filters,
			cache: "no-cache",
		});
	},
	getFacets: async (
		params: URLSearchParams,
		filters: FiltersRequestData,
	): Promise<TypedFacet[]> => {
		return fetchBaseApi(`/products/facets?${params}`, {
			method: "POST",
			body: filters,
			cache: "no-cache",
		});
	},
	getProductDetails: async (slug: string, lang: string): Promise<ProductDetail> => {
		return fetchBaseApi(`/products/${slug}?lang=${lang}`, { next: { revalidate: 60 * 60 } });
	},
};

export default FetchProductsService;
