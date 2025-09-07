import { Dashboard } from '@/views/dashboard';
import { PageLayout } from '@rns/components';

export function App(props: { name: string }) {
  return <PageLayout children={<Dashboard />} />;
}
