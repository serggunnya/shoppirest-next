import Pagination from "@/components/shop/pagination";
import ProductsList from "@/components/shop/productsList";
import Sidebar from "@/components/shop/sidebar";

export default function ProductsByCategory() {
	return (
		<div>
			<Sidebar />
			<ProductsList />
			<Pagination />
		</div>
	);
}
