import AbstractView from '../framework/view/abstract-view.js';
import {showNewPointDate} from '../utils.js';

/**
 * Функция для получения разметки формы точки маршрута
 * @param {string} type Тип точки маршрута
 * @param {object} offers Дополнительные опции точки маршрута
 * @param {string} startDate Время начала маршрута
 * @param {string} endDate Время окончания маршрута
 * @param {number} basePrice Цена маршрута
 * @returns {string} Разметка созданноq формы
 */
function createAddNewPointWithout(type, offers, startDate, endDate, basePrice) {
  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">

              ${createTypeWrapperServices(type)}

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${showNewPointDate(startDate)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${showNewPointDate(endDate)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro; ${basePrice}
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>

            <section class="event__details">
              <section class="event__section  event__section--offers">
                ${offers && offers.length > 0 ? `
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${createButtonAddServices(offers)}
                  </div>
                ` : ''}
              </section>
            </section>
          </form>`;
}

/**
 * Функция для получения разметки дополнительных опций точки маршрута
 * @param {object} offers Дополнительные опции точки маршрута
 * @returns {string} Разметку созданной опции
 */
function createButtonAddServices(offers) {
  return offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer.id}" type="checkbox" name="event-offer-comfort" checked>
      <label class="event__offer-label" for="event-offer-comfort-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ).join('');
}

/**
 * Функция для получения разметки типов точки маршрута
 * @param {string} type Тип точки маршрута
 * @returns {HTMLElement} Созданный тип точки
 */
function createTypeWrapperServices(type) {
  return `<div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>`;
}

/**
 * @class Класс для создания формы точки маршрута
 */
export default class RoutPointEditView extends AbstractView {
  #task = null;
  #handleFormSubmit = null;
  #element = null;
  #handleFormDelete = null;

  /**
   * @param {object} task Описание точки маршрута
   * @param {function} onFormSubmit Колбэк-функция сохранения данных в форме
   * @param {function} onDeleteForm Колбэк-функция удаления точки маршрута
   */
  constructor({task, onFormSubmit, onDeleteForm}) {
    super();
    this.#task = task;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDelete = onDeleteForm;
    this.element.addEventListener('click', this.#formSubmitHandler);
  }

  /**
   * Геттер для получения разметки формы точки маршрута
   * @returns {HTMLElement} Созданную форму
   */
  get template() {
    const { type, offers, startDate, endDate, basePrice } = this.#task;
    return createAddNewPointWithout(type, offers, startDate, endDate, basePrice);
  }

  /**
   * Геттер для получения элемента формы точки маршрута
   * @returns {HTMLElement} Созданную форму
   */
  get element() {
    if (!this.#element) {
      this.#element = super.element;
      this.#element.addEventListener('submit', this.#formSubmitHandler);
      const deleteElement = this.#element.querySelector('.event__reset-btn');
      deleteElement.addEventListener('click', this.#formDeleteHandler);
    }
    return this.#element;
  }

  /**
   * Метод для сохранения данных в форме
   * @param {object} event Тип события
   */
  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#task);
  };

  /**
   * Метод для удаления формы
   */
  #formDeleteHandler = () => {
    // this.#handleFormDelete();
  };
}
