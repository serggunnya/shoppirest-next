type FetchOptions = Omit<RequestInit, "body"> & { body?: unknown };

async function fetchBaseApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1${endpoint}`;

	// Заголовки по умолчанию
	const defaultHeaders: Record<string, string> = {
		Accept: "application/json",
	};

	// Если есть тело запроса, добавляем Content-Type
	if (options.body) {
		defaultHeaders["Content-Type"] = "application/json";
	}

	const config: RequestInit = {
		method: options.method || "GET",
		headers: {
			...defaultHeaders,
			...options.headers,
		},
		next: options.next,
		cache: options.cache,
	};

	// Сериализуем тело, если оно есть
	if (options.body) {
		config.body = JSON.stringify(options.body);
	}

	try {
		const response = await fetch(url, config);

		// Улучшенная обработка ошибок
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ message: response.statusText }));
			throw new Error(
				`API Error: ${response.status} ${response.statusText}. Message: ${errorData.message || "No error message"}`,
			);
		}

		return response.json() as Promise<T>;
	} catch (error) {
		console.error(`Fetch error for endpoint ${endpoint}:`, error);
		throw error;
	}
}

export default fetchBaseApi;
