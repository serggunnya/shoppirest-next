import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Главная",
	description: "Главная страница",
};

export default function Home() {
	return (
		<div className="">
			<h1 className="text-4xl font-bold">Главная страница</h1>
			<Link href={"/catalog"}>Каталог</Link>
			<Link href={"/catalog/slug"}>список</Link>
			<Link href={"/products/slug"}>товар</Link>
		</div>
	);
}
