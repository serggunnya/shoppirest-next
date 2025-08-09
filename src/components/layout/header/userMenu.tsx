"use client";

import { useLogoutMutation } from "@/libs/redux/services/reduxAuthService";
import { selectCurrentUser, selectIsLoading } from "@/libs/redux/slices/authSlice";
import { IUser } from "@/types/user.interface";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const userIsLoading = useSelector(selectIsLoading);
	const user: IUser | null = useSelector(selectCurrentUser);
	const [logout, { isLoading }] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logout(undefined);
		} catch (error) {
			console.error("Ошибка при выходе:", error);
		}
	};

	if (userIsLoading) return "загрузка данных...";

	return (
		<div className="relative">
			<button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
				<div className="w-8 h-8 rounded-full overflow-hidden">
					<div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
						{user?.firstname}
					</div>
				</div>
				<span>{user?.lastname}</span>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
					<Link
						href="/profile"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						onClick={() => setIsOpen(false)}
					>
						Профиль
					</Link>
					<Link
						href="/orders"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						onClick={() => setIsOpen(false)}
					>
						Мои заказы
					</Link>
					<button
						onClick={handleLogout}
						disabled={isLoading}
						className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						{isLoading ? "Выход..." : "Выйти"}
					</button>
				</div>
			)}
		</div>
	);
}
