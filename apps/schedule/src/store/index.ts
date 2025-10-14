import { create } from 'zustand';
import moment from 'moment';
import { Row, Bar } from '@/types';
import { getData } from '@/api';

type Table = {
  rows: Row[];
  headers: string[];
  subHeaders: string[];
};
export interface ScheduleState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  table?: Table;
}

export interface ScheduleActions {
  setStartDate: (date: moment.Moment | null) => void;
  setEndDate: (date: moment.Moment | null) => void;
  setEvents: (rows: Table) => void;
  getEvents: () => void;
  addEvent: (event: Bar, rowId: string) => void;
}

export const useSchedule = create<ScheduleState & ScheduleActions>(
  (set, get) => ({
    startDate: moment().startOf('day'),
    endDate: moment().startOf('day').add(1, 'day'),
    rows: undefined,

    setStartDate: (date: moment.Moment | null) => {
      set({ startDate: date });
      get().getEvents();
    },
    setEndDate: (date: moment.Moment | null) => set({ endDate: date }),
    setEvents: (table: Table) => set({ table }),
    getEvents: () => {
      const res = getData(get().startDate, get().endDate);
      const headers: string[] = res.dateList.map((d: moment.Moment) =>
        d.format('L')
      );
      const subHeaders: string[] = [];
      for (let i = 1; i < 25; i++) {
        subHeaders.push(i + ':00');
      }
      set({ table: { rows: res.data, headers, subHeaders } });
    },
    addEvent: (event: Bar, rowId: string) => {
      const table = get().table;
      if (table) {
        const row = table.rows.find((r) => r.id === rowId);
        if (row) {
          row.bars.push(event);
          const newTable = JSON.parse(JSON.stringify(table));
          set({ table: newTable });
        }
      }
    },
  })
);
