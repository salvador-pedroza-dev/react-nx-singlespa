export interface Bar {
  startDate: string;
  endDate: string;
  start: number;
  end: number;
  info: string;
  status: string;
}

export interface Data {
  pivot: string;
  bars: Bar[];
}
