import ProductsCatalogView from "@/components/products/ProductsCatalogView";
import ProductsApi from "@/libs/fetch/productsApi";
import searchParamUtil from "@/utils/searchParamUtil";

interface ProductsCatalogPageProps {
	params: Promise<{ lang: string; category: string }>;
	searchParams: Promise<Record<string, string>>;
}

const ProductsCatalogPage: React.FC<ProductsCatalogPageProps> = async ({
	params,
	searchParams,
}) => {
	const [{ lang, category }, resolvedSearchParams] = await Promise.all([params, searchParams]);

	const searchParamsData = new URLSearchParams(resolvedSearchParams);

	const productsParams = new URLSearchParams({
		lang,
		category,
		page: searchParamsData.get("page") || "1",
		limit: searchParamsData.get("limit") || "5",
		sortBy: searchParamsData.get("sortBy") || "default",
	});

	const facetsParams = new URLSearchParams({ category, lang });

	const initialFilters = searchParamUtil.parse(searchParamsData);

	const [productData, facetsData] = await Promise.all([
		ProductsApi.fetchProducts(productsParams, initialFilters),
		ProductsApi.fetchFacets(facetsParams, initialFilters),
	]);

	return <ProductsCatalogView productData={productData} facetsData={facetsData} />;
};

export default ProductsCatalogPage;
