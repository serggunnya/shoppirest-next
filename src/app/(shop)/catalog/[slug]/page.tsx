"use client";
import Pagination from "@/components/products/pagination";
import ProductsList from "@/components/products/productsList";
import Sidebar from "@/components/sidebar/sidebar";

import { useSearchProductsQuery } from "@/libs/redux/services/productsApi";

import { FiltersFormState, IFiltersBody, ISearchRequest } from "@/types/products.interface";
import searchParamUtil from "@/utils/searchParamUtil";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function ProductsByCategory() {
	const router = useRouter();
	const pathname = usePathname();

	const category = String(useParams().slug);
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page") || 1);

	// "Примененные" фильтры взятые из URL - источник правды.
	const appliedFilters: FiltersFormState = useMemo(
		() => searchParamUtil.parse(searchParams),
		[searchParams],
	);

	// объект запроса продуктов
	const productsRequestArgs: ISearchRequest = useMemo(
		() => ({
			params: { category, page, limit: 5, sortBy: "default", lang: "ru" },
			filters: appliedFilters as IFiltersBody,
		}),
		[category, page, appliedFilters],
	);

	// хук запроса продуктов
	const {
		data: productsData,
		isLoading: isLoadingProducts,
		isFetching,
	} = useSearchProductsQuery(productsRequestArgs);

	const totalPages = Math.ceil((productsData?.meta.total || 0) / (productsData?.meta.limit || 1));

	//обработчик изменения страницы
	const handlePageChange = useCallback(
		(page: number) => () => {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.set("page", String(page));
			router.push(`${pathname}?${newParams.toString()}`);
		},
		[pathname, router, searchParams],
	);

	return (
		<div className="w-full flex">
			<Sidebar
				category={category}
				initialFilters={appliedFilters}
				isFetchingProducts={isFetching}
			/>

			<div className="flex flex-col w-full items-center p-8">
				<Pagination
					currentPage={productsRequestArgs.params.page}
					pages={totalPages}
					isLoading={isLoadingProducts}
					onPageChange={handlePageChange}
				/>

				<ProductsList products={productsData?.products} isLoading={isLoadingProducts} />
			</div>
		</div>
	);
}
