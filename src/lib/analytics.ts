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
  | 'lead_submit_success';

// Объявляем глобальный тип для Яндекс.Метрики
declare global {
  interface Window {
    ym?: (counterId: number, method: string, goal: string) => void;
  }
}

/**
 * Отправка цели в Яндекс.Метрику
 * Безопасно вызывает ym только если он доступен
 */
export function sendYandexMetrikaGoal(goal: YandexMetrikaGoal): void {
  if (typeof window !== 'undefined' && window.ym && typeof window.ym === 'function') {
    try {
      window.ym(107046462, 'reachGoal', goal);
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
