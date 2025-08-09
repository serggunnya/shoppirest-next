import { reduxBaseApi } from "@/libs/redux/reduxBaseApi";
import { ILoginCredentials, IRegisterCredentials, IUser } from "@/types/user.interface";
import { setAuth, setLoading, setUnauth, setUser } from "../slices/authSlice";

export const authApi = reduxBaseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (userData: IRegisterCredentials) => ({
				url: "api/v1/auth/register",
				method: "POST",
				body: userData,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(authApi.endpoints.getUser.initiate(undefined, { forceRefetch: true }));
				} catch (error) {
					console.error("Ошибка при входе:", error);
				}
			},
		}),
		login: builder.mutation({
			query: (credentials: ILoginCredentials) => ({
				url: `api/v1/auth/login`,
				method: "POST",
				body: credentials,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setAuth());
					dispatch(authApi.endpoints.getUser.initiate(undefined, { forceRefetch: true }));
				} catch (error) {
					console.error("Ошибка при входе:", error);
					dispatch(setUnauth());
				}
			},
		}),
		getUser: builder.query<IUser, void>({
			query: () => "api/v1/auth/me",
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					dispatch(setLoading(true));
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
					dispatch(setLoading(false));
					dispatch(setAuth());
				} catch (error) {
					console.error("Ошибка при получении данных пользователя:", error);
					dispatch(setUnauth());
				}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: "api/v1/auth/logout",
				method: "POST",
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setUnauth());
				} catch (error) {
					console.error("Ошибка при выходе:", error);
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetUserQuery,
	useLazyGetUserQuery,
} = authApi;
