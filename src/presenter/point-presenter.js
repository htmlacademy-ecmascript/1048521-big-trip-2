import TripEventsListView from '../view/trip-events-list-view.js';
import RoutPointView from '../view/route-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import RoutPointEditView from '../view/route-point-edit-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listComponent = new TripEventsListView;
  #taskEditComponent = null;
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

    // const prevTaskComponent = this.#taskComponent;
    // const prevTaskEditComponent = this.#taskEditComponent;
    // const prevTaskBoxComponent = this.#taskBoxComponent;

    this.#taskEditComponent = new RoutPointEditView({
      task: this.#task,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteForm: () => {
        this.#removeForm();
      }
    });

    this.#taskComponent = new RoutPointView({
      task: this.#task,
      onEditClick: () => {
        this.#replaceCardToForm();
      },
      onFavoriteClick: () => {
        this.#handleFavoriteClick();
      },
    });

    // if (prevTaskComponent === null || prevTaskEditComponent === null || prevTaskBoxComponent === null) {
    render(this.#taskComponent, this.#listComponent);
    //   return;
    // }

    // if (this.#listComponent.contains(prevTaskComponent.element)) {
    //   replace(this.#taskComponent, prevTaskComponent);
    // }

    // if (this.#mode === Mode.DEFAULT) {
    //   replace(this.#taskBoxComponent, prevTaskBoxComponent);
    // }

    // if (this.#mode === Mode.EDITING) {
    //   replace(this.#taskEditComponent, prevTaskEditComponent);
    // }
  }

  destroy() {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#taskEditComponent, this.#taskComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#taskComponent, this.#taskEditComponent);
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
    this.#handleDataChange({...this.#task, isFavorite: !this.#task.isFavorite});
  };

  #handleFormSubmit = (task) => {
    this.#handleDataChange(task);
    this.#replaceFormToCard();
  };
}
