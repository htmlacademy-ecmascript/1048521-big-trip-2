import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

/**
 * @const
 */
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const FULL_DATE_FORMAT = 'YYYY-MM-DD';
const FULL_DATE_TIME_FORMAT = 'YYYY-MM-DDT HH:mm';
const DATE_NEW_POINT_FORMAT = 'DD/MM/YY HH:mm';
const MINUTES_PER_HOUR = 60;

dayjs.extend(utc);

/**
* Функция получения случайного элемента массива
* @param {object} items Массив данных
* @returns {HTMLElement} Случайный элемент массива
*/
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/**
* Функция создает дату в формате 'DD/MM/YY HH:mm'
* @param {string} dueDate Дата в виде строки
* @returns {string} Измененная дата или пустая строка, если даты нет
*/
function showNewPointDate(dueDate) {
  return dueDate ? dayjs.utc(dueDate).format(DATE_NEW_POINT_FORMAT) : '';
}

/**
 * Функция создает дату в формате "YYYY-MM-DD"
 * @param {string} dueDate Дата в виде строки
 * @returns {string} Измененная дата или пустая строка, если даты нет
 */
function showFullDate(dueDate) {
  return dueDate ? dayjs.utc(dueDate).format(FULL_DATE_FORMAT) : '';
}

/**
 * Функция создает дату в формате "YYYY-MM-DDT HH:mm"
 * @param {string} dueDate Дата в виде строки
 * @returns {string} Измененная дата или пустая строка, если даты нет
 */
function showFullDateTime(dueDate) {
  return dueDate ? dayjs.utc(dueDate).format(FULL_DATE_TIME_FORMAT) : '';
}


/**
 * Функция создает дату в формате  "MMM D"
 * @param {object} dueDate Дата в виде строки
 * @returns {string} Измененная дата или пустая строка, если даты нет
 */
function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs.utc(dueDate).format(DATE_FORMAT) : '';
}

/**
 * Функция создает дату в формате  "HH:mm"
 * @param {object} dueDate Дата в виде строки
 * @returns {string} Измененная дата или пустая строка, если даты нет
 */
function showTripDuration(dueDate) {
  return dueDate ? dayjs.utc(dueDate).format(TIME_FORMAT) : '';
}

/**
 * Функция создает дату в формате "XH YM"
 * @param {string} start Дата и время начала поездки
 * @param {string} end Дата и время окончания поездки
 * @returns {string} Продолжительность поездки
 */
function calculateTripDuration(start, end) {
  const duration = dayjs(end).diff(dayjs(start), 'minute');
  const hours = Math.floor(duration / MINUTES_PER_HOUR);
  const minutes = duration % MINUTES_PER_HOUR;
  return `${hours}H ${minutes}M`;
}

/**
   * Функция обновления точки маршрута, если совпадает id
   * @param {object} items Старые данные
   * @param {object} update Обновленные данные
   * @returns {Array} - Новый массив с обновленной точкой маршрута
   */
function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {updateItem, getRandomArrayElement, humanizeTaskDueDate, showTripDuration, calculateTripDuration, showFullDate, showFullDateTime, showNewPointDate};
