/**
 * Яндекс.Метрика helper
 * Отправляет цели только если window.ym доступен
 * Не блокирует UX при ошибках
 */

export type YandexMetrikaGoal = 
  | 'app_open'
  | 'login_click'
  | 'indices_public_open'
  | 'sample_pdf_open'
  | 'support_submit_success'
  | 'telegram_click'
  | 'lead_submit_success'
  | 'tools_open'
  | 'tool_price_series_search'
  | 'tool_price_series_select'
  | 'tool_price_calculate'
  | 'tool_price_calculate_success'
  | 'tool_okpd2_search'
  | 'tool_okpd2_result_open'
  | 'tool_indices_open';

export type SafeAnalyticsParams = {
  tool?: 'price-change' | 'okpd2' | 'tools';
  family?: 'producer_prices' | 'consumer_prices';
  series?: string;
  result_count?: number;
  period_length?: number;
  has_amount?: boolean;
  has_linked_index?: boolean;
};

// Объявляем глобальный тип для Яндекс.Метрики
declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      goal: string,
      params?: SafeAnalyticsParams,
    ) => void;
  }
}

/**
 * Отправка цели в Яндекс.Метрику
 * Безопасно вызывает ym только если он доступен
 */
export function sendYandexMetrikaGoal(
  goal: YandexMetrikaGoal,
  params?: SafeAnalyticsParams,
): void {
  if (typeof window !== 'undefined' && window.ym && typeof window.ym === 'function') {
    try {
      window.ym(107046462, 'reachGoal', goal, params);
    } catch {
      // Не блокируем UX при ошибках аналитики
    }
  }
}

/**
 * Хук для отправки цели при клике
 * Используется для кнопок и ссылок
 */
export function handleYandexMetrikaClick(
  goal: YandexMetrikaGoal,
  onClick?: () => void
): () => void {
  return () => {
    sendYandexMetrikaGoal(goal);
    onClick?.();
  };
}
