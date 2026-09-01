"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IndexPreview } from "@/components/index-preview";
import { handleYandexMetrikaClick } from "@/lib/analytics";

const workflowSteps = [
  ["01", "Исходные данные", "Параметры объекта и сведения для расчёта"],
  ["02", "Расчёт", "Материалы, работы и стоимостные показатели"],
  ["03", "Проверяемые источники", "Данные, на которых основан результат"],
  ["04", "Профессиональный результат", "Структурированный расчёт для экспертной работы"],
];

const principles = [
  ["01", "Структурированные данные", "Исходные сведения не теряются внутри документа."],
  ["02", "Проверяемые источники", "Понятно, откуда получены исходные значения."],
  ["03", "Прозрачная методика", "Можно восстановить логику и структуру расчёта."],
  ["04", "Воспроизводимый результат", "Расчёт можно последовательно проверить повторно."],
];

interface Module {
  number: string;
  status: string;
  title: string;
  description: string;
  items: string[];
  href: string;
  featured: boolean;
}

const modules: Module[] = [
  {
    number: "01",
    status: "ДОСТУПНО",
    title: "Экспертная смета",
    description: "Расчёт стоимости устранения недостатков.",
    items: ["Материалы и работы", "Рыночные цены", "Источники", "Итоговый расчёт"],
    href: "#estimate",
    featured: true,
  },
  {
    number: "02",
    status: "MVP · ДОСТУПНО",
    title: "Индексы цен",
    description: "Работа с изменением стоимости между периодами.",
    items: ["Данные Росстата", "Периоды", "Коэффициент", "Пересчёт стоимости"],
    href: "#indices",
    featured: false,
  },
];

export function IndicesSection() {
  return (
    <section className="pc-indices" id="indices">
      <div className="pc-indices-heading">
        <div>
          <p className="pc-overline">02 / ПРИЗМА — ЭТО БОЛЬШЕ, ЧЕМ СМЕТА</p>
          <h2>Индексы цен</h2>
        </div>
        <p>
          Инструмент для анализа изменения стоимости и пересчёта цен между
          периодами с использованием официальных статистических данных.
        </p>
        <a
          className="pc-button pc-button--secondary"
          href="https://indices.prismcore.ru"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleYandexMetrikaClick('indices_public_open')}
        >
          Открыть публичные индексы <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <IndexPreview />
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section className="pc-workflow" aria-labelledby="workflow-title">
      <p className="pc-overline">ПРОЦЕСС РАБОТЫ</p>
      <h2 id="workflow-title">От исходных данных до результата</h2>
      <div className="pc-workflow-grid">
        {workflowSteps.map(([number, title, description], index) => (
          <article key={number}>
            <div className="pc-workflow-number">
              <b>{number}</b>
              {index < workflowSteps.length - 1 && <ArrowRight aria-hidden="true" />}
            </div>
            <div className={`pc-workflow-data pc-workflow-data--${index + 1}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="pc-trust" aria-labelledby="trust-title">
      <div>
        <p className="pc-overline">ПРИНЦИПЫ PRISMCORE</p>
        <h2 id="trust-title">Расчёт должен быть понятен не только его автору</h2>
      </div>
      <div className="pc-principles">
        {principles.map(([number, title, description]) => (
          <article key={number}>
            <b>{number}</b>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EcosystemSection() {
  return (
    <section className="pc-ecosystem" aria-labelledby="ecosystem-title">
      <p className="pc-overline">ПЛАТФОРМА PRISMCORE</p>
      <h2 id="ecosystem-title">
        Платформа, которая развивается вместе с экспертной практикой
      </h2>
      <p className="pc-ecosystem-intro">
        Призма объединяет специализированные инструменты в единой рабочей
        среде. Архитектура платформы рассчитана на появление новых
        профессиональных модулей.
      </p>

       <div className="pc-module-grid">
         {modules.map((module) => (
           <article
             className={`pc-module-card ${module.featured ? "is-featured" : ""}`}
             key={module.number}
           >
             <span>{module.status}</span>
             <b>{module.number}</b>
             <h3>{module.title}</h3>
             <p>{module.description}</p>
             <ul>
               {module.items.map((item) => (
                 <li key={item}>{item}</li>
               ))}
             </ul>
              <a href={module.href}>
                О модуле <ArrowUpRight aria-hidden="true" />
              </a>
           </article>
         ))}

        <article className="pc-module-card pc-module-card--future">
          <span>В РАЗРАБОТКЕ</span>
          <b>03</b>
          <h3>Новые инструменты</h3>
          <p>Модульная архитектура готова к дальнейшему развитию платформы.</p>
          <div className="pc-future-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </article>
      </div>
    </section>
  );
}

export function BrandStatement() {
  return (
    <section className="pc-brand-statement" aria-label="Принцип бренда">
      <p>
        Эксперт принимает решение.
        <br />
        <span>Призма помогает работать с данными и расчётами.</span>
      </p>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="pc-final-cta" aria-labelledby="final-cta-title">
      <p className="pc-overline">PRISMCORE</p>
      <h2 id="final-cta-title">
        Профессиональные инструменты
        <br />в одной рабочей среде
      </h2>
      <p>
        Используйте Призму для расчётов и работы с данными в экспертной
        практике.
      </p>
       <div>
         <a 
           className="pc-button pc-button--primary" 
           href="https://app.prismcore.ru"
           onClick={handleYandexMetrikaClick('app_open')}
         >
           Начать работу <ArrowUpRight aria-hidden="true" />
         </a>
         <a 
           className="pc-button pc-button--secondary" 
           href="https://app.prismcore.ru"
           onClick={handleYandexMetrikaClick('login_click')}
         >
           Войти
         </a>
       </div>
    </section>
  );
}
