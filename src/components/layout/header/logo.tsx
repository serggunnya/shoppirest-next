import Link from "next/link";

export default function Logo() {
	return (
		<div className="">
			<Link
				href={"/"}
				className="text-white text-3xl mr-[10%] font-extrabold text-shadow-[4px_3px_2px_rgb(25_25_25_/_0.50)]"
			>
				Shoppirest
			</Link>
		</div>
	);
}
