const generatePagination = (currentPage: number, totalPages: number) => {
	const pages: number[] = [];
	const maxVisible = 5; // количество видимых страниц
	const ellipsis = 0; // промежуток

	pages.push(1); // Всегда добавляем первую страницу

	// Добавляем промежуток
	if (currentPage > maxVisible + 1) {
		pages.push(ellipsis);
	}

	// Добавляем видимые страницы вокруг текущей
	const start = Math.max(2, currentPage - maxVisible);
	const end = Math.min(totalPages - 1, currentPage + maxVisible);

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	// Добавляем промежуток или страницы после текущей
	if (currentPage < totalPages - maxVisible) {
		pages.push(ellipsis);
	}

	// Всегда добавляем последнюю страницу, если она не первая
	if (totalPages > 1) {
		pages.push(totalPages);
	}

	return pages;
};

export default generatePagination;
