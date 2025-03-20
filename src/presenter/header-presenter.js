import TripInfoView from '../view/trip-info-view.js';
import {render, RenderPosition} from '../framework/render.js';

/**
 * @class Класс для создания и управления шапки проета
 */
export default class ListPresenter {
  #boardContainer = null;
  #tripInfoComponent = new TripInfoView;

  /**
   * @param {HTMLElement} boardContainer Контейнер для отображения шапки проекта
   */
  constructor({boardContainer}) {
    this.#boardContainer = boardContainer;
  }

  /**
   * Метод инициализации отображения шапки проекта
   */
  init() {
    render(this.#tripInfoComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }
}
