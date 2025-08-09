import ProductsCatalogView from "@/components/products/ProductsCatalogView";
import SubcatalogView from "@/components/products/SubcatalogView";
import FetchProductsService from "@/libs/fetch/fetchProductsService";
import { ICategory } from "@/types/products.interface";
import searchParamUtil from "@/utils/searchParamUtil";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryCatalogPageProps {
	params: Promise<{ lang: string; categories: string[] }>;
	searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ params }: CategoryCatalogPageProps): Promise<Metadata> {
	const { lang, categories } = await params;
	const category = categories[categories.length - 1];

	const categoryDetails: ICategory = await FetchProductsService.getCategoryBySlug(category, lang);

	if (!categoryDetails) {
		return {
			title: "Категория не найдена",
		};
	}

	return {
		title: `${categoryDetails?.name} - купить по лучшей цене`,
		description: categoryDetails?.description,
	};
}

const ProductsCatalogPage: React.FC<CategoryCatalogPageProps> = async ({
	params,
	searchParams,
}) => {
	const [{ lang, categories }, resolvedSearchParams] = await Promise.all([params, searchParams]);
	const category = categories[categories.length - 1];

	const categoryDetails: ICategory = await FetchProductsService.getCategoryBySlug(category, lang);

	if (!categoryDetails) {
		notFound();
	}

	// если категория содержит подкатегории, отображаем список подкатегорий
	if (categoryDetails?.children?.length) {
		return <SubcatalogView category={categoryDetails} />;
	}

	// иначе получаем список товаров и фасетов

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
		FetchProductsService.getProducts(productsParams, initialFilters),
		FetchProductsService.getFacets(facetsParams, initialFilters),
	]);

	return (
		<ProductsCatalogView category={category} productData={productData} facetsData={facetsData} />
	);
};

export default ProductsCatalogPage;
