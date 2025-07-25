import Footer from "@/components/layout/footer/footer";
import StoreProvider from "@/libs/redux/providers/storeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
				<StoreProvider>
					<div className="flex flex-col min-h-screen">
						<main className="flex-grow-1">{children}</main>
						<Footer />
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}
