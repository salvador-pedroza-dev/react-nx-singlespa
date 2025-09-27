import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSchedule } from '@/store';
import { useState } from 'react';
import { Modal } from '@rns/components';

export function Settings() {
  const startDate = useSchedule((s) => s.startDate);
  const endDate = useSchedule((s) => s.endDate);
  const setStartDate = useSchedule((s) => s.setStartDate);
  const setEndDate = useSchedule((s) => s.setEndDate);

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex gap-3">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label="Start" value={startDate} onChange={setStartDate} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label="End" value={endDate} onChange={setEndDate} />
        </LocalizationProvider>
      </div>

      <button onClick={() => setOpenModal(true)} className="btn-primary">
        <i className="material-symbols-outlined mr-1.5">add</i>
        Add Event
      </button>

      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="card">
          <div className="flex">
            <div>
              <label htmlFor="event-name" className="block">
                Event name
              </label>
              <input
                id="event-name"
                type="text"
                className="border border-outline rounded-sm p-2 w-3xs"
              />
            </div>
            <div>
              <label>Event name</label>
              <input type="text" className="w-24" />
            </div>
          </div>

          <button
            className="btn-primary ml-auto"
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
