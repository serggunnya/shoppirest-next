"use client";

import Dropdown from "@/components/ui/dropdown/dropdown";
import { useGetCategoriesQuery } from "@/libs/redux/services/reduxProductsService";
import { Category } from "@/types/products.interface";
import Link from "next/link";

interface CatalogMenuProps {
	lang: string;
}

const CatalogMenu: React.FC<CatalogMenuProps> = ({ lang }) => {
	const { data: categories, isLoading } = useGetCategoriesQuery(String(lang));

	return (
		<Dropdown title="Каталог">
			{isLoading ? (
				"...загрузка"
			) : (
				<ul>
					{categories?.map((category: Category) => (
						<li key={category.id}>
							<Link href={`/catalog/${category.slug}?page=1`}>{category.name}</Link>
						</li>
					))}
				</ul>
			)}
		</Dropdown>
	);
};

export default CatalogMenu;
