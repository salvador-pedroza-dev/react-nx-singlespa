import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSchedule } from '@/store';

export function Settings() {
  const { startDate, endDate, setStartDate, setEndDate } = useSchedule();
  return (
    <div className="mb-5 flex gap-2">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker label="Start" value={startDate} onChange={setStartDate} />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker label="End" value={endDate} onChange={setEndDate} />
      </LocalizationProvider>
    </div>
  );
}
