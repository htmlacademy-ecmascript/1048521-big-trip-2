import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTaskDueDate, showTripDuration, calculateTripDuration, showFullDate, showFullDateTime} from '../utils.js';

/**
 * Функция для получения разметки дополнительных услуг точек маршрута
  * @param {Array} offers Массив оферов
 * @returns {string} Разметка списка оферов
 */
function createAddServices(offers) {
  return offers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  ).join('');
}

/**
 * Функция для получения разметки точки маршрута
 * @param {Object} task Данные точки маршрута
 * @returns {string} Разметка точки маршрута
 */
function createRoutPointTemplate(task) {
  const {destinationDetails, destination, type, offers, startDate, endDate, basePrice, isFavorite} = task;

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return `<li class=" event trip-events__item">
            <time class="event__date" datetime="${showFullDate(startDate)}">${humanizeTaskDueDate(startDate)}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${destinationDetails.name}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${showFullDateTime(startDate)}">${showTripDuration(startDate)}</time>
                &mdash;
                <time class="event__end-time" datetime="${showFullDateTime(endDate)}">${showTripDuration(endDate)}</time>
              </p>
              <p class="event__duration">${calculateTripDuration(startDate, endDate)}</p>
            </div>
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${createAddServices(offers)}
            </ul>
            <button class="${favoriteClassName}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </li>`;
}

/**
 * @class Класс для создания точки маршрута
 */
export default class RoutPointView extends AbstractView {
  #task = null;
  #handleEditClick = null;
  #element = null;
  #handleFavoriteClick = null;

  /**
   * @param {object} task Описание точки маршрута
   * @param {function} onEditClick Колбэк-функция для обработки клика по кнопке редактирования
   * @param {function} onFavoriteClick Колбэк-функция для обработки клика по кнопке "Избранное"
   */
  constructor({task, onEditClick, onFavoriteClick}) {
    super();
    this.#task = task;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  /**
   * Геттер для получения разметки точки маршрута
   * @returns {HTMLElement} Созданную точку маршрута
   */
  get template() {
    return createRoutPointTemplate(this.#task);
  }

  /**
   * Геттер для получения элемента точки маршрута
   * @returns {HTMLElement} Элемент точки маршрута
   */
  get element() {
    if (!this.#element) {
      this.#element = super.element;
      const eventRollupButtonElement = this.#element.querySelector('.event__rollup-btn');
      eventRollupButtonElement.addEventListener('click', this.#editClickHandler);
    }

    return this.#element;
  }

  /**
   * Метод открытия/закрытия формы точки маршрута
   * @param {object} event Тип события
   */
  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  /**
   * Метод добавления/удаления точки маршрута в избранное
   * @param {object} event Тип события
   */
  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
