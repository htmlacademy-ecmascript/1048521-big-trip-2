import TripEventsListView from '../view/trip-events-list-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import NoTaskView from '../view/no-task-view.js';
import TripFormSortView from '../view/trip-form-sort-view.js';
import PointPresenter from './point-presenter.js';

export default class ListPresenter {
  #tasksModel = null;
  #boardContainer = null;
  #listComponent = new TripEventsListView;
  #boardTasks = [];
  #sortElement = new TripFormSortView;

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.getTasks()];
    render(this.#listComponent, this.#boardContainer);
    this.#renderSort();
    if (this.#boardTasks.every((task) => task.isArchive)) {
      render(new NoTaskView(), this.#listComponent.element);
      remove(this.#sortElement);
      return;
    }
    for (let i = 0; i < this.#boardTasks.length; i++) {
      this.#renderTask(this.#boardTasks[i]);
    }
  }

  #renderSort() {
    render(this.#sortElement, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderTask(task) {
    const taskPresenter = new PointPresenter({
      taskListContainer: this.#listComponent.element,
    });
    taskPresenter.init(task);
  }
}
