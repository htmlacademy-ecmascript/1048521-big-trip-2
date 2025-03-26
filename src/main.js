import NewEventButtonView from './view/new-event-button-view.js';
import TripFormFiltersView from './view/trip-form-filters-view.js.js';
import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import PointModel from './model/model.js';


const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripElement = siteHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsSectionElement = document.querySelector('.trip-events');

render(new NewEventButtonView(), siteHeaderTripElement, RenderPosition.BEFOREEND);

render(new TripFormFiltersView, tripControlsFiltersElement, RenderPosition.BEFOREEND);

const tasksModel = new PointModel();

const headerPresenter = new HeaderPresenter({boardContainer: siteHeaderTripElement});
headerPresenter.init();

const listPresenter = new ListPresenter({
  boardContainer: tripEventsSectionElement,
  tasksModel,
});

if(tasksModel.getTasks().length){
  listPresenter.init();
}
