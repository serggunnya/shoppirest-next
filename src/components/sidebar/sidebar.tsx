import { FiltersFormState, IFiltersBody, TypedFacet } from "@/types/products.interface";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FilterForm from "./filterForm";

interface SidebarProps {
	initialFilters: IFiltersBody;
	facets: TypedFacet[] | undefined;
	isLoading: boolean;
	isFetchingProducts: boolean;
	updateFilters: (data: FiltersFormState) => void;
}

function Sidebar({
	facets,
	isLoading,
	initialFilters,
	isFetchingProducts,
	updateFilters,
}: SidebarProps) {
	const filtersForm = useForm<FiltersFormState>({ defaultValues: initialFilters });
	const { reset } = filtersForm;

	// сброс состояния формы
	useEffect(() => {
		reset(initialFilters);
	}, [initialFilters, reset]);

	return (
		<aside className="w-[320px] relative bg-white p-4 inset-shadow-[0_2px_20px_-7px_#000]">
			{isLoading ? (
				"...загрузка"
			) : (
				<FormProvider {...filtersForm}>
					<FilterForm
						facets={facets}
						isFetchingProducts={isFetchingProducts}
						updateFilters={updateFilters}
					/>
				</FormProvider>
			)}
		</aside>
	);
}

export default Sidebar;
