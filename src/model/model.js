import {getRandomPoints} from '../mock/mock-points.js';
import {mockOffers} from '../mock/mock-offers.js';
import {mockDestinations} from '../mock/mock-destinations.js';


function mergeDataArrays(points, offers, destinations) {
  return points.map((point) => {
    const offerType = offers.find((offer) => offer.type === point.type);
    const additionalOffers = offerType ? offerType.offers : [];
    const filteredOffersDetails = additionalOffers.filter((offerDetail) =>
      point.offers.includes(offerDetail.id)
    );

    const destination = destinations.find((dest) => dest.id === point.destination);
    const destinationDetails = destination ? { name: destination.name, description: destination.description, pictures: destination.pictures } : null;

    const { date_from: startDate, date_to: endDate, base_price: basePrice, ...rest } = point;

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

const MOCK_POINTS = Array.from({length: 4}, getRandomPoints);

const mergedData = mergeDataArrays(MOCK_POINTS, mockOffers, mockDestinations);

export default class PointModel {
  tasks = null;
  constructor() {
    this.tasks = mergedData;
  }

  getTasks() {
    return this.tasks;
  }
}
