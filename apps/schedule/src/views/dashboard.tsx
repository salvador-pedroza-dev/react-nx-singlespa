import { GanttChart } from '@/components/gantt-chart/gantt-chart';
import { Settings } from '@/components/settings/settings';
import { getData } from '@/api';
import { useSchedule } from '@/store';

export function Dashboard() {
  const subHeaders: string[] = [];
  const dateToday = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(dateToday.getDate() + 7);
  const { startDate, endDate } = useSchedule();

  const data = getData(startDate, endDate);
  const headers: string[] = data.dateList.map((d) => d.format('L'));

  for (let i = 1; i < 25; i++) {
    subHeaders.push(i + ':00');
  }

  return (
    <>
      <Settings />
      <GanttChart
        headers={headers}
        subHeaders={subHeaders}
        columnSize={100}
        colUnits={4}
        data={data.data}
        from={dateToday.toISOString()}
        to={nextWeek.toISOString()}
      />
    </>
  );
}
