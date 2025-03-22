import {getRandomPoints, mockPoints} from '../mock/mock-points.js';
import {mockOffers} from '../mock/mock-offers.js';
import {mockDestinations} from '../mock/mock-destinations.js';

/**
 * Функция, которая объединяет данные точек маршрута в массив
 * @param {Array} points Массив точек маршрута
 * @param {object} offers Дополнительные опции точки маршрута
 * @param {Array} destinations Массив направлений
 * @returns {Array} Массив объединенных данных
 */
function mergeDataArrays(points, offers, destinations) {
  return points.map((point) => {
    const offerType = offers.find((offer) => offer.type === point.type);
    const additionalOffers = offerType ? offerType.offers : [];
    const filteredOffersDetails = additionalOffers.filter((offerDetail) =>
      point.offers.includes(offerDetail.id)
    );

    const destination = destinations.find((dest) => dest.id === point.destination);
    const destinationDetails = destination ? { name: destination.name, description: destination.description, pictures: destination.pictures } : null;

    const { dateFrom: startDate, dateTo: endDate, basePrice: basePrice, ...rest } = point;

    return {
      ...rest,
      offers: filteredOffersDetails,
      destinationDetails,
      startDate,
      endDate,
      basePrice
    };
  });
}

// массив случайных точек маршрута на основе данных
const MOCK_POINTS = Array.from({length: mockPoints.length}, getRandomPoints);

// данные точек маршрута, дополнительных опций и направлений
const mergedData = mergeDataArrays(MOCK_POINTS, mockOffers, mockDestinations);

/**
 * @class Класс для работы с данными точек маршрута
 */
export default class PointModel {
  #tasks = null;
  constructor() {
    this.#tasks = mergedData;
  }

  /**
   * Метод для получения массива точек маршрута
   */
  getTasks() {
    return this.#tasks;
  }
}
