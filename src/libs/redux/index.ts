import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { baseApi } from "./services/baseApi";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
			auth: authReducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
