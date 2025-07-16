import {remove, render, RenderPosition} from '../framework/render.js';
import RoutPointEditView from '../view/route-point-edit-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';
import { mockDestinations } from '../mock/mock-destinations';

export default class NewTaskPresenter {
  #taskListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #taskEditComponent = null;
  #task = null;
  #isDestroying = false;

  constructor({taskListContainer, onDataChange, onDestroy}) {
    this.#taskListContainer = taskListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#taskEditComponent !== null) {
      return;
    }

    const defaultTask = {
      id: nanoid(),
      type: 'flight',
      basePrice: 0,
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),
      destination: 'Amsterdam',
      offers: [],
      isFavorite: false,
      destinationDetails: {
        description: '',
        pictures: [],
      },
    };

    this.#taskEditComponent = new RoutPointEditView({
      task: defaultTask,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onFormClose: this.#handleDeleteClick,
    });

    render(this.#taskEditComponent, this.#taskListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#taskEditComponent === null || this.#isDestroying) {
      return;
    }

    this.#isDestroying = true;

    this.#handleDestroy();

    remove(this.#taskEditComponent);
    this.#taskEditComponent = null;
    this.#task = null;
    this.#isDestroying = false;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    const newTask = { id: nanoid(), ...task };
    this.#task = newTask;
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      newTask,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    if (this.#task && this.#task.id) {
      this.#handleDataChange(
        UserAction.DELETE_TASK,
        UpdateType.MINOR,
        this.#task,
      );
    }
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
