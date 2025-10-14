export interface Bar {
  id: string | symbol;
  startDate: string;
  endDate: string;
  start?: number;
  end?: number;
  description?: string;
  name: string;
  status: string;
}

export interface Row {
  label: string;
  id: string;
  bars: Bar[];
}
