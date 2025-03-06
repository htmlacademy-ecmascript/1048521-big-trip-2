import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const DATE_FORMAT = 'MMM D';
dayjs.extend(utc);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs.utc(dueDate).format(DATE_FORMAT) : '';
}

export {getRandomArrayElement, humanizeTaskDueDate};
