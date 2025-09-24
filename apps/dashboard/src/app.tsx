import { PageLayout } from '@rns/components';
import { NxWelcome } from '@/components/nx-welcome';

export function App(props: { name: string }) {
  return <PageLayout children={<NxWelcome />} />;
}
