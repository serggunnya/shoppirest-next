import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Главная",
	description: "Главная страница",
};

export default function Home() {
	return (
		<div className="flex justify-center pt-25">
			<div className="container">
				<h1 className="text-4xl font-bold">Главная страница</h1>
			</div>
		</div>
	);
}
