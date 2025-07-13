import LoginForm from "@/components/products/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Логин",
	description: "Страница входа",
};

const LoginPage = () => {
	return (
		<div>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
