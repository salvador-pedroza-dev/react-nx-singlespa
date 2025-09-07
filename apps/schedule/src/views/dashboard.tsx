import { GanttChart } from '@/components/gantt-chart/gantt-chart';
import { Settings } from '@/components/settings/settings';
import { getData } from '@/api';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
    <>
      <Typography variant="h4" gutterBottom>
        Schedule
      </Typography>
      <Card sx={{ boxShadow: 0, borderRadius: 4, mb: 2 }}>
        <CardContent>
          <Settings />
        </CardContent>
      </Card>
      <Card sx={{ boxShadow: 0, borderRadius: 4 }}>
        <CardContent>
          <GanttChart
            headers={headers}
            subHeaders={subHeaders}
            columnSize={100}
            colUnits={4}
            data={data.data}
            from={dateToday.toISOString()}
            to={nextWeek.toISOString()}
          />
        </CardContent>
      </Card>
    </>
  );
}
