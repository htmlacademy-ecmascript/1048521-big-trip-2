import TripEventsListView from '../view/trip-events-list-view.js';
import RoutPointView from '../view/route-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import RoutPointEditView from '../view/route-point-edit-view.js';
import RoutPointBoxView from '../view/route-point-box-view.js';


export default class PointPresenter {
  #listComponent = new TripEventsListView;
  #taskEditComponent = null;
  #taskBoxComponent = null;
  #taskComponent = null;
  #task = null;

  constructor({taskListContainer}) {
    this.#listComponent = taskListContainer;
  }

  init(task) {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;
    const prevTaskBoxComponent = this.#taskBoxComponent;

    this.#taskEditComponent = new RoutPointEditView({
      task: this.#task,
      onFormSubmit: () => {
        this.#replaceFormToCard();
      },
      onDeleteForm: () => {
        this.#removeForm();
      }
    });

    this.#taskBoxComponent = new RoutPointBoxView({
      task: this.#task,
      onEditClick: () => {
        this.#replaceCardToForm();
      }
    });

    this.#taskComponent = new RoutPointView({
      task: this.#task,
      taskEditComponent: this.#taskEditComponent,
      taskBoxComponent: this.#taskBoxComponent,
    });

    if (prevTaskComponent === null || prevTaskEditComponent === null || prevTaskBoxComponent === null) {
      render(this.#taskComponent, this.#listComponent);
      render(this.#taskBoxComponent, this.#taskComponent.element);
      return;
    }

    if (this.#listComponent.contains(prevTaskComponent.element)) {
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#listComponent.contains(prevTaskEditComponent.element)) {
      replace(this.#taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
    remove(prevTaskBoxComponent);
  }

  destroy() {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
    remove(this.#taskBoxComponent);
  }

  #replaceCardToForm() {
    replace(this.#taskEditComponent, this.#taskBoxComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#taskBoxComponent, this.#taskEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #removeForm() {
    remove(this.#taskEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
