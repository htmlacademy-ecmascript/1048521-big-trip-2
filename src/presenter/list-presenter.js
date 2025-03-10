import TripEventsListView from '../view/trip-events-list-view.js';
import RoutPointView from '../view/route-point-view.js';
import {render} from '../framework/render.js';

export default class ListPresenter {
  listComponent = new TripEventsListView;

  constructor({boardContainer, tasksModel}) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(this.listComponent, this.boardContainer);

    for (let i = 0; i < this.boardTasks.length; i++) {
      render(new RoutPointView({task: this.boardTasks[i]}), this.listComponent.element);
    }
  }
}
