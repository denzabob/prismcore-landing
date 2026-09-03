"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { handleYandexMetrikaClick } from "@/lib/analytics";

const navItems = [
  { label: "Продукты", href: "/#products" },
  { label: "Инструменты", href: "/tools" },
  { label: "Возможности", href: "/#capabilities" },
  { label: "Как работает", href: "/#workflow" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pc-header">
      <div className="pc-header-inner">
        <Link href="/" className="pc-logo" aria-label="Призма — главная">
          <BrandMark />
          <span>ПРИЗМА</span>
        </Link>

          <nav className="pc-desktop-nav" aria-label="Основная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pc-header-actions">
            <a
              className="pc-login"
              href="https://app.prismcore.ru"
              onClick={handleYandexMetrikaClick('login_click')}
            >
              Войти
            </a>
          </div>

        <button
          type="button"
          className="pc-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
          <nav
            className="pc-mobile-nav"
            id="mobile-navigation"
            aria-label="Мобильная навигация"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div>
              <a
                className="pc-button pc-button--primary"
                href="https://app.prismcore.ru"
                onClick={handleYandexMetrikaClick('login_click', () => setMenuOpen(false))}
              >
                Войти <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
        </nav>
      )}
    </header>
  );
}
