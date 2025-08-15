import { reduxBaseApi } from "@/libs/redux/reduxBaseApi";
import {
	Category,
	FacetsRequest,
	ProductDetail,
	ProductsRequest,
	ProductsResponse,
	TypedFacet,
} from "@/types/products.interface";
import searchParamUtil from "@/utils/searchParamUtil";

export const ReduxProductsService = reduxBaseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], string>({
			query: (lang) => `/api/v1/categories?lang=${lang}`,
		}),
		searchProducts: builder.query<ProductsResponse, ProductsRequest>({
			query: ({ params, filters }: ProductsRequest) => {
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
		getFacets: builder.query<TypedFacet[], FacetsRequest>({
			query: ({ params, filters }: FacetsRequest) => {
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
		getProductDetails: builder.query<ProductDetail, { slug: string; lang: string }>({
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
