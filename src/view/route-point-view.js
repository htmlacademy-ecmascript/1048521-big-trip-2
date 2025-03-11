import AbstractView from '../framework/view/abstract-view.js';


function createRoutPointTemplate(task, cbForm, cbBox) {
  const {type, offers, startDate, endDate, basePrice} = task;
  const additionalContentForm = typeof cbForm === 'function' ? cbForm(type, offers, startDate, endDate, basePrice) : '';
  const additionalContentBox = typeof cbBox === 'function' ? cbBox(task) : '';

  return `<li class="trip-events__item">
            ${additionalContentBox}
            ${additionalContentForm}
          </li>`;
}

export default class RoutPointView extends AbstractView {
  #task = null;
  #cbForm = null;
  #cbBox = null;

  constructor({task, cbForm, cbBox}) {
    super();
    this.#task = task;
    this.#cbForm = cbForm;
    this.#cbBox = cbBox;
  }

  get template() {
    return createRoutPointTemplate(this.#task, this.#cbForm, this.#cbBox);
  }
}
