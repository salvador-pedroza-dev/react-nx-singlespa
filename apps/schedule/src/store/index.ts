import { create } from 'zustand';
import moment from 'moment';

export interface ScheduleState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface ScheduleActions {
  setStartDate: (date: moment.Moment | null) => void;
  setEndDate: (date: moment.Moment | null) => void;
}

export const useSchedule = create<ScheduleState & ScheduleActions>((set) => ({
  startDate: moment().add(-1, 'day'),
  endDate: moment().add(1, 'day'),
  setStartDate: (date: moment.Moment | null) => set({ startDate: date }),
  setEndDate: (date: moment.Moment | null) => set({ endDate: date }),
}));
