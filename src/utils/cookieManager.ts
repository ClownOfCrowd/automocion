/**
 * Менеджер cookies для проверки разрешений и установки cookies
 */

/**
 * Проверяет, разрешены ли все типы cookies
 */
export const hasFullCookieConsent = (): boolean => {
  const consent = localStorage.getItem('cookieConsent');
  return consent === 'all';
};

/**
 * Проверяет, разрешены ли аналитические cookies
 */
export const hasAnalyticsConsent = (): boolean => {
  const fullConsent = hasFullCookieConsent();
  if (fullConsent) return true;
  
  const specificConsent = localStorage.getItem('analyticsConsent');
  return specificConsent === 'true';
};

/**
 * Проверяет, разрешены ли cookies предпочтений
 */
export const hasPreferencesConsent = (): boolean => {
  const fullConsent = hasFullCookieConsent();
  if (fullConsent) return true;
  
  const specificConsent = localStorage.getItem('preferencesConsent');
  return specificConsent === 'true';
};

/**
 * Устанавливает cookie, если есть соответствующее разрешение от пользователя
 * @param name Имя cookie
 * @param value Значение cookie
 * @param days Срок действия в днях
 * @param type Тип cookie (essential, analytics, preferences)
 */
export const setCookie = (name: string, value: string, days: number, type: 'essential' | 'analytics' | 'preferences'): void => {
  // Существенные cookies всегда устанавливаем
  if (type === 'essential') {
    setActualCookie(name, value, days);
    return;
  }
  
  // Для аналитических cookies проверяем разрешение
  if (type === 'analytics' && hasAnalyticsConsent()) {
    setActualCookie(name, value, days);
    return;
  }
  
  // Для cookies предпочтений проверяем разрешение
  if (type === 'preferences' && hasPreferencesConsent()) {
    setActualCookie(name, value, days);
    return;
  }
};

/**
 * Фактическая установка cookie
 */
const setActualCookie = (name: string, value: string, days: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=Strict";
};

/**
 * Получает значение cookie по имени
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Удаляет cookie по имени
 */
export const deleteCookie = (name: string): void => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}; 