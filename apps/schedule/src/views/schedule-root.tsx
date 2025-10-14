import { GanttChart } from '@/components/gantt-chart/gantt-chart';
import { Settings } from '@/components/settings/settings';
import { useSchedule } from '@/store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function ScheduleRoot() {
  const table = useSchedule((state) => state.table);
  const getEvents = useSchedule((state) => state.getEvents);
  const startDate = useSchedule((s) => s.startDate);
  const { t } = useTranslation('schedule');

  useEffect(() => {
    getEvents();
  }, []);

  function ganttChart() {
    if (table) {
      return (
        <GanttChart
          headers={table.headers}
          subHeaders={table.subHeaders}
          columnSize={100}
          colUnits={4}
          data={table.rows}
          startDate={startDate || undefined}
        />
      );
    }
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="text-3xl">{t('title')}</h1>
      <div className="card">
        <Settings />
        {ganttChart()}
      </div>
      {/* <div className="card flex-1">{ganttChart()}</div> */}
    </div>
  );
}
