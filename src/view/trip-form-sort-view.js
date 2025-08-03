import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

/**
 * Функция для получения разметки формы сортировки
 * @returns {string} Разметку формы сортировки
 */
function createTripFormSortTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
              <label class="trip-sort__btn" data-sort-type="${SortType.DAY} " for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label class="trip-sort__btn" data-sort-type="${SortType.DATE_TIME}" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
              <label class="trip-sort__btn" data-sort-type="${SortType.DATE_PRICE}" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;
}

/**
 * @class Класс для создания формы сортировки
 */
export default class TripFormSortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  /**
   * Геттер для получения разметки формы сортировки
   * @returns {HTMLElement} Созданную форму сортировки
   */
  get template() {
    return createTripFormSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'LABEL') {
      evt.preventDefault();
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
