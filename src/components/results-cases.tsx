"use client";

const metrics = [
  {
    value: "3-6 часов",
    label: "экономии на один расчёт",
    description: "Вместо ручного сбора цен по сайтам, Excel и Word эксперт работает с уже структурированными данными.",
  },
  {
    value: "До 2x",
    label: "меньше циклов правок",
    description: "Проверяющие и заказчики быстрее проходят расчёт, когда видят источники, формулы и логику ставки часа.",
  },
  {
    value: "1 отчёт",
    label: "вместо набора разрозненных файлов",
    description: "Смета, источники и доказательная база собираются в один документ, пригодный для проверки и приложения к заключению.",
  },
];

const cases = [
  {
    before: "Цены и формулы приходилось объяснять в письмах и вручную править в таблицах.",
    after: "Отчёт проходит первичную проверку быстрее, потому что источники и логика расчёта уже раскрыты в документе.",
  },
  {
    before: "Юристу приходилось отдельно разбирать слабые места сметы другой стороны.",
    after: "Сравнение с методикой Призмы сразу показывает, где расчёт оппонента не подтверждён источниками или формулами.",
  },
];

export function ResultsCases() {
  return (
    <section id="results" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Типичные результаты
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Пока без персональных отзывов, но уже с понятными для рынка метриками: меньше ручной работы, меньше замечаний, быстрее выпуск расчёта.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-3xl border border-border/60 bg-muted/30 p-6"
            >
              <p className="mb-2 text-3xl font-bold tracking-tight">{metric.value}</p>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {metric.label}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {cases.map((item, index) => (
            <article
              key={item.before}
              className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Сценарий {index + 1}
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl bg-rose-500/5 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700 dark:text-rose-300">
                    До
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.before}</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/5 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    После
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
