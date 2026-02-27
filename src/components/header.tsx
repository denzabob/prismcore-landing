"use client";

import { useState } from "react";
import { Moon, Sun, Menu, X, Triangle } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const openLeadModal = (mode: "pdf" | "trial") => {
    window.dispatchEvent(new CustomEvent("openLeadModal", { detail: { mode } }));
  };

  const navItems = [
    { label: "Кому подходит", href: "#audience" },
    { label: "Доказательная база", href: "#evidence" },
    { label: "Как работает", href: "#how-it-works" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Triangle className="h-5 w-5 text-primary fill-primary" />
          Призма
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button size="sm" type="button" onClick={() => openLeadModal("pdf")}>
            Получить образец
          </Button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 hover:bg-accent transition-colors"
            aria-label="Переключить тему"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 hover:bg-accent transition-colors"
            aria-label="Переключить тему"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md p-2 hover:bg-accent transition-colors"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              size="sm"
              className="w-full mt-2"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openLeadModal("pdf");
              }}
            >
              Получить образец
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
