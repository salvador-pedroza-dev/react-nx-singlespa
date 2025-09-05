import { Data } from '@/types';
import moment from 'moment';

export const dat = [
  {
    truckId: 'truck 1',
    deliveries: [
      {
        start: 1,
        end: 5,
        info: 'grocery delivery to local store',
        status: 'on-time',
      },
      {
        start: 8,
        end: 13,
        info: 'deliveries of textiles to factory',
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
    truckId: 'truck 2',
    deliveries: [
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
    truckId: 'truck 3',
    deliveries: [
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
    truckId: 'truck 4',
    deliveries: [
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
    truckId: 'truck 5',
    deliveries: [
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
    truckId: 'truck 6',
    deliveries: [
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
    truckId: 'truck 7',
    deliveries: [
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
    truckId: 'truck 8',
    deliveries: [
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

export function getData(startDate: string, endDate: string) {
  const sDate = moment(startDate);
  const data: Data[] = [];
  const dateList = [];

  while (sDate.diff(endDate, 'days') !== 0) {
    dateList.push(moment(sDate.format()));
    sDate.add(1, 'days');
  }

  dateList.push(moment(sDate.format()));

  for (const i of dat) {
    const bars = [];
    for (let d = 0; d < dateList.length; d++) {
      const date = moment(dateList[d].format());
      for (const j of i.deliveries) {
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
      pivot: i.truckId,
      bars,
    });
  }

  return {
    data,
    dateList,
  };
}
