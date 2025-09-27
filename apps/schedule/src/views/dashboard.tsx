import { GanttChart } from '@/components/gantt-chart/gantt-chart';
import { Settings } from '@/components/settings/settings';
import { useSchedule } from '@/store';
import { useEffect } from 'react';

export function Dashboard() {
  const events = useSchedule((state) => state.events);
  const getEvents = useSchedule((state) => state.getEvents);

  useEffect(() => {
    getEvents();
  }, []);

  function ganttChart() {
    if (events) {
      return (
        <GanttChart
          headers={events.headers}
          subHeaders={events.subHeaders}
          columnSize={100}
          colUnits={4}
          data={events.data}
        />
      );
    }
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="text-3xl">Schedule</h1>
      <div className="border border-outline-variant bg-surface p-3 rounded-md">
        <Settings />
      </div>
      <div className="border border-outline-variant bg-surface p-3 rounded-md flex-1">
        {ganttChart()}
      </div>
    </div>
  );
}
