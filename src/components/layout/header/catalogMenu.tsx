"use client";

import Dropdown from "@/components/ui/dropdown/dropdown";
import { useGetCategoriesQuery } from "@/libs/redux/services/productsApi";
import { ICategory } from "@/types/products.interface";
import Link from "next/link";
import { useParams } from "next/navigation";

const CatalogMenu: React.FC = () => {
	const { lang } = useParams();

	const { data: categories, isLoading } = useGetCategoriesQuery(String(lang));

	return (
		<Dropdown title="Каталог">
			{isLoading ? (
				"...загрузка"
			) : (
				<ul>
					{categories?.map((category: ICategory) => (
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
