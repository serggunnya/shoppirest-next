"use client";

import { useParams } from "next/navigation";

export default function ProductDetails() {
	const slug = useParams().slug;
	return <div>Страница товара {slug}</div>;
}
