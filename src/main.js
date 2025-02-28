import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripFormFiltersView from './view/trip-form-filters-view.js';
import {render, RenderPosition} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripElement = siteHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(new NewEventButtonView(), siteHeaderTripElement, RenderPosition.BEFOREEND);

render(new TripInfoView, siteHeaderTripElement, RenderPosition.AFTERBEGIN);


render(new TripFormFiltersView, tripControlsFiltersElement, RenderPosition.BEFOREEND);
