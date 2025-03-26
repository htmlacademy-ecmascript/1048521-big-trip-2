import TripEventsListView from '../view/trip-events-list-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import NoTaskView from '../view/no-task-view.js';
import TripFormSortView from '../view/trip-form-sort-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem, sortTaskTime, sortTaskPrice} from '../utils.js';
import {SortType} from '../const.js';

/**
 * @class Класс для создания и управления списком точек маршрута
 */
export default class ListPresenter {
  #tasksModel = null;
  #boardContainer = null;
  #listComponent = new TripEventsListView;
  #boardTasks = [];
  #taskPresenters = new Map();
  #sortElement = null;
  #currentSortType = SortType.DAY;
  #sourcedBoardTasks = [];

  /**
   * @param {HTMLElement} boardContainer Контейнер для отображения списка точек маршрута
   * @param {Array} tasksModel Массив с данными для точек маршрута
   */
  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  /**
   * Метод, который инициализирует отображение точек маршрута
   */
  init() {
    this.#boardTasks = [...this.#tasksModel.getTasks()];
    this.#sourcedBoardTasks = [...this.#tasksModel.getTasks()];
    render(this.#listComponent, this.#boardContainer);
    this.#renderSort();
    if (this.#boardTasks.every((task) => task.isArchive)) {
      render(new NoTaskView(), this.#listComponent.element);
      remove(this.#sortElement);
    }
    this.#renderTaskList();
  }

  /**
   * Метод закрытия всех открытых форм
   */
  #handleModeChange = () => {
    this.#taskPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * Метод обновления точки маршрута
   * @param {object} updatedTask Обновленные данные
   */
  #handleTaskChange = (updatedTask) => {
    this.#boardTasks = updateItem(this.#boardTasks, updatedTask);
    this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
    this.#taskPresenters.get(updatedTask.id).init(updatedTask);
  };

  /**
   * Метод выбора специфичных типов сортировки
   * @param {string} sortType Тип сортировки
   */
  #sortTasks(sortType) {
    switch (sortType) {
      case 'date-time':
        this.#boardTasks.sort(sortTaskTime);
        break;
      case 'date-price':
        this.#boardTasks.sort(sortTaskPrice);
        break;
      case 'day':
      default:
        this.#boardTasks = [...this.#sourcedBoardTasks];
    }
    this.#currentSortType = sortType;
  }

  /**
   * Метод изменения типа сортировки
   * @param {string} sortType Тип сортировки
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTasks(sortType);
    this.#clearTaskList();
    this.#renderTaskList();
  };

  /**
   * Метод отрисовки точки маршрута
   */
  #renderSort() {
    this.#sortElement = new TripFormSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortElement, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  /**
   * Метод создания, отрисовки и инициализации точки маршрута
   * @param {object} task Данные для точки маршрута
   */
  #renderTask(task) {
    const taskPresenter = new PointPresenter({
      taskListContainer: this.#listComponent.element,
      onDataChange: this.#handleTaskChange,
      onModeChange: this.#handleModeChange
    });
    taskPresenter.init(task);
    this.#taskPresenters.set(task.id, taskPresenter);
  }

  /**
 * Функция, котрая рендерит список точек маршрута
 */
  #renderTaskList() {
    for (let i = 0; i < this.#boardTasks.length; i++) {
      this.#renderTask(this.#boardTasks[i]);
    }
  }

  /**
   * Метод очищения списка точек маршрута при помощи удаления презентеров
   */
  #clearTaskList() {
    this.#taskPresenters.forEach((presenter) => presenter.destroy());
    this.#taskPresenters.clear();
  }
}
