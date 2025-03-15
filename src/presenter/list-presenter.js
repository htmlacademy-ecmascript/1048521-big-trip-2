import TripEventsListView from '../view/trip-events-list-view.js';
import RoutPointView from '../view/route-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import RoutPointEditView from '../view/route-point-edit-view.js';
import RoutPointBoxView from '../view/route-point-box-view.js';
import NoTaskView from '../view/no-task-view.js';

export default class ListPresenter {
  #tasksModel = null;
  #boardContainer = null;
  #listComponent = new TripEventsListView;
  #boardTasks = [];

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.getTasks()];
    render(this.#listComponent, this.#boardContainer);
    if (this.#boardTasks.every((task) => task.isArchive)) {
      render(new NoTaskView(), this.#listComponent.element);
      return;
    }
    for (let i = 0; i < this.#boardTasks.length; i++) {
      this.#renderTask(this.#boardTasks[i]);
    }
  }

  #renderTask(task) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const taskEditComponent = new RoutPointEditView({
      task,
      onFormSubmit: () => {
        replaceFormToCard();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onDeleteForm: () => {
        removeForm();
      }
    });

    const taskBoxComponent = new RoutPointBoxView({
      task,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const taskComponent = new RoutPointView({
      task,
      taskEditComponent,
      taskBoxComponent,
    });

    render(taskComponent, this.#listComponent.element);
    render(taskBoxComponent, taskComponent.element);

    function replaceCardToForm() {
      replace(taskEditComponent, taskBoxComponent);
    }

    function replaceFormToCard() {
      replace(taskBoxComponent, taskEditComponent);
    }

    function removeForm() {
      remove(taskEditComponent);
    }
  }
}
