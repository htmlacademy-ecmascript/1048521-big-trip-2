import NewEventButtonView from './view/new-event-button-view.js';
import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import PointModel from './model/model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripElement = siteHeaderElement.querySelector('.trip-main');
const tripEventsSectionElement = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const tasksModel = new PointModel();
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter({boardContainer: siteHeaderTripElement});
headerPresenter.init();

const listPresenter = new ListPresenter({
  boardContainer: tripEventsSectionElement,
  tasksModel,
  filterModel,
  onNewTaskDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  tasksModel
});


const newTaskButtonComponent = new NewEventButtonView({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskFormClose() {
  newTaskButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  listPresenter.createTask();
  newTaskButtonComponent.element.disabled = true;
}

render(newTaskButtonComponent, siteHeaderTripElement, RenderPosition.BEFOREEND);

filterPresenter.init();

if(tasksModel.tasks.length){
  listPresenter.init();
}
