import Dropdown from "@/components/ui/dropdown/dropdown";
import { ICategory } from "@/types/products.interface";
import Link from "next/link";

export default async function CatalogMenu() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories?lang=ru`);
	const categories: ICategory[] = await response.json();

	return (
		<Dropdown title="Каталог">
			<ul>
				{categories.map((category: ICategory) => (
					<li key={category.id}>
						<Link href={`/catalog/${category.slug}?page=1`}>{category.name}</Link>
					</li>
				))}
			</ul>
		</Dropdown>
	);
}
