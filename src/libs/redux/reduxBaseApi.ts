import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setUnauth } from "./slices/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	credentials: "include",
	prepareHeaders: (headers) => {
		headers.set("Accept", "application/json");
		headers.set("Content-Type", "application/json");
		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		try {
			const refreshResponse = await baseQuery(
				{ url: "api/v1/auth/refresh", method: "POST" },
				api,
				extraOptions,
			);

			if (refreshResponse.data) {
				// Повторяем запрос только если обновление токена успешно
				result = await baseQuery(args, api, extraOptions);
			} else {
				await baseQuery({ url: "api/v1/auth/logout", method: "POST" }, api, extraOptions);
				api.dispatch(setUnauth());
			}
		} catch (error) {
			console.log(error);
		}
	}

	return result;
};

export const reduxBaseApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	tagTypes: ["User", "Products", "Cart"],
});
