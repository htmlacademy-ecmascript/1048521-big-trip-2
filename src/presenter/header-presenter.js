import TripInfoView from '../view/trip-info-view.js';
import {render, RenderPosition} from '../render.js';

export default class ListPresenter {
  tripInfoComponent = new TripInfoView;

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.tripInfoComponent, this.boardContainer, RenderPosition.AFTERBEGIN);
  }
}
