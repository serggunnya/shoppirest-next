"use client";
import Pagination from "@/components/products/pagination";
import ProductsList from "@/components/products/productsList";
import Sidebar from "@/components/sidebar/sidebar";
import { useAppDispatch } from "@/libs/redux";

import {
	ProductsApi,
	useGetFacetsQuery,
	useSearchProductsQuery,
} from "@/libs/redux/services/productsApi";

import {
	FiltersFormState,
	IFacet,
	IFiltersBody,
	ISearchRequest,
	ISearchResponse,
} from "@/types/products.interface";
import searchParamUtil from "@/utils/searchParamUtil";
import { useDebouncedState } from "@/utils/useDebouncedState";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ProductsCatalogViewProps {
	productData: ISearchResponse;
	facetsData: IFacet[];
}

const ProductsCatalogView: React.FC<ProductsCatalogViewProps> = ({ productData, facetsData }) => {
	const lang = String(useParams().lang);
	const category = String(useParams().category);
	const searchParams = useSearchParams();

	// Примененные фильтры из URL - источник правды.
	const appliedFilters: FiltersFormState = useMemo(
		() => searchParamUtil.parse(searchParams),
		[searchParams],
	);

	const page = Number(searchParams.get("page") || 1);

	// объект запроса продуктов
	const productsRequestArgs: ISearchRequest = useMemo(
		() => ({
			params: { category, page, limit: 5, sortBy: "default", lang },
			filters: appliedFilters as IFiltersBody,
		}),
		[lang, category, page, appliedFilters],
	);

	// Debounced состояние фильтров
	const [updatedFilters, setUpdatedFilters] = useDebouncedState<IFiltersBody>(appliedFilters, 200);

	// Аргументы запроса фасетов
	const facetsRequestArgs = useMemo(
		() => ({ params: { category, lang }, filters: updatedFilters }),
		[lang, updatedFilters, category],
	);

	const dispatch = useAppDispatch();
	const [isHydrated, setIsHydrated] = useState(false);

	// ГИДРАТАЦИЯ КЭША
	useEffect(() => {
		dispatch(ProductsApi.util.upsertQueryData("searchProducts", productsRequestArgs, productData));
		dispatch(ProductsApi.util.upsertQueryData("getFacets", facetsRequestArgs, facetsData));
		setIsHydrated(true);
	}, []);

	// хук запроса продуктов
	const {
		data: rtkProducts,
		isLoading: isProductsLoading,
		isFetching,
	} = useSearchProductsQuery(productsRequestArgs, { skip: !isHydrated });

	const { data: rtkFacets, isLoading: isFacetsLoading } = useGetFacetsQuery(facetsRequestArgs, {
		skip: !isHydrated,
	});

	const currentProductsData = rtkProducts || productData;
	const currentFacets = rtkFacets || facetsData;

	const router = useRouter();
	const pathname = usePathname();
	//обработчик изменения страницы
	const handlePageChange = useCallback(
		(page: number) => () => {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.set("page", String(page));
			router.push(`${pathname}?${newParams.toString()}`);
		},
		[pathname, router, searchParams],
	);

	// количество страниц для пагинации
	const totalPages = Math.ceil(
		(currentProductsData?.meta.total || 0) / (currentProductsData?.meta.limit || 1),
	);

	return (
		<div className="w-full flex">
			<Sidebar
				facets={currentFacets}
				initialFilters={appliedFilters}
				isLoading={isFacetsLoading}
				isFetchingProducts={isFetching}
				updateFilters={setUpdatedFilters}
			/>

			<div className="flex flex-col w-full items-center p-8">
				<Pagination
					currentPage={productsRequestArgs.params.page}
					pages={totalPages}
					isLoading={isProductsLoading}
					onPageChange={handlePageChange}
				/>

				<ProductsList products={currentProductsData?.products} isLoading={isProductsLoading} />
			</div>
		</div>
	);
};

export default ProductsCatalogView;
