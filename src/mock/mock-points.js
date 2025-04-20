import {getRandomArrayElement} from '../utils.js';
import {nanoid} from 'nanoid';

const mockPoints = [
  {
    basePrice: 3000,
    dateFrom: '2025-04-19T10:00:00.000Z',
    dateTo: '2025-04-25T23:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: true,
    offers: ['b4c3e4e6-8877-88ce-b747-e556604fgd95'],
    type: 'flight'
  },
  {
    basePrice: 1000,
    dateFrom: '2025-04-21T10:00:00.000Z',
    dateTo: '2025-04-22T23:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: true,
    offers: ['b4c3e4e6-8877-88ce-b747-e556604fgd95'],
    type: 'flight'
  },
  {
    basePrice: 900,
    dateFrom: '2020-08-11T22:55:56.845Z',
    dateTo: '2020-08-11T23:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa35'
    ],
    type: 'taxi'
  },
  {
    basePrice: 600,
    dateFrom: '2024-08-30T22:55:56.845Z',
    dateTo: '2024-08-31T02:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baf67',
      'b4c3e4e6-9053-42ce-b747-e281314baf68'
    ],
    type: 'train'
  },
  {
    basePrice: 1500,
    dateFrom: '2022-01-07T22:55:56.845Z',
    dateTo: '2022-01-08T06:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: [],
    type: 'bus'
  },
  {
    basePrice: 1200,
    dateFrom: '2017-03-03T22:55:56.845Z',
    dateTo: '2017-03-04T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaf',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314fgd95'
    ],
    type: 'ship'
  },
  {
    basePrice: 1100,
    dateFrom: '2023-12-11T06:55:56.845Z',
    dateTo: '2023-12-12T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaf',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9077-42ce-b747-e281314fgd95'
    ],
    type: 'drive'
  },
  {
    basePrice: 400,
    dateFrom: '2005-04-18T15:55:56.845Z',
    dateTo: '2005-04-19T19:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaf',
    isFavorite: false,
    offers: [
      'b4c3e4e6-8877-42ce-b747-e281314fgd95'
    ],
    type: 'flight'
  },
  {
    basePrice: 2000,
    dateFrom: '2003-10-02T22:55:56.845Z',
    dateTo: '2003-10-03T23:30:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: true,
    offers: [
      'b4c3e4e6-8877-42ce-b747-e554314fgd95'
    ],
    type: 'check-in'
  },
  {
    basePrice: 780,
    dateFrom: '2020-09-01T22:55:56.845Z',
    dateTo: '2020-09-02T10:40:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: false,
    offers: [
      'b4c3e4e6-8877-42ce-b747-e556604fgd95'
    ],
    type: 'sightseeing'
  },
  {
    basePrice: 550,
    dateFrom: '2000-11-25T18:00:56.845Z',
    dateTo: '2000-11-26T20:10:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: true,
    offers: [
      'b4c3e4e6-8877-88ce-b747-e556604fgd95'
    ],
    type: 'restaurant'
  },
];

function getRandomPoints() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomPoints, mockPoints};
