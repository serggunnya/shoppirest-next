import { useGetFacetsQuery } from "@/libs/redux/services/productsApi";
import { FiltersFormState } from "@/libs/zod/filtersSchema";
import { IFiltersBody } from "@/types/products.interface";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FilterForm } from "./filterForm";

interface SidebarProps {
	initialFilters: FiltersFormState;
	category: string;
	onSubmit: (data: FiltersFormState) => void;
}

export function Sidebar({ initialFilters, category, onSubmit }: SidebarProps) {
	const form = useForm<FiltersFormState>({
		defaultValues: initialFilters,
	});

	// Синхронизация с URL
	useEffect(() => {
		form.reset(initialFilters);
	}, [initialFilters, form.reset]);

	// Аргументы запроса фасетов
	const facetsRequestArgs = useMemo(
		() => ({
			params: { category, lang: "ru" }, // Замените на реальную категорию
			filters: initialFilters as IFiltersBody,
		}),
		[initialFilters, category],
	);

	const { data: facets, isLoading } = useGetFacetsQuery(facetsRequestArgs);

	return (
		<div className="w-[320px] bg-white px-4 pb-10 py-2 overflow-y-scroll">
			{isLoading ? (
				"...загрузка"
			) : (
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FilterForm facets={facets} />
						<button type="submit">Фильтровать</button>
					</form>
				</FormProvider>
			)}
		</div>
	);
}
