import { useGetFacetsQuery } from "@/libs/redux/services/productsApi";
import { FiltersFormState, IFiltersBody } from "@/types/products.interface";
import { useDebouncedState } from "@/utils/useDebouncedState";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FilterForm from "./filterForm";

interface SidebarProps {
	initialFilters: IFiltersBody;
	category: string;
	isFetchingProducts: boolean;
}

function Sidebar({ category, initialFilters, isFetchingProducts }: SidebarProps) {
	const [updatedFilters, setUpdatedFilters] = useDebouncedState<IFiltersBody>(initialFilters, 200);

	const filtersForm = useForm<FiltersFormState>({ defaultValues: initialFilters });
	const { reset } = filtersForm;

	// сброс состояния формы
	useEffect(() => {
		reset(initialFilters);
	}, [initialFilters, reset]);

	// Аргументы запроса фасетов
	const facetsRequestArgs = useMemo(
		() => ({
			params: { category, lang: "ru" },
			filters: updatedFilters,
		}),
		[updatedFilters, category],
	);

	const { data: facets, isLoading: isFacetsLoading } = useGetFacetsQuery(facetsRequestArgs);

	return (
		<aside className="w-[320px] relative bg-white p-4 inset-shadow-[0_2px_20px_-7px_#000]">
			{isFacetsLoading ? (
				"...загрузка"
			) : (
				<FormProvider {...filtersForm}>
					<FilterForm
						facets={facets}
						isFetchingProducts={isFetchingProducts}
						updateFilters={setUpdatedFilters}
					/>
				</FormProvider>
			)}
		</aside>
	);
}

export default Sidebar;
