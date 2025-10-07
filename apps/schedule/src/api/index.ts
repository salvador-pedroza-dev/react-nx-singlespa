import { Data } from '@/types';
import moment from 'moment';
import { buildings } from '../consts';

export const dat = [
  {
    buildingId: buildings[0].id,
    buildingName: buildings[0].name,
    events: [
      {
        start: 1,
        end: 5,
        info: 'grocery delivery to local store',
        status: 'on-time',
      },
      {
        start: 8,
        end: 13,
        info: 'events of textiles to factory',
        status: 'warn',
      },
      {
        start: 17,
        end: 21,
        info: 'delivery of furniture to warehouse',
        status: 'completed',
      },
    ],
  },
  {
    buildingId: buildings[1].id,
    buildingName: buildings[1].name,
    events: [
      {
        start: 0,
        end: 3,
        info: 'initial pickup of supplies',
        status: 'completed',
      },
      {
        start: 6,
        end: 10,
        info: 'scheduled delivery of electronics',
        status: 'pending',
      },
    ],
  },
  {
    buildingId: buildings[2].id,
    buildingName: buildings[2].name,
    events: [
      {
        start: 3,
        end: 7,
        info: 'transport of raw materials',
        status: 'warn',
      },
      {
        start: 9,
        end: 14,
        info: 'delivery of appliances',
        status: 'scheduled',
      },
      {
        start: 18,
        end: 20,
        info: 'last delivery of the day',
        status: 'on-time',
      },
    ],
  },
  {
    buildingId: buildings[3].id,
    buildingName: buildings[3].name,
    events: [
      {
        start: 2,
        end: 4,
        info: 'delivery of construction materials',
        status: 'warn',
      },
      {
        start: 10,
        end: 18,
        info: 'bulk shipment to distribution center',
        status: 'scheduled',
      },
      {
        start: 22,
        end: 24,
        info: 'overnight delivery of perishables',
        status: 'pending',
      },
    ],
  },
  {
    buildingId: buildings[4].id,
    buildingName: buildings[4].name,
    events: [
      {
        start: 1,
        end: 5,
        info: 'scheduled delivery of office supplies',
        status: 'pending',
      },
      {
        start: 8,
        end: 13,
        info: 'delivery of clothing to store',
        status: 'completed',
      },
      {
        start: 17,
        end: 21,
        info: 'evening delivery of books',
        status: 'scheduled',
      },
    ],
  },
  {
    buildingId: buildings[5].id,
    buildingName: buildings[5].name,
    events: [
      {
        start: 0,
        end: 3,
        info: 'early morning delivery of food supplies',
        status: 'completed',
      },
      {
        start: 6,
        end: 10,
        info: 'delivery of electronics to retail',
        status: 'warn',
      },
      {
        start: 17,
        end: 24,
        info: 'late night delivery of machinery',
        status: 'pending',
      },
    ],
  },
  {
    buildingId: buildings[6].id,
    buildingName: buildings[6].name,
    events: [
      {
        start: 3,
        end: 7,
        info: 'delivery of automotive parts',
        status: 'scheduled',
      },
      {
        start: 9,
        end: 14,
        info: 'transport of medical supplies',
        status: 'completed',
      },
    ],
  },
  {
    buildingId: buildings[7].id,
    buildingName: buildings[7].name,
    events: [
      {
        start: 2,
        end: 4,
        info: 'delivery of landscaping materials',
        status: 'completed',
      },
      {
        start: 13,
        end: 21,
        info: 'afternoon delivery of furniture',
        status: 'pending',
      },
    ],
  },
];

export function getData(
  startDate: moment.Moment | null,
  endDate: moment.Moment | null
) {
  if (!startDate || !endDate) {
    return { data: [], dateList: [] };
  }
  const data: Data[] = [];
  const dateList = [];

  while (startDate.diff(endDate, 'days') !== 0) {
    dateList.push(moment(startDate.format()));
    startDate.add(1, 'days');
  }

  dateList.push(moment(startDate.format()));

  for (const i of dat) {
    const bars = [];
    for (let d = 0; d < dateList.length; d++) {
      const date = moment(dateList[d].format());
      for (const j of i.events) {
        bars.push({
          ...j,
          start: j.start + 24 * d,
          end: j.end + 24 * d,
          startDate: date.add(j.start, 'hour').format(),
          endDate: date.add(j.end - j.start, 'hour').format(),
        });
      }
    }
    data.push({
      pivot: i.buildingName,
      bars,
    });
  }

  return {
    data,
    dateList,
  };
}
