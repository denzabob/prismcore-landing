"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EstimatePreview } from "@/components/estimate-preview";
import { IndexPreview } from "@/components/index-preview";
import { handleYandexMetrikaClick } from "@/lib/analytics";

const workflowSteps = [
  ["01", "Исходные данные", "Параметры объекта и сведения для расчёта"],
  ["02", "Расчёт", "Материалы, работы и стоимостные показатели"],
  ["03", "Источники", "Данные, на которых основан результат"],
  ["04", "Проверяемый результат", "Структурированный результат для экспертной работы"],
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
  preview: "estimate" | "indices";
}

const modules: Module[] = [
  {
    number: "01",
    status: "ДОСТУПНО",
    title: "ПРИЗМА",
    description: "Рабочая среда для экспертных расчётов и подготовки результата.",
    items: ["Расчёты", "Источники", "Проверяемость", "Результат"],
    href: "#estimate",
    featured: true,
    preview: "estimate",
  },
  {
    number: "02",
    status: "ПУБЛИЧНЫЙ СЕРВИС",
    title: "ПРИЗМА Индексы",
    description: "Официальные данные Росстата для анализа и пересчёта стоимости.",
    items: ["Индексы цен производителей", "ИПЦ", "Поиск и графики", "Изменение стоимости"],
    href: "https://indices.prismcore.ru/",
    featured: false,
    preview: "indices",
  },
];

export function IndicesSection() {
  return (
    <section className="pc-indices" id="indices">
      <div className="pc-indices-heading">
        <div>
          <p className="pc-overline">ПРИЗМА ИНДЕКСЫ</p>
          <h2>Официальные данные для пересчёта стоимости</h2>
        </div>
        <p>
          Индексы цен производителей, ИПЦ, поиск, графики и расчёт изменения
          стоимости по официальным данным Росстата.
        </p>
        <a
          className="pc-button pc-button--secondary"
          href="https://indices.prismcore.ru"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleYandexMetrikaClick('indices_public_open')}
        >
          Открыть Индексы <ArrowUpRight aria-hidden="true" />
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
    <section className="pc-ecosystem" id="products" aria-labelledby="ecosystem-title">
      <p className="pc-overline">ПРОДУКТЫ ПРИЗМЫ</p>
      <h2 id="ecosystem-title">
        Два продукта для разных этапов экспертной работы
      </h2>
      <p className="pc-ecosystem-intro">
        Начните с рабочего пространства для расчётов или откройте публичный
        сервис индексов, когда нужно проверить динамику стоимости.
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
             <div className={`pc-module-preview pc-module-preview--${module.preview}`} aria-hidden="true">
               {module.preview === "estimate" ? <EstimatePreview compact /> : <IndexPreview />}
             </div>
             <ul>
               {module.items.map((item) => (
                 <li key={item}>{item}</li>
               ))}
             </ul>
              <a
                href={module.href}
                {...(module.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {module.number === "01" ? "Посмотреть возможности" : "Открыть Индексы"} <ArrowUpRight aria-hidden="true" />
              </a>
           </article>
         ))}

      </div>
      <p className="pc-ecosystem-note">Развиваем бесплатные инструменты для профессиональных расчётов.</p>
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
        Начните работу с расчётами или откройте публичные индексы для анализа
        изменения стоимости.
      </p>
       <div>
         <a 
           className="pc-button pc-button--primary" 
           href="https://app.prismcore.ru"
           onClick={handleYandexMetrikaClick('app_open')}
         >
           Начать работу <ArrowUpRight aria-hidden="true" />
         </a>
          <a className="pc-button pc-button--secondary" href="#products">
            Посмотреть продукты <ArrowUpRight aria-hidden="true" />
          </a>
       </div>
    </section>
  );
}
