// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile", "/cart", "/orders", "/checkout"];

import createIntlMiddleware from "next-intl/middleware";

// языки по умолчанию
const locales = ["en", "ru"];
const defaultLocale = "ru";

// middleware для i18n
const intlMiddleware = createIntlMiddleware({ locales, defaultLocale });

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const accessToken = request.cookies.get("ACCESS_TOKEN");
	const refreshToken = request.cookies.get("REFRESH_TOKEN");

	const i18nResponse = intlMiddleware(request);
	const lang = i18nResponse.headers.get("x-next-intl-locale") || defaultLocale;

	const isAuthRoute = authRoutes.includes(pathname);
	const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

	if (isProtectedRoute && !accessToken && refreshToken) {
		try {
			const path = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`;
			const response = await fetch(new URL(path, request.url), {
				method: "POST",
				credentials: "include",
			});

			if (response.ok) {
				return NextResponse.next();
			}
		} catch (error) {
			console.error("Error refreshing access token:", error);
			return NextResponse.redirect(new URL(`/${lang}/login`, request.nextUrl.clone()));
		}
	}

	if (isProtectedRoute && !accessToken && !refreshToken) {
		return NextResponse.redirect(new URL(`/${lang}/login`, request.nextUrl.clone()));
	}

	if (isAuthRoute && accessToken) {
		return NextResponse.redirect(new URL(`/${lang}/`, request.nextUrl.clone()));
	}

	return i18nResponse;
}

export const config = {
	matcher: [
		/*
		 * Исключаем из проверки:
		 * - API маршруты (/api/*)
		 * - Статические файлы (/_next/static/*, /favicon.ico, и т.д.)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
