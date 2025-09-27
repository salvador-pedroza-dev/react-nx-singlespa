// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { Welcome } from './nx-welcome';
import { PageLayout } from '@rns/components';

export function App() {
  return (
    <PageLayout children={<Welcome title="@rns/signature" />}></PageLayout>
  );
}

export default App;
