import { Dashboard } from '@/views/dashboard';
import './styles.scss';

export function App(props: { name: string }) {
  return (
    <section>
      <h1> Schedule </h1>
      <Dashboard />
    </section>
  );
}
