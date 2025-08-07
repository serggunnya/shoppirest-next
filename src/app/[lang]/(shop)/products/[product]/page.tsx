import ProductsApi from "@/libs/fetch/productsApi";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductDetailsPageProps {
	params: Promise<{ lang: string; product: string }>;
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
	const { lang, product } = await params;
	const productDetails = await ProductsApi.fetchProductDetails(product, lang);

	if (!productDetails) {
		return {
			title: "Товар не найден",
		};
	}

	return {
		title: `${productDetails?.name} - купить по лучшей цене`,
		description: productDetails?.description,
	};
}

const ProductDetails: React.FC<ProductDetailsPageProps> = async ({ params }) => {
	const { lang, product } = await params;
	const productDetails = await ProductsApi.fetchProductDetails(product, lang);

	if (!productDetails) {
		notFound();
	}

	return <div>Страница товара {productDetails?.name}</div>;
};

export default ProductDetails;
