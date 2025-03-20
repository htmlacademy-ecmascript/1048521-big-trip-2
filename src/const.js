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

export {TextNoEvent, ModeCode};
