import {
	FiltersFormState,
	IFacet,
	IRangeOption,
	ISelectableOption,
} from "@/types/products.interface";
import searchParamUtil from "@/utils/searchParamUtil";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import CheckboxGroup from "./checkboxGroup";
import RangeGroup from "./rangeGroup";

interface FilterFormProps {
	facets: IFacet[] | undefined;
	isFetchingProducts: boolean;
	updateFilters: (data: FiltersFormState) => void;
}

const FilterForm = ({ facets, isFetchingProducts, updateFilters }: FilterFormProps) => {
	const router = useRouter();
	const pathname = usePathname();

	// prettier-ignore
	const { handleSubmit, reset, formState: { isDirty } } = useFormContext();

	// обработчик применения фильтров
	const submitFilters = useCallback(
		async (data: FiltersFormState) => {
			const trimmed = searchParamUtil.trim(data);
			await router.push(`${pathname}?page=1&${searchParamUtil.stringify(trimmed)}`);
			reset(data);
		},
		[pathname, router, reset],
	);

	return (
		<>
			<div
				className="flex flex-col items-center sticky top-0
					pt-4 p-4 mr-5 mb-4 bg-white border-b border-b-[#ccc] z-100"
			>
				{/* <select
							className="block w-full p-2 mb-4 font-medium text-gray-900 border
							border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
							dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
							dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="sortBy"
						>
							<option defaultValue="" selected disabled={true}>
								Сортировать...
							</option>
							<option value="US">United States</option>
							<option value="CA">Canada</option>
							<option value="FR">France</option>
							<option value="DE">Germany</option>
						</select> */}
				<button
					type="submit"
					form="filters-form"
					disabled={!isDirty}
					className="bg-blue-500 text-white rounded-md px-10 py-2
							 disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer"
				>
					{isFetchingProducts ? "Применяем..." : "Применить"}
				</button>
			</div>
			<div className="sticky top-30 bottom-0 h-[calc(100vh-3rem)] overflow-y-auto scrolling-touch">
				<form id="filters-form" className="flex flex-col" onSubmit={handleSubmit(submitFilters)}>
					{facets?.map((facet) => {
						return (
							<div key={facet?.id} className="mb-3">
								<span className="block text-base font-bold mb-2">{facet?.name}</span>
								<div className="pb-4 border-b border-b-[#ccc]">
									{facet.options.map((option, i) => {
										if (facet.type === "NUMERIC") {
											return <RangeGroup key={i} option={option as IRangeOption} />;
										}
										return (
											<CheckboxGroup
												key={i}
												type={facet.type}
												option={option as ISelectableOption}
												display_value={facet.display_value}
												updateFilters={updateFilters}
											/>
										);
									})}
								</div>
							</div>
						);
					})}
				</form>
			</div>
		</>
	);
};
export default FilterForm;
