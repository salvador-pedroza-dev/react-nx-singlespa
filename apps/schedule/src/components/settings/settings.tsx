import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useSchedule } from '@/store';
import { FormEvent, useState } from 'react';
import { Modal, TextField, Select, Button } from '@rns/components';
import { useTranslation } from 'react-i18next';

const buildings = [
  { id: 1, name: 'Summit Hall' },
  { id: 2, name: 'The Atrium' },
  { id: 3, name: 'Orion Center' },
  { id: 4, name: 'Nova Conference Hall' },
  { id: 5, name: 'Edgewood Tower' },
  { id: 6, name: 'The Foundry' },
  { id: 7, name: 'Innovation Hub' },
  { id: 8, name: 'Central Plaza' },
  { id: 9, name: 'Parkview Pavilion' },
  { id: 10, name: 'The Nexus' },
];

export function Settings() {
  const startDate = useSchedule((s) => s.startDate);
  const endDate = useSchedule((s) => s.endDate);
  const setStartDate = useSchedule((s) => s.setStartDate);
  const setEndDate = useSchedule((s) => s.setEndDate);
  const [newDate, setNewDate] = useState<moment.Moment | null>(null);
  const { t } = useTranslation('schedule');
  const [openModal, setOpenModal] = useState(false);

  function createEvent(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex gap-3">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label={t('start_date')}
            value={startDate}
            onChange={setStartDate}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label={t('end_date')}
            value={endDate}
            onChange={setEndDate}
          />
        </LocalizationProvider>
      </div>

      <Button onClick={() => setOpenModal(true)} className="btn-primary">
        <i className="material-symbols-outlined mr-1.5">add</i>
        {t('add_event')}
      </Button>

      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="card">
          <h1 className="mb-6 text-2xl"> {t('add_event')} </h1>
          <form onSubmit={(e) => createEvent(e)}>
            <div className="grid grid-cols-2 gap-4">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label={t('start_time')}
                  value={newDate}
                  onChange={setNewDate}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label={t('end_time')}
                  value={newDate}
                  onChange={setNewDate}
                />
              </LocalizationProvider>
              <div>
                <TextField id="event-name" label={t('event_name')} />
              </div>
              <div>
                <TextField
                  id="event-description"
                  label={t('event_description')}
                />
              </div>
              <div>
                <Select
                  label={t('building')}
                  options={buildings.map((b) => ({
                    value: b.id.toString(),
                    label: b.name,
                  }))}
                  value=""
                ></Select>
              </div>
            </div>

            <div className="ml-auto flex gap-4 justify-end mt-6">
              <Button
                className="btn-primary"
                onClick={() => setOpenModal(false)}
                type="button"
              >
                {t('close')}
              </Button>
              <Button type="submit" className="btn-primary">
                {t('create')}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
