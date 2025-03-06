import {TASK_COUNT} from '../const.js';
import {getRandomPoints} from '../mock/mock-points.js';
import {getRandomOffers} from '../mock/mock-offers.js';
import {getRandomDestinations} from '../mock/mock-destinations.js';

export default class PointModel {
  tasks = Array.from({length: TASK_COUNT}, getRandomPoints);

  getTasks() {
    return this.tasks;
  }
}
