import { IFacet, IFiltersBody, IProductDetails, ISearchResponse } from "@/types/products.interface";

const ProductsApi = {
	fetchProducts: async (
		params: URLSearchParams,
		filters: IFiltersBody,
	): Promise<ISearchResponse> => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/search?${params}`;

		try {
			const response = await fetch(url, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(filters),
				cache: "no-cache",
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch data. Status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			throw new Error("Could not fetch products and facets. Please check the API connection.");
		}
	},
	fetchFacets: async (params: URLSearchParams, filters: IFiltersBody): Promise<IFacet[]> => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/facets?${params}`;

		try {
			const response = await fetch(url, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(filters),
				cache: "no-cache",
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch data. Status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			throw new Error("Could not fetch products and facets. Please check the API connection.");
		}
	},
	fetchProductDetails: async (slug: string, lang: string): Promise<IProductDetails> => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${slug}?lang=${lang}`;

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				next: { revalidate: 60 },
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch data. Status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			throw new Error("Could not fetch products and facets. Please check the API connection.");
		}
	},
};

export default ProductsApi;
