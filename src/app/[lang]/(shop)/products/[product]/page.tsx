import FetchProductsService from "@/libs/fetch/fetchProductsService";
import getDetailValue from "@/utils/getDetailValue";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductDetailsPageProps {
	params: Promise<{ lang: string; product: string }>;
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
	const { lang, product } = await params;
	const productDetails = await FetchProductsService.getProductDetails(product, lang);

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
	const productDetails = await FetchProductsService.getProductDetails(product, lang);

	if (!productDetails) {
		notFound();
	}

	return (
		<div>
			Страница товара {productDetails?.name}
			{productDetails.details.map((detail, i) => {
				return (
					<div key={i} className="mb-2">
						{detail.name}: {getDetailValue(detail)}
					</div>
				);
			})}
		</div>
	);
};

export default ProductDetails;
