import AbstractView from '../framework/view/abstract-view.js';

/**
 * Функция для получения фильтра
 * @returns {string} Разметку фильтра
 */
function createFilterItemTemplate(filter, currentFilterType) {
  const {type} = filter;
  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
          </div>`;
}

/**
 * Функция для получения разметки формы фильтров
 * @returns {string} Разметку формы фильтров
 */
function createTripFormFiltersTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<form class="trip-filters" action="#" method="get">
            ${filterItemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

/**
 * @class Класс для создания формы фильтров
 */
export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  /**
   * Геттер для получения разметки формы фильтров
   * @returns {HTMLElement} Созданную форму фильтров
   */
  get template() {
    return createTripFormFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
