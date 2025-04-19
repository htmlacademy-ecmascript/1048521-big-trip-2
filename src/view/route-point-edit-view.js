import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {showNewPointDate} from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

/**
 * Функция получения разметки секции описания и фотографий
 * @param {object} destinationDetails Описание пункта назначения
 * @returns {string} Текст описания
 */
function createDestinationSection(destinationDetails) {
  if (!destinationDetails || !destinationDetails.description) {
    return '';
  }
  const picturesMarkup = destinationDetails.pictures?.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">
  `).join('') || '';

  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDetails.description}</p>
      ${picturesMarkup ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${picturesMarkup}
          </div>
        </div>
      ` : ''}
    </section>
  `;
}

/**
 * Функция для получения разметки формы точки маршрута
 * @param {string} type Тип точки маршрута
 * @param {object} offers Дополнительные опции точки маршрута
 * @param {string} startDate Время начала маршрута
 * @param {string} endDate Время окончания маршрута
 * @param {number} basePrice Цена маршрута
 * @returns {string} Разметка созданноq формы
 */
function createAddNewPointWithout(state) {
  const {type, offers, startDate, endDate, basePrice, destinationDetails} = state;
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
              ${createDestinationSection(destinationDetails)}
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
  const typeElements = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  return `<div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeElements.map((typeOption) => `
                  <div class="event__type-item">
                    <input id="event-type-${typeOption}"
                      class="event__type-input visually-hidden"
                      type="radio"
                      name="event-type"
                      value="${typeOption}"
                      ${typeOption === type ? 'checked' : ''}>
                    <label class="event__type-label event__type-label--${typeOption}"
                      for="event-type-${typeOption}">${typeOption}</label>
                  </div>
                `).join('')}
              </fieldset>
            </div>
          </div>`;
}

/**
 * @class Класс для создания формы точки маршрута
 */
export default class RoutPointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormDelete = null;
  #handleFormClose = null;
  #startDatepicker = null;
  #endDatepicker = null;

  /**
   * @param {object} task Описание точки маршрута
   * @param {function} onFormSubmit Колбэк-функция сохранения данных в форме
   * @param {function} onDeleteForm Колбэк-функция удаления точки маршрута
   */
  constructor({task, onFormSubmit, onDeleteForm, onFormClose}) {
    super();
    this._setState(RoutPointEditView.parseTaskToState(task));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDelete = onDeleteForm;
    this.#handleFormClose = onFormClose;
    this._restoreHandlers();
  }

  /**
   * Метод для удаления элемента и календаря
   */
  removeElement() {
    super.removeElement();
    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
    }
    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
    }
  }

  /**
   * Геттер для получения разметки формы точки маршрута
   * @returns {HTMLElement} Созданную форму
   */
  get template() {
    // console.log(this._state);
    return createAddNewPointWithout(this._state);
  }

  /**
   * Метод сброса формы до изначального состояния
   * @param {object} task Исходные данные точки маршрута
   */
  reset(task) {
    this.updateElement(RoutPointEditView.parseTaskToState(task));
  }

  /**
  * Метод для восстановления обработчиков после перерисовки элемента
  */
  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCloseHandler);
    this.#setDatepicker();
  }

  /**
   * Метод для сохранения данных в форме
   * @param {object} event Тип события
   */
  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(RoutPointEditView.parseStateToTask(this._state));
  };

  /**
   * Метод закрытия формы
   * @param {object} evt Событие клика по кнопке закрытия
   */
  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  /**
   * Метод для удаления формы
   * @param {object} event Тип события
   */
  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(RoutPointEditView.parseStateToTask(this._state));
  };

  /**
   * Метод изменения типа маршрута
   * @param {object} evt Событие изменения типа
   */
  #typeChangeHandler = (evt) => {
    if (evt.target.matches('.event__type-input')) {
      const newType = evt.target.value;
      this.updateElement({
        type: newType,
      });
    }
  };

  /**
   * Метод изменения пункта назначения
   * @param {object} evt Событие изменения значения поля
   */
  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: evt.target.value
    });
  };

  /**
   * Методод изменения цены в форме
   * @param {object} evt Событие ввода в поле цены
   */
  #priceInputHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  /**
   * Методод создания экземпляра datepicker для инпутов  с датами
   */
  #setDatepicker() {
    const startTimeInput = this.element.querySelector('#event-start-time-1');
    const endTimeInput = this.element.querySelector('#event-end-time-1');

    this.#startDatepicker = flatpickr(startTimeInput, {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      defaultDate: this._state.startDate,
      onChange: (selectedDates) => {
        this.#startDateChangeHandler(selectedDates);
      },
    });

    this.#endDatepicker = flatpickr(endTimeInput, {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      defaultDate: this._state.endDate,
      minDate: this._state.startDate,
      onChange: (selectedDates) => {
        this.#endDateChangeHandler(selectedDates);
      },
    });
  }

  /**
  * Метод изменения даты начала поездки
  * @param {object} selectedDates Выбранная дата
  */
  #startDateChangeHandler(selectedDates) {
    if (selectedDates.length > 0) {
      this._state.startDate = selectedDates[0];
      this.#endDatepicker.set('minDate', this._state.startDate);
    }
  }

  /**
  * Метод изменения даты конца поездки
  * @param {object} selectedDates Выбранная дата
  */
  #endDateChangeHandler(selectedDates) {
    if (selectedDates.length > 0) {
      this._state.endDate = selectedDates[0];
    }
  }

  /**
   * Метод изменения данных точки маршрута в состояние
   * @param {object} task Данные задачи
   * @returns {object} Состояние компонента
   */
  static parseTaskToState(task) {
    return structuredClone(task);
  }

  /**
   * Метод изменения состояния в данные точки маршрута
   * @param {object} state Состояние компонента
   * @returns {object} Данные задачи
   */
  static parseStateToTask(state) {
    return structuredClone(state);
  }
}
