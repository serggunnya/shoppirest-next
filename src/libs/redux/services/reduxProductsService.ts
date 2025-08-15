import { reduxBaseApi } from "@/libs/redux/reduxBaseApi";
import {
	ICategory,
	IFacetsRequest,
	IProductDetails,
	ISearchRequest,
	ISearchResponse,
	TypedFacet,
} from "@/types/products.interface";
import searchParamUtil from "@/utils/searchParamUtil";

export const ReduxProductsService = reduxBaseApi.injectEndpoints({
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
		getFacets: builder.query<TypedFacet[], IFacetsRequest>({
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
		getProductDetails: builder.query<IProductDetails, { slug: string; lang: string }>({
			query: ({ slug, lang }) => `/api/v1/products/${slug}?lang=${lang}`,
		}),
	}),
});

export const {
	useGetFacetsQuery,
	useGetCategoriesQuery,
	useSearchProductsQuery,
	useGetProductDetailsQuery,
} = ReduxProductsService;
