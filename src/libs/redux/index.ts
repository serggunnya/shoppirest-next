import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { reduxBaseApi } from "./reduxBaseApi";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			[reduxBaseApi.reducerPath]: reduxBaseApi.reducer,
			auth: authReducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxBaseApi.middleware),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
