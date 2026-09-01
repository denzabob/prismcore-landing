import { BrandMark } from "@/components/brand-mark";

export function IndexPreview() {
  return (
    <div className="pc-index-ui">
      <div className="pc-index-toolbar">
        <div>
          <span>ИНДЕКС</span>
          <strong>Индекс цен производителей</strong>
        </div>
        <div>
          <span>ТЕРРИТОРИЯ</span>
          <strong>Российская Федерация</strong>
        </div>
        <div>
          <span>ПЕРИОД РАСЧЁТА</span>
          <strong>
            Февраль 2021 <i>→</i> Май 2026
          </strong>
        </div>
        <div className="pc-index-source">
          <span>ИСТОЧНИК</span>
          <strong>Росстат</strong>
        </div>
      </div>

      <div className="pc-index-content">
        <div className="pc-index-metrics">
          <div className="pc-index-original">
            <span>ИСХОДНАЯ СТОИМОСТЬ</span>
            <strong>100 000 ₽</strong>
          </div>
          <div className="pc-index-metric-pair">
            <div>
              <span>КОЭФФИЦИЕНТ</span>
              <strong>1,2737</strong>
            </div>
            <div>
              <span>ИЗМЕНЕНИЕ</span>
              <strong className="is-accent">+27,37 %</strong>
            </div>
          </div>
          <div className="pc-index-result">
            <span>СТОИМОСТЬ ПОСЛЕ ПРИМЕНЕНИЯ</span>
            <strong>127 370 ₽</strong>
            <small>Использовано месячных индексов: 64</small>
          </div>
        </div>

        <div className="pc-index-chart">
          <div className="pc-chart-heading">
            <div>
              <span>ДИНАМИКА КОЭФФИЦИЕНТА</span>
              <strong>Февраль 2021 — Май 2026</strong>
            </div>
            <div className="pc-chart-legend">
              <i /> Накопленное изменение
            </div>
          </div>
          <div className="pc-chart-canvas">
            <div className="pc-chart-scale" aria-hidden="true">
              <span>1,30</span>
              <span>1,20</span>
              <span>1,10</span>
              <span>1,00</span>
            </div>
            <svg
              viewBox="0 0 720 250"
              preserveAspectRatio="none"
              role="img"
              aria-labelledby="index-chart-title index-chart-description"
            >
              <title id="index-chart-title">
                Динамика индекса цен производителей
              </title>
              <desc id="index-chart-description">
                Коэффициент вырос с 1,00 в феврале 2021 года до 1,2737 в мае
                2026 года.
              </desc>
              <defs>
                <linearGradient id="pc-index-area" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#097c77" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#097c77" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="pc-chart-area"
                d="M0 225 L45 218 L90 202 L135 208 L180 184 L225 171 L270 178 L315 146 L360 153 L405 126 L450 115 L495 96 L540 103 L585 72 L630 61 L675 43 L720 31 V250 H0 Z"
              />
              <path
                className="pc-chart-line"
                d="M0 225 L45 218 L90 202 L135 208 L180 184 L225 171 L270 178 L315 146 L360 153 L405 126 L450 115 L495 96 L540 103 L585 72 L630 61 L675 43 L720 31"
              />
              <circle className="pc-chart-point" cx="720" cy="31" r="6" />
            </svg>
            <div className="pc-chart-axis" aria-hidden="true">
              <span>Фев. 2021</span>
              <span>Янв. 2023</span>
              <span>Янв. 2025</span>
              <span>Май 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pc-index-footnote">
        <span>
          <BrandMark /> Данные используются для расчёта внутри PrismCore
        </span>
        <p>Источник данных: Росстат. PrismCore не является сервисом Росстата.</p>
      </div>
    </div>
  );
}
