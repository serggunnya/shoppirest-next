import ProductsCatalogView from "@/components/products/ProductsCatalogView";
import ProductsUtil from "@/libs/fetch/productsUtil";
import searchParamUtil from "@/utils/searchParamUtil";

interface ProductsCatalogPageProps {
	params: Promise<{ lang: string; slug: string }>;
	searchParams: Promise<Record<string, string>>;
}

const ProductsCatalogPage: React.FC<ProductsCatalogPageProps> = async ({
	params,
	searchParams,
}) => {
	const [{ lang, slug }, resolvedSearchParams] = await Promise.all([params, searchParams]);

	const searchParamsData = new URLSearchParams(resolvedSearchParams);

	const productsParams = new URLSearchParams({
		category: slug,
		page: searchParamsData.get("page") || "1",
		limit: searchParamsData.get("limit") || "5",
		sortBy: searchParamsData.get("sortBy") || "default",
		lang: lang,
	});

	const facetsParams = new URLSearchParams({
		category: slug,
		lang: lang,
	});

	const initialFilters = searchParamUtil.parse(searchParamsData);

	const [productData, facetsData] = await Promise.all([
		ProductsUtil.fetchProducts(productsParams, initialFilters),
		ProductsUtil.fetchFacets(facetsParams, initialFilters),
	]);

	return <ProductsCatalogView productData={productData} facetsData={facetsData} />;
};

export default ProductsCatalogPage;
