import TripEventsListView from '../view/trip-events-list-view.js';
import RoutPointView from '../view/route-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import RoutPointEditView from '../view/route-point-edit-view.js';
import RoutPointBoxView from '../view/route-point-box-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listComponent = new TripEventsListView;
  #taskEditComponent = null;
  #taskBoxComponent = null;
  #taskComponent = null;
  #task = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({taskListContainer, onDataChange, onModeChange}) {
    this.#listComponent = taskListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(task) {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;
    const prevTaskBoxComponent = this.#taskBoxComponent;

    this.#taskEditComponent = new RoutPointView({
      task: this.#task,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteForm: () => {
        this.#removeForm();
      }
    });

    this.#taskBoxComponent = new RoutPointBoxView({
      task: this.#task,
      onEditClick: () => {
        this.#replaceCardToForm();
      },
      onFavoriteClick: () => {
        this.#handleFavoriteClick();
      },
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
      // console.log(prevTaskComponent.element);
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#mode === Mode.DEFAULT) {
      console.log(this.#taskBoxComponent);
      replace(this.#taskBoxComponent, prevTaskBoxComponent);
    }

    if (this.#mode === Mode.EDITING) {
      console.log(this.#taskEditComponent);
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

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#taskEditComponent, this.#taskBoxComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#taskBoxComponent, this.#taskEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #handleFavoriteClick = () => {
    // console.log({...this.#task, isFavorite: !this.#task.isFavorite});
    this.#handleDataChange({...this.#task, isFavorite: !this.#task.isFavorite});
  };

  #handleFormSubmit = (task) => {
    this.#handleDataChange(task);
    this.#replaceFormToCard();
  };
}
