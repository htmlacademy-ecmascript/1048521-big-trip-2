import AbstractView from '../framework/view/abstract-view.js';
import {TextNoEvent} from '../const.js';

/**
 * Функция для получения разметки надписи, когда точки маршрута отсутсвуют
 * @returns {string} Разметка созданного элемента
 */
function createNoTaskTemplate(filterType) {
  const noTaskTextValue = TextNoEvent[filterType];
  return (
    `<p class="trip-events__msg">
      ${noTaskTextValue}
    </p>`
  );
}

/**
 * @class Класс для создания надписи, когда точки маршрута отсутсвуют
 */
export default class NoTaskView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  /**
   * Метод для создания надписи
   * @returns {HTMLElement} Созданный элемент
   */
  get template() {
    return createNoTaskTemplate(this.#filterType);
  }
}
