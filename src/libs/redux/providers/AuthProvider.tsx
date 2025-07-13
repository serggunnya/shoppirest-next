"use client";

import { useGetUserQuery } from "@/libs/redux/services/authApi";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	// const isAuthenticated = useSelector(selectIsAuthenticated);
	useGetUserQuery(undefined);

	return <>{children}</>;
}
