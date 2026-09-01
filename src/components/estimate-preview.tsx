import { ArrowUpRight, Check } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const positions = [
  {
    name: "Правая стойка пенала",
    material: "ЛДСП, 16 мм · 2170 × 560 мм",
    work: "Раскрой, кромление",
    cost: "82 600 ₽",
  },
  {
    name: "Левая стойка пенала",
    material: "ЛДСП, 16 мм · 2170 × 560 мм",
    work: "Раскрой, присадка",
    cost: "81 400 ₽",
  },
  {
    name: "Дно тумбы-мойки",
    material: "ЛДСП влагостойкая · 800 × 560 мм",
    work: "Изготовление, монтаж",
    cost: "67 320 ₽",
  },
];

export function EstimatePreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`pc-app-window ${compact ? "pc-app-window--compact" : ""}`}>
      <div className="pc-window-top">
        <div className="pc-app-brand">
          <BrandMark />
          <strong>ПРИЗМА</strong>
          <span>/ Экспертная смета</span>
        </div>
        <div className="pc-save-state">
          <Check aria-hidden="true" />
          Расчёт сохранён
        </div>
      </div>

      <div className="pc-estimate-workspace">
        <aside className="pc-estimate-nav" aria-label="Разделы проекта">
          <b>Проект</b>
          <span className="is-active">Позиции</span>
          <span>Материалы</span>
          <span>Работы</span>
          <span>Источники</span>
        </aside>

        <div className="pc-estimate-main">
          <div className="pc-estimate-kicker">Проект #2-5437/2025 · 4 позиции</div>
          <div className="pc-estimate-heading">
            <div>
              <h3>Расчёт стоимости устранения недостатков</h3>
              <p>Кухонный гарнитур · актуальная редакция</p>
            </div>
            <span className="pc-source-status">
              <i /> Источники проверены
            </span>
          </div>

          <div className="pc-estimate-table-wrap">
            <table className="pc-estimate-table">
              <thead>
                <tr>
                  <th>Позиция</th>
                  <th>Материал / размер</th>
                  <th>Работы</th>
                  <th>Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.name}>
                    <td>
                      <span className="pc-data-dot" />
                      {position.name}
                    </td>
                    <td>{position.material}</td>
                    <td>{position.work}</td>
                    <td>{position.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="pc-estimate-total">
          <span>ИТОГОВАЯ СТОИМОСТЬ</span>
          <strong>438 420 ₽</strong>
          <div>
            <p>
              Материалы <b>287 400 ₽</b>
            </p>
            <p>
              Работы <b>126 020 ₽</b>
            </p>
            <p>
              Прочие расходы <b>25 000 ₽</b>
            </p>
          </div>
          <span className="pc-estimate-total-action">
            Расчёт сформирован <ArrowUpRight aria-hidden="true" />
          </span>
        </aside>
      </div>
    </div>
  );
}
