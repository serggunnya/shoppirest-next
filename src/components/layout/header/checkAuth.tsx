"use client";

import { selectIsInitialized } from "@/libs/redux/slices/authSlice";
import { useSelector } from "react-redux";
import UserAuth from "./userAuth";

export default function CheckAuth() {
	const isInitialized = useSelector(selectIsInitialized);

	if (!isInitialized) {
		return "Проверка авторизации...";
	}

	return <UserAuth />;
}
