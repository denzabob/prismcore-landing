"use client";

import { Upload, Settings, FileOutput } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Фиксируете дефекты и состав работ",
    description:
      "Фиксируете дефекты и состав работ.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Система подтягивает цены/нормы и считает ставку часа",
    description:
      "Система подтягивает цены/нормы и считает ставку часа.",
  },
  {
    number: "03",
    icon: FileOutput,
    title: "Получаете PDF с раскрытой методикой, источниками и верификацией",
    description:
      "Получаете PDF с раскрытой методикой, источниками и верификацией.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Как это работает
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Три простых шага от исходных данных до готовой сметы.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center group">
              {/* Connector line (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-border" />
              )}

              <div className="relative inline-flex mb-6">
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
