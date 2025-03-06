import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808h',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa35'
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baf67',
      'b4c3e4e6-9053-42ce-b747-e281314baf68'
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a280fc',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaf',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314fgd95'
    ],
    type: 'ship'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eecda2808c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaf',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9077-42ce-b747-e281314fgd95'
    ],
    type: 'drive'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-44eec4a2808c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaf',
    isFavorite: false,
    offers: [
      'b4c3e4e6-8877-42ce-b747-e281314fgd95'
    ],
    type: 'flight'
  },
  {
    id: 'f4b62090-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: false,
    offers: [
      'b4c3e4e6-8877-42ce-b747-e554314fgd95'
    ],
    type: 'check-in'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94ddc4a2808c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: false,
    offers: [
      'b4c3e4e6-8877-42ce-b747-e556604fgd95'
    ],
    type: 'sightseeing'
  },
  {
    id: 'f4b62509-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcas',
    isFavorite: false,
    offers: [
      'b4c3e4e6-8877-88ce-b747-e556604fgd95'
    ],
    type: 'restaurant'
  },
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoints};
