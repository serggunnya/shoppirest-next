import { useGetFacetsQuery } from "@/libs/redux/services/productsApi";
import { FiltersFormState, IFiltersBody } from "@/types/products.interface";
import { useDebouncedState } from "@/utils/useDebouncedState";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FilterForm } from "./filterForm";

interface SidebarProps {
	initialFilters: FiltersFormState;
	category: string;
	onSubmit: (data: FiltersFormState) => void;
}

function Sidebar({ initialFilters, category, onSubmit }: SidebarProps) {
	const [filters, setFilters] = useDebouncedState<IFiltersBody>(
		initialFilters as IFiltersBody,
		500,
	);

	const form = useForm<FiltersFormState>({
		defaultValues: initialFilters,
	});

	// Синхронизация с URL
	useEffect(() => {
		form.reset(initialFilters);
	}, [initialFilters, form]);

	// Аргументы запроса фасетов
	const facetsRequestArgs = useMemo(
		() => ({
			params: { category, lang: "ru" },
			filters: filters,
		}),
		[filters, category],
	);

	const { data: facets, isLoading } = useGetFacetsQuery(facetsRequestArgs);

	return (
		<div className="w-[320px] bg-white px-4 pb-10 py-2 overflow-y-scroll">
			{isLoading ? (
				"...загрузка"
			) : (
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FilterForm facets={facets} setFilters={setFilters} />
						<button type="submit">Фильтровать</button>
					</form>
				</FormProvider>
			)}
		</div>
	);
}

export default Sidebar;
