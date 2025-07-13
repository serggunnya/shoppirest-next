"use client";

import generatePagination from "@/utils/generatePagination";

export type PaginationProps = {
	pages: number;
	currentPage: number;
	isLoading: boolean;
	onPageChange: (page: number) => () => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, pages, isLoading, onPageChange }) => {
	if (isLoading) return "[ ] [ ] [ ]";

	return (
		<div className="">
			<button
				onClick={onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="text-blue-500"
			>
				{"Назад"}
			</button>
			{generatePagination(currentPage, pages).map((pageNumber, i) => {
				if (pageNumber === 0) {
					return (
						<span key={i} className="text-blue-500">
							{"..."}
						</span>
					);
				}

				return (
					<button
						key={i}
						onClick={onPageChange(pageNumber)}
						className={currentPage === pageNumber ? "text-blue-500" : ""}
					>
						{pageNumber}
					</button>
				);
			})}

			<button
				onClick={onPageChange(currentPage + 1)}
				disabled={currentPage === pages}
				className="text-blue-500"
			>
				{"Вперёд"}
			</button>
		</div>
	);
};

export default Pagination;
