"use client";

import { Product } from "@/types/products.interface";
import ProductCard from "./productCard";

export type ProductsListProps = {
	products: Product[] | undefined;
	isLoading: boolean;
};

const ProductsList: React.FC<ProductsListProps> = ({ products, isLoading }) => {
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="grow-1 w-full">
			{products?.map((product) => <ProductCard key={product.id} product={product} />)}
		</div>
	);
};

export default ProductsList;
