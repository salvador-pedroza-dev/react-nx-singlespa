import { GanttChart } from '@/components/gantt-chart/gantt-chart';
import { Settings } from '@/components/settings/settings';
import { useSchedule } from '@/store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const events = useSchedule((state) => state.events);
  const getEvents = useSchedule((state) => state.getEvents);
  const { t } = useTranslation('schedule');

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
      <h1 className="text-3xl">{t('title')}</h1>
      <div className="card border border-outline-variant">
        <Settings />
      </div>
      <div className="card border border-outline-variant flex-1">
        {ganttChart()}
      </div>
    </div>
  );
}
