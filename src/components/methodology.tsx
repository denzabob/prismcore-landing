"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

const points = [
  "Восстановительная стоимость: материалы + операции + трудозатраты для устранения недостатков.",
  "A1 (аналитический): укрупнённая операция раскладывается на подоперации с временем и объёмом.",
  "A2 (экспертная оценка): применяется при укрупнённых работах без детальной декомпозиции.",
  "Правило агрегации цен: 2 источника — среднее, 3+ — медиана, источники раскрываются.",
];

export function Methodology() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <section id="methodology" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Методология расчёта
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6">
          {points.map((point, index) => (
            <article
              key={point}
              className="rounded-2xl border border-border/60 bg-background p-6"
            >
              <p className="text-xs font-semibold text-primary mb-3">
                Пункт {index + 1}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="w-full rounded-2xl border border-border/60 bg-background p-5 text-left shadow-sm transition hover:shadow-md"
            aria-label="Открыть превью методики A1/A2"
          >
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Справочные сведения / методика A1/A2</span>
              <span>Превью страницы</span>
            </div>
            <Image
              src="/previews/methodology-a1-a2-page.svg"
              alt="Превью: справочные сведения и методика A1/A2"
              width={960}
              height={620}
              className="h-auto w-full rounded-xl border border-border/70"
            />
            <p className="mt-3 text-xs text-muted-foreground">Кликните для увеличения превью</p>
          </button>
        </div>
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl bg-background p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-4 top-4 rounded-md border border-border p-2 text-muted-foreground hover:text-foreground"
              aria-label="Закрыть превью"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Справочные сведения и методика A1/A2</h3>
            <Image
              src="/previews/methodology-a1-a2-page.svg"
              alt="Увеличенное превью: справочные сведения и методика A1/A2"
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
