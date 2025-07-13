import { IProduct } from "@/types/products.interface";
import Link from "next/link";

export type ProductCardProps = {
	product: IProduct | undefined;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Link href={`/products/${product?.slug}`}>
			<div className="w-full bg-white rounded-md p-4 mb-8 shadow-[0_2px_10px_-5px_#000]">
				<div className="text-sm font-medium text-slate-800">{product?.name}</div>
				<div className="text-sm font-medium text-slate-500">{product?.price}</div>
				<div className="w-[200px] h-[200px] bg-slate-200 rounded-md mb-4"></div>
			</div>
		</Link>
	);
};

export default ProductCard;
