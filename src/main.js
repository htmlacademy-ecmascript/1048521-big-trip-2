import NewEventButtonView from './view/new-event-button-view.js';
import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import PointModel from './model/model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripElement = siteHeaderElement.querySelector('.trip-main');
const tripEventsSectionElement = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

render(new NewEventButtonView(), siteHeaderTripElement, RenderPosition.BEFOREEND);

const tasksModel = new PointModel();
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter({boardContainer: siteHeaderTripElement});
headerPresenter.init();

const listPresenter = new ListPresenter({
  boardContainer: tripEventsSectionElement,
  tasksModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  tasksModel
});

filterPresenter.init();

if(tasksModel.tasks.length){
  listPresenter.init();
}
