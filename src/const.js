
/**
 * @enum {string} Перечисление сообщений в случае, когда точки маршрута отсутствуют
 */
const SortType = {
  DAY: 'day',
  DATE_TIME: 'date-time',
  DATE_PRICE: 'date-price',
};

/**
 * @enum {string} Перечисление сообщений в случае, когда точки маршрута отсутствуют
 */
const TextNoEvent = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

/**
 * @enum {string} Перечисление состояний точки маршрута
 */
const ModeCode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {TextNoEvent, ModeCode, SortType, UpdateType, UserAction};
