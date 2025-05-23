/**
 * Funciones de utilidad para XLoss
 */

/**
 * Formatea una fecha en formato legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export function generateUniqueId(): string {
  return `xloss-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Trunca un texto si es demasiado largo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}
