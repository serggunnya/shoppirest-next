"use client";

import { selectIsAuthenticated } from "@/libs/redux/slices/authSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import UserMenu from "./userMenu";

export default function UserAuth() {
	const isAuthenticated = useSelector(selectIsAuthenticated);

	if (isAuthenticated) {
		return <UserMenu />;
	}

	return (
		<div className="">
			<Link href="/login" className="hover:text-blue-600">
				Войти
			</Link>
			<Link href="/register" className="hover:text-blue-600">
				Регистрация
			</Link>
		</div>
	);
}
