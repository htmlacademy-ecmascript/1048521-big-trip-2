import AbstractView from '../framework/view/abstract-view.js';

/**
 * Функция получения разметки контейнера точек маршрута
 * @returns {string} Разметку списка
 */
function createTripEventsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

/**
 * @class Класс для создания пустого контейнера
 */
export default class TripEventsListView extends AbstractView {
  /**
   * Геттер для получения разметки контейнера точек маршрута
   * @returns {HTMLElement} Созданный контейнер
   */
  get template() {
    return createTripEventsListTemplate();
  }
}
