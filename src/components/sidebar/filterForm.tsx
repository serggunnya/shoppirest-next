import { IFacet, IFiltersBody, IRangeOption, ISelectableOption } from "@/types/products.interface";
import CheckboxFilter from "./checkboxFilter";
import RangeFilter from "./rangeFilter";

interface FilterFormProps {
	facets: IFacet[] | undefined;
	setFilters: (data: IFiltersBody) => void;
}

// Внутренний компонент, который имеет доступ к данным фасетов
export function FilterForm({ facets, setFilters }: FilterFormProps) {
	return (
		<ul>
			{facets?.map((facet) => {
				return (
					<li key={facet?.id} className="mb-3">
						<h2>{facet?.name}</h2>
						<div>
							{facet.options.map((option, i) => {
								if (facet.type === "NUMERIC") {
									return <RangeFilter key={i} option={option as IRangeOption} />;
								}
								return (
									<CheckboxFilter
										key={i}
										type={facet.type}
										option={option as ISelectableOption}
										display_value={facet.display_value}
										setFilters={setFilters}
									/>
								);
							})}
						</div>
					</li>
				);
			})}
		</ul>
	);
}
