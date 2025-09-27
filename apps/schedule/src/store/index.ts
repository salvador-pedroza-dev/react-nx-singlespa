import { create } from 'zustand';
import moment from 'moment';
import { Data } from '@/types';
import { getData } from '@/api';

type Events = {
  data: Data[];
  headers: string[];
  subHeaders: string[];
};
export interface ScheduleState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  events?: Events;
}

export interface ScheduleActions {
  setStartDate: (date: moment.Moment | null) => void;
  setEndDate: (date: moment.Moment | null) => void;
  setEvents: (data: Events) => void;
  getEvents: () => void;
}

export const useSchedule = create<ScheduleState & ScheduleActions>(
  (set, get) => ({
    startDate: moment().add(-1, 'day'),
    endDate: moment().add(1, 'day'),
    events: undefined,

    setStartDate: (date: moment.Moment | null) => {
      set({ startDate: date });
      get().getEvents();
    },
    setEndDate: (date: moment.Moment | null) => set({ endDate: date }),
    setEvents: (events: Events) => set({ events }),
    getEvents: () => {
      const res = getData(get().startDate, get().endDate);
      const headers: string[] = res.dateList.map((d: moment.Moment) =>
        d.format('L')
      );
      const subHeaders: string[] = [];
      for (let i = 1; i < 25; i++) {
        subHeaders.push(i + ':00');
      }
      set({ events: { data: res.data, headers, subHeaders } });
    },
  })
);
