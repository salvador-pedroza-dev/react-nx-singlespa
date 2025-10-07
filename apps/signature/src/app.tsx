// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { Welcome } from './views/nx-welcome';
import { PageLayout } from '@rns/components';

export function App() {
  return <PageLayout children={<Welcome />}></PageLayout>;
}

export default App;
