import { ScheduleRoot } from '@/views/schedule-root';
import { PageLayout } from '@rns/components';

export function App(props: { name: string }) {
  return <PageLayout children={<ScheduleRoot />} />;
}
