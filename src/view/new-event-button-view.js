import AbstractView from '../framework/view/abstract-view.js';

/**
 * Функция для получения разметки кнопки создания новой формы точки маршрута
 * @returns {string} Разметка созданной кнопки
 */
function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

/**
 * @class Класс для создания кнопки для новой формы
 */
export default class NewEventButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  /**
   * Метод для создания кнопки новой формы точки маршрута
   * @returns {HTMLElement} Созданную кнопку
   */
  get template() {
    return createNewEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
