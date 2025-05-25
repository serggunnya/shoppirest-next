// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile", "/cart", "/orders", "/checkout"];

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get("ACCESS_TOKEN");
	const refreshToken = request.cookies.get("REFRESH_TOKEN");

	const pathname = request.nextUrl.pathname;
	const isAuthRoute = authRoutes.includes(pathname);
	const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

	if (isProtectedRoute && !accessToken && refreshToken) {
		try {
			const response = await fetch(
				new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, request.url),
				{
					method: "POST",
					headers: { Cookie: `REFRESH_TOKEN=${refreshToken}` },
				},
			);

			if (response.ok) {
				return NextResponse.next();
			}
		} catch (error) {
			console.error("Error refreshing access token:", error);
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (isProtectedRoute && !accessToken && !refreshToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (isAuthRoute && accessToken) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
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
