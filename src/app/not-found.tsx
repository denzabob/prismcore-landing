import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export default function NotFound() {
  return (
    <main className="pc-not-found">
      <Link href="/" className="pc-logo" aria-label="Призма — главная">
        <BrandMark />
        <span>ПРИЗМА</span>
      </Link>
      <p className="pc-overline">ОШИБКА 404</p>
      <h1>Страница не найдена</h1>
      <p>Вернитесь на главную, чтобы продолжить работу с продуктами ПРИЗМЫ.</p>
      <Link href="/" className="pc-button pc-button--primary">
        <ArrowLeft aria-hidden="true" /> На главную
      </Link>
    </main>
  );
}
