"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { handleYandexMetrikaClick } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="pc-footer">
      <div className="pc-footer-grid">
        <div className="pc-footer-brand">
          <Link href="/" className="pc-logo" aria-label="Призма — главная">
            <BrandMark />
            <span>ПРИЗМА</span>
          </Link>
          <p>Профессиональные инструменты для расчётов, источников и проверяемого результата.</p>
          <a
            className="pc-footer-app"
            href="https://app.prismcore.ru"
            onClick={handleYandexMetrikaClick('app_open')}
          >
            Начать работу <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <nav aria-label="Продукты">
          <b>Продукты</b>
          <Link href="/#products">ПРИЗМА</Link>
          <a href="https://indices.prismcore.ru/" target="_blank" rel="noopener noreferrer">ПРИЗМА Индексы</a>
          <Link href="/#capabilities">Возможности</Link>
        </nav>

        <nav aria-label="Сервис">
          <b>Сервис</b>
          <Link href="/#workflow">Как работает</Link>
          <Link href="/support">Поддержка</Link>
          <a href="https://t.me/denzabob" target="_blank" rel="noopener noreferrer nofollow" onClick={handleYandexMetrikaClick('telegram_click')}>Telegram</a>
        </nav>

        <nav aria-label="Правовая информация">
          <b>Правовая информация</b>
          <Link href="/policy">Политика конфиденциальности</Link>
        </nav>
      </div>

      <div className="pc-footer-bottom">
        <p>© {new Date().getFullYear()} PrismCore</p>
        <p>Профессиональные инструменты в единой рабочей среде.</p>
      </div>
    </footer>
  );
}
