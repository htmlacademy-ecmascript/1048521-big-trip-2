import TripEventsListView from '../view/trip-events-list-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import NoTaskView from '../view/no-task-view.js';
import TripFormSortView from '../view/trip-form-sort-view.js';
import PointPresenter from './point-presenter.js';
import NewTaskPresenter from './new-task-presenter.js';
import {sortTaskTime, sortTaskPrice} from '../utils.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils.js';

/**
 * @class Класс для создания и управления списком точек маршрута
 */
export default class ListPresenter {
  #tasksModel = null;
  #boardContainer = null;
  #listComponent = new TripEventsListView;
  #taskPresenters = new Map();
  #sortElement = null;
  #currentSortType = SortType.DAY;
  #noTaskComponent = null;
  #loadMoreButtonComponent = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #newTaskPresenter = null;

  /**
   * @param {HTMLElement} boardContainer Контейнер для отображения списка точек маршрута
   * @param {Array} tasksModel Массив с данными для точек маршрута
   */
  constructor({boardContainer, tasksModel, filterModel, onNewTaskDestroy}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#tasksModel.addObserver(this.#handleModelEvent);

    this.#newTaskPresenter = new NewTaskPresenter({
      taskListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTaskDestroy
    });
  }

  /**
  * Метод для получения массива точек маршрута
  * @returns {object} Список точек маршрута из модели
  */
  get tasks() {
    this.#filterType = this.#filterModel.filter;
    const tasks = this.#tasksModel.tasks;
    const filteredTasks = filter[this.#filterModel.filter](tasks);

    switch (this.#currentSortType) {
      case 'date-time':
        return filteredTasks.sort(sortTaskTime);
      case 'date-price':
        return filteredTasks.sort(sortTaskPrice);
    }
    return filteredTasks;
  }

  /**
   * Метод, который инициализирует отображение точек маршрута
   */
  init() {
    this.#renderBoard();
  }

  createTask() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTaskPresenter.init();
  }

  /**
   * Метод закрытия всех открытых форм
   */
  #handleModeChange = () => {
    if (this.#newTaskPresenter) {
      this.#newTaskPresenter.destroy();
    }
    this.#taskPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#tasksModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#tasksModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#tasksModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#taskPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };


  /**
   * Метод изменения типа сортировки
   * @param {string} sortType Тип сортировки
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  /**
   * Метод сортировки точек маршрута
   */
  #renderSort() {
    this.#sortElement = new TripFormSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortElement, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  }

  /**
   * Метод создания, отрисовки и инициализации точки маршрута
   * @param {object} task Данные для точки маршрута
   */
  #renderTask(task) {
    const taskPresenter = new PointPresenter({
      taskListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    taskPresenter.init(task);
    this.#taskPresenters.set(task.id, taskPresenter);
  }

  /**
 * Функция, котрая рендерит список точек маршрута
 */
  #renderTaskList() {
    for (let i = 0; i < this.tasks.length; i++) {
      this.#renderTask(this.tasks[i]);
    }
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#taskPresenters.forEach((presenter) => presenter.destroy());
    this.#taskPresenters.clear();
    remove(this.#sortElement);
    remove(this.#noTaskComponent);
    remove(this.#loadMoreButtonComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
    render(this.#listComponent, this.#boardContainer);

    if (this.tasks.length === 0) {
      this.#noTaskComponent = new NoTaskView({
        filterType: this.#filterType
      });
      render(this.#noTaskComponent, this.#listComponent.element);
      remove(this.#sortElement);
      return;
    }

    this.#renderSort();
    this.#renderTaskList();
  }

  resetSortType() {
    this.#currentSortType = SortType.DAY;
    this.#clearBoard();
    this.#renderBoard();
  }
}
