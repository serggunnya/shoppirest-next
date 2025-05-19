import { Metadata } from "next";
import MainLayout from "./(shop)/layout";

export const metadata: Metadata = {
  title: "404",
  description: "Страница не найдена",
};

export default function NotFound() {
  return (
    <MainLayout>
    <div className="flex items-center justify-center absolute w-full h-full">
      <h1 className="font-bold">Страница не найдена</h1>      
    </div>
    </MainLayout>
  );
}