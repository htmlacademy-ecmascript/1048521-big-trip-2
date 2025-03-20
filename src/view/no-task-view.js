import AbstractView from '../framework/view/abstract-view.js';

/**
 * Функция для получения разметки надписи, когда точки маршрута отсутсвуют
 * @returns {string} Разметка созданного элемента
 */
function createNoTaskTemplate() {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

/**
 * @class Класс для создания надписи, когда точки маршрута отсутсвуют
 */
export default class NoTaskView extends AbstractView {
/**
   * Метод для создания надписи
   * @returns {HTMLElement} Созданный элемент
   */
  get template() {
    return createNoTaskTemplate();
  }
}
