import TripEventsListView from '../view/trip-events-list-view.js';
import RoutPointView from '../view/route-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  listComponent = new TripEventsListView;

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.listComponent, this.boardContainer);

    for (let i = 0; i < 3; i++) {
      render(new RoutPointView(), this.listComponent.getElement());
    }
  }
}
