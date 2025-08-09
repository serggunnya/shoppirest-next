import { ICategory } from "@/types/products.interface";
import Link from "next/link";

export type SubcatalogViewProps = {
	category: ICategory;
};

const SubcatalogView: React.FC<SubcatalogViewProps> = ({ category }) => {
	return (
		<div className="w-full">
			<h3>{category?.name}</h3>
			{category?.children?.map((it) => (
				<Link href={`${category.slug}/${it.slug}`} key={it.slug}>
					<div className="w-[200px] h-[200px] bg-slate-200 rounded-md mb-4">
						{/* <img src={it.image} alt={it.name} /> */}
					</div>
					{it.name}
				</Link>
			))}
		</div>
	);
};

export default SubcatalogView;
