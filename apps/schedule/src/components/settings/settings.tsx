import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useSchedule } from '@/store';
import { FormEvent, useState } from 'react';
import { Modal, TextField, Select, Button } from '@rns/components';
import { useTranslation } from 'react-i18next';
import { buildings } from '@/consts';

export function Settings() {
  const startDate = useSchedule((s) => s.startDate);
  const endDate = useSchedule((s) => s.endDate);
  const setStartDate = useSchedule((s) => s.setStartDate);
  const setEndDate = useSchedule((s) => s.setEndDate);
  const addEvent = useSchedule((s) => s.addEvent);
  const { t } = useTranslation('schedule');
  const [openModal, setOpenModal] = useState(false);
  const [building, setBuilding] = useState<string>();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [newStartDate, setNewStartDate] = useState<moment.Moment | null>(null);
  const [newEndDate, setNewEndDate] = useState<moment.Moment | null>(null);

  function createEvent(e: FormEvent) {
    e.preventDefault();
    addEvent(
      {
        id: Symbol(),
        name: eventName,
        description: eventDescription,
        startDate: newStartDate?.format() || '',
        endDate: newEndDate?.format() || '',
        status: '',
      },
      building || ''
    );
    setOpenModal(false);
  }

  return (
    <div className="flex gap-2 items-center justify-between mb-8">
      <div className="flex gap-3 items-center">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label={t('start_date')} value={startDate} onChange={setStartDate} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label={t('end_date')} value={endDate} onChange={setEndDate} />
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
            <div className="grid grid-cols-2 gap-6">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker label={t('start_time')} value={newStartDate} onChange={setNewStartDate} />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker label={t('end_time')} value={newEndDate} onChange={setNewEndDate} />
              </LocalizationProvider>
              <div>
                <TextField
                  id="event-name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  label={t('event_name')}
                  required
                />
              </div>
              <div>
                <TextField
                  id="event-description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  label={t('event_description')}
                  required
                />
              </div>
              <div>
                <Select
                  label={t('building')}
                  options={buildings.map((b) => ({
                    value: b.id.toString(),
                    label: b.name,
                  }))}
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  required
                ></Select>
              </div>
            </div>

            <div className="ml-auto flex gap-4 justify-end mt-6">
              <Button className="btn-primary" onClick={() => setOpenModal(false)} type="button">
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
