import AbstractView from '../framework/view/abstract-view.js';

/**
 * Функция для получения разметки формы фильтров
 * @returns {string} Разметку формы фильтров
 */
function createTripFormFiltersTemplate() {
  return `<form class="trip-filters" action="#" method="get">
            <div class="trip-filters__filter">
              <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
              <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
            </div>
            <div class="trip-filters__filter">
              <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
              <label class="trip-filters__filter-label" for="filter-future">Future</label>
            </div>
            <div class="trip-filters__filter">
              <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
              <label class="trip-filters__filter-label" for="filter-present">Present</label>
            </div>

            <div class="trip-filters__filter">
              <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
              <label class="trip-filters__filter-label" for="filter-past">Past</label>
            </div>
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

/**
 * @class Класс для создания формы фильтров
 */
export default class TripFormFiltersView extends AbstractView {
  /**
   * Геттер для получения разметки формы фильтров
   * @returns {HTMLElement} Созданную форму фильтров
   */
  get template() {
    return createTripFormFiltersTemplate();
  }
}
