"use client";

import { useLoginMutation } from "@/libs/redux/services/reduxAuthService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isLoading }] = useLoginMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Отправляем запрос с данными формы
			const result = await login({ email, password });
			console.log("Успех:", result.data);
			router.push("/");
		} catch (err) {
			console.error("Ошибка:", err);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit" disabled={isLoading}>
					{isLoading ? "Загрузка..." : "Войти"}
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
