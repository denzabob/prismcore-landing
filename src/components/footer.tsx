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
          <p>Профессиональная платформа для работы эксперта.</p>
          <a
            className="pc-footer-app"
            href="https://app.prismcore.ru"
            onClick={handleYandexMetrikaClick('app_open')}
          >
            Войти в приложение <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <nav aria-label="Продукт">
          <b>Продукт</b>
          <Link href="/#capabilities">Возможности</Link>
          <Link href="/#estimate">Экспертная смета</Link>
          <Link href="/#indices">Индексы цен</Link>
        </nav>

         <nav aria-label="Материалы">
           <b>Материалы</b>
           <a href="/support">Поддержка</a>
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
