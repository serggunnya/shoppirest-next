import type { RootState } from "@/libs/redux";
import { IUser } from "@/types/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	user: IUser | null;
	isAuthenticated: boolean;
	isInitialized: boolean;
	isLoading: boolean;
}

const initialState: AuthState = {
	user: null,
	isLoading: true,
	isAuthenticated: false,
	isInitialized: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state) => {
			state.isInitialized = true;
			state.isAuthenticated = true;
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setUnauth: (state) => {
			state.user = null;
			state.isInitialized = true;
			state.isAuthenticated = false;
			state.isLoading = false;
		},
	},
});

export const { setAuth, setLoading, setUser, setUnauth } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
