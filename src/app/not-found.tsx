import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404",
	description: "Страница не найдена",
};

export default function NotFound() {
	return (
		<div className="flex items-center justify-center absolute w-full h-full flex-col gap-4">
			<h1 className="font-bold text-2xl">Страница не найдена</h1>
			<Link
				href="/"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				На главную
			</Link>
		</div>
	);
}
