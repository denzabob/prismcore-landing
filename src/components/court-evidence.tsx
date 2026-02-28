"use client";

import { useState } from "react";
import { Database, Calculator, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

type EvidenceItem = {
  icon: typeof Database;
  title: string;
  description: ReactNode;
};

const items: EvidenceItem[] = [
  {
    icon: Database,
    title: "Источники цен",
    description:
      "Раскрываем поставщиков/прайсы и диапазон цен. Для нескольких источников — медиана/среднее и список источников.",
  },
  {
    icon: Calculator,
    title: "Рыночная ставка часа",
    description: (
      <>
        Собираем ставки из <strong>открытых</strong> источников и считаем итоговую рыночную ставку часа с начислениями, загрузкой и рентабельностью. Формула и промежуточные значения раскрыты.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Верификация документа",
    description:
      "PDF содержит QR-код/ссылку проверки, hash и версию документа для контроля неизменности.",
  },
];

export function CourtEvidence() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <section id="evidence" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Доказательная база: что именно увидит суд
          </h2>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3 sm:mb-10 sm:gap-6">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border/60 bg-background p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="w-full rounded-2xl border border-border/60 bg-background p-5 text-left shadow-sm transition hover:shadow-md"
            aria-label="Открыть превью источников данных"
          >
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Источники данных</span>
              <span>Превью страницы</span>
            </div>
            <Image
              src="/previews/data-sources-median-page.svg"
              alt="Превью: источники данных, медиана и принятая ставка"
              width={960}
              height={620}
              className="h-auto w-full rounded-xl border border-border/70"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Кликните для увеличения превью
            </p>
          </button>
        </div>
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative w-full max-w-5xl rounded-2xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-4 top-4 rounded-md border border-border p-2 text-muted-foreground hover:text-foreground"
              aria-label="Закрыть превью"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Источники данных и медиана ставок</h3>
            <Image
              src="/previews/data-sources-median-page.svg"
              alt="Увеличенное превью: источники данных, медиана и принятая ставка"
              width={960}
              height={620}
              className="h-auto w-full rounded-xl border border-border"
            />
          </div>
        </div>
      )}
    </section>
  );
}
