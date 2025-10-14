import { Bar } from '@/types';
import moment from 'moment';
import { buildings } from '../consts';

const ev: Bar[] = [];
export const data = [
  {
    buildingId: buildings[0].id,
    buildingName: buildings[0].name,
    events: ev,
  },
  {
    buildingId: buildings[1].id,
    buildingName: buildings[1].name,
    events: ev,
  },
  {
    buildingId: buildings[2].id,
    buildingName: buildings[2].name,
    events: ev,
  },
  {
    buildingId: buildings[3].id,
    buildingName: buildings[3].name,
    events: ev,
  },
  {
    buildingId: buildings[4].id,
    buildingName: buildings[4].name,
    events: ev,
  },
  {
    buildingId: buildings[5].id,
    buildingName: buildings[5].name,
    events: ev,
  },
  {
    buildingId: buildings[6].id,
    buildingName: buildings[6].name,
    events: ev,
  },
  {
    buildingId: buildings[7].id,
    buildingName: buildings[7].name,
    events: ev,
  },
];

export function getData(startDate: moment.Moment | null, endDate: moment.Moment | null) {
  if (!startDate || !endDate) {
    return { data: [], dateList: [] };
  }
  const tableData = [];
  const dateList = [];

  const sDate = startDate.clone();

  while (sDate.diff(endDate, 'days') !== 0) {
    dateList.push(moment(sDate.format()));
    sDate.add(1, 'days');
  }

  dateList.push(moment(sDate.format()));

  for (const i of data) {
    tableData.push({
      label: i.buildingName,
      id: i.buildingId,
      bars: i.events,
    });
  }

  return {
    data: tableData,
    dateList,
  };
}
