import TripEventsListView from '../view/trip-events-list-view.js';
import RoutPointView from '../view/route-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import RoutPointEditView from '../view/route-point-edit-view.js';
import {ModeCode} from '../const.js';

/**
 * @class Класс для создания и управления точкой маршрута
 */
export default class PointPresenter {
  #listComponent = new TripEventsListView;
  #taskEditComponent = null;
  #taskComponent = null;
  #task = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = ModeCode.DEFAULT;

  /**
   * @param {HTMLElement} taskListContainer Контейнер для точек маршрута
   * @param {function} onDataChange Колбэк-функция, вызываемая при изменении точки маршрута
   * @param {function} onModeChange Колбэк-функция, вызываемая при изменении режима отображения
   */
  constructor({taskListContainer, onDataChange, onModeChange}) {
    this.#listComponent = taskListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  /**
   * Метод, который инициализирует отображение точки маршрута
   * @param {object} task Данные для точки маршрута
   */
  init(task) {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;

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

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#taskComponent, this.#listComponent);
      return;
    }

    if (this.#mode === ModeCode.DEFAULT) {
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#mode === ModeCode.EDITING) {
      replace(this.#taskEditComponent, prevTaskEditComponent);
    }
  }

  /**
  * Метод для удаления компонентов точки маршрута и формы редактирования
  */
  destroy() {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
  }

  /**
  * Метод для смены режима отображения на режим по умолчанию
  */
  resetView() {
    if (this.#mode !== ModeCode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  /**
  * Метод для замены точки маршрута на форму
  */
  #replaceCardToForm() {
    replace(this.#taskEditComponent, this.#taskComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = ModeCode.EDITING;
  }

  /**
  * Метод для замены формы на точку маршрута
  */
  #replaceFormToCard() {
    replace(this.#taskComponent, this.#taskEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = ModeCode.DEFAULT;
  }

  /**
  * Метод для удаления формы
  */
  #removeForm() {
    remove(this.#taskEditComponent);
  }

  /**
   * Метод обработки события нажатия клавиши Escape
   * @param {KeyboardEvent} evt Событие клавиатуры
   */
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  /**
   * Метод добавления/удаления точки маршрута в избранное
   */
  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#task, isFavorite: !this.#task.isFavorite});
  };

  /**
   * Метод обработки отправки формы
   * @param {object} task Данные точки маршрута
   */
  #handleFormSubmit = (task) => {
    this.#handleDataChange(task);
    this.#replaceFormToCard();
  };
}
