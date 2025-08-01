import {
	ICategory,
	IFacet,
	IFacetsRequest,
	ISearchRequest,
	ISearchResponse,
} from "@/types/products.interface";
import searchParamUtil from "@/utils/searchParamUtil";
import { baseApi } from "./baseApi";

export const ProductsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<ICategory[], string>({
			query: (lang) => `/api/v1/categories?lang=${lang}`,
		}),
		searchProducts: builder.query<ISearchResponse, ISearchRequest>({
			query: ({ params, filters }: ISearchRequest) => {
				const urlParams = new URLSearchParams({
					category: params.category,
					page: String(params.page || 1),
					limit: String(params.limit || 5),
					sortBy: params.sortBy || "default",
					lang: params.lang || "ru",
				});

				return {
					url: `api/v1/products/search?${urlParams}`,
					method: "POST",
					body: filters,
				};
			},
		}),
		getFacets: builder.query<IFacet[], IFacetsRequest>({
			query: ({ params, filters }: IFacetsRequest) => {
				const urlParams = new URLSearchParams({
					category: params.category,
					lang: params.lang || "ru",
				});

				return {
					url: `api/v1/products/facets?${urlParams}`,
					method: "POST",
					body: searchParamUtil.trim(filters),
				};
			},
		}),
	}),
});

export const { useGetCategoriesQuery, useSearchProductsQuery, useGetFacetsQuery } = ProductsApi;
