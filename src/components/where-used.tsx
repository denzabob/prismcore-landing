"use client";

const usageItems = [
  "Судебные экспертизы мебели",
  "Досудебные исследования",
  "Приложение к экспертному заключению (расчёт стоимости устранения недостатков)",
  "Проверка и критика расчётов другой стороны",
];

export function WhereUsed() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Где эксперты применяют Призму
          </h2>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-muted/30 p-6 sm:p-8">
          <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
            {usageItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
