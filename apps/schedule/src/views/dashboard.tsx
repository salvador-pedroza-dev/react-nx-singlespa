import { GanttChart } from '@/components/gantt-chart/gantt-chart';
import { getData } from '@/api';

export function Dashboard() {
  const subHeaders: string[] = [];
  const dateToday = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(dateToday.getDate() + 7);

  const data = getData(dateToday.toDateString(), nextWeek.toDateString());
  const headers: string[] = data.dateList.map((d) => d.format('L'));

  for (let i = 1; i < 25; i++) {
    subHeaders.push(i + ':00');
  }

  return (
    <GanttChart
      headers={headers}
      subHeaders={subHeaders}
      columnSize={100}
      colUnits={4}
      data={data.data}
      from={dateToday.toISOString()}
      to={nextWeek.toISOString()}
    />
  );
}
