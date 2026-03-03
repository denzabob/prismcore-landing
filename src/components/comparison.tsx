"use client";

const comparisonRows = [
  {
    manual: "Сбор цен вручную",
    prisma: "Автоматическая интеграция источников",
  },
  {
    manual: "Нет стандарта методики",
    prisma: "Прозрачная методика с формулами",
  },
  {
    manual: "Долгие правки",
    prisma: "Быстрая корректировка",
  },
  {
    manual: "Высокий риск ошибок",
    prisma: "Минимизированный риск",
  },
];

export function Comparison() {
  return (
    <section id="comparison" className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ручной расчёт против Призмы
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Разница видна не в интерфейсе, а в результате: сколько ручного труда остаётся и насколько уязвимым выглядит расчёт.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm">
          <div className="grid grid-cols-2 border-b border-border/60 bg-muted/40">
            <div className="px-5 py-4 text-sm font-semibold sm:px-6 sm:text-base">
              Ручной расчёт (Excel/Word)
            </div>
            <div className="px-5 py-4 text-sm font-semibold sm:px-6 sm:text-base">
              Призма
            </div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.manual} className="grid grid-cols-2 border-b border-border/40 last:border-b-0">
              <div className="px-5 py-4 text-sm text-muted-foreground sm:px-6 sm:text-base">
                {row.manual}
              </div>
              <div className="px-5 py-4 text-sm sm:px-6 sm:text-base">
                {row.prisma}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
