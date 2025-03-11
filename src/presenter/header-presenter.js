import TripInfoView from '../view/trip-info-view.js';
import {render, RenderPosition} from '../framework/render.js';

export default class ListPresenter {
  #boardContainer = null;
  #tripInfoComponent = new TripInfoView;

  constructor({boardContainer}) {
    this.#boardContainer = boardContainer;
  }

  init() {
    render(this.#tripInfoComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }
}
