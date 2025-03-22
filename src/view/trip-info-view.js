import AbstractView from '../framework/view/abstract-view.js';

/**
 * Функция для получения разметки блока информации о поездке
 * @returns {string} Разметку блока информации о поездке
 */
function createTripInfoTemplate() {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
          </section>`;
}

/**
 * @class Класс для создания блока информации о поездке
 */
export default class TripInfoView extends AbstractView {
  /**
   * Геттер для получения разметки блока информации о поездке
   * @returns {HTMLElement} Созданную блок информации о поездке
   */
  get template() {
    return createTripInfoTemplate();
  }
}
