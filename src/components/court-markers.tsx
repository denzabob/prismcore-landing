"use client";

import { ShieldCheck, SearchCheck, FileCheck } from "lucide-react";

const markers = [
  {
    icon: SearchCheck,
    text: "Суд видит источники и диапазон цен по каждой позиции",
  },
  {
    icon: FileCheck,
    text: "Расчёт можно воспроизвести шаг за шагом (методика раскрыта)",
  },
  {
    icon: ShieldCheck,
    text: "Подлинность документа проверяется по QR, hash и версии",
  },
];

export function CourtMarkers() {
  return (
    <section className="py-14 sm:py-20 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Что проверяет суд в экспертной смете
          </h2>
          <p className="text-muted-foreground text-lg">
            Пункты, которые подтверждаются структурой отчёта.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:gap-6">
          {markers.map((item) => (
            <article
              key={item.text}
              className="rounded-2xl border border-border/60 bg-background p-6"
            >
              <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
