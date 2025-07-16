import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/trip-form-filters-view.js';
import {filter} from '../utils.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tasksModel = null;
  #filterComponent = null;
  #listPresenter = null;

  constructor({filterContainer, filterModel, tasksModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tasks = this.#tasksModel.tasks || [];
    return Object.values(FilterType).map((type) => {
      let filteredTasks;
      try {
        filteredTasks = filter[type] ? filter[type](tasks) : [];
      } catch (error) {
        filteredTasks = [];
      }
      return {
        type,
        count: filteredTasks.length,
      };
    });
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    this.#listPresenter.resetSortType();
  };
}
