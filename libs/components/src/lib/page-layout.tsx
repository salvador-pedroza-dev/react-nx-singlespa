import { useState, ReactNode, useEffect } from 'react';
import './page-layout.scss';
interface Props {
  children: ReactNode;
  title?: string;
  showAppBar?: boolean;
}

export function PageLayout({ children }: Props) {
  const [route, setRoute] = useState('');

  useEffect(() => {
    const path = window.location.pathname.split('/');
    setRoute(path[1]);
  }, []);

  const routes = [
    {
      route: '',
      icon: 'home',
      label: 'Home',
    },
    {
      route: 'schedule',
      icon: 'schedule',
      label: 'Schedule',
    },
    {
      route: 'signature',
      icon: 'signature',
      label: 'Signature',
    },
  ];

  const selected = 'bg-primary-container rounded-lg';

  return (
    <div id="page-layout" className="h-dvh grid grid-cols-(--layout-grid-cols)">
      <aside className="border-r border-outline-variant bg-surface p-2 bg">
        <ul className="flex gap-1  flex-col">
          {routes.map((r) => (
            <li
              className={r.route === route ? selected : ''}
              key={`route-${r.route}`}
            >
              <a
                className="flex justify-center items-center h-12"
                href={`/${r.route}`}
                onClick={() => setRoute(r.route)}
              >
                <i className="material-symbols-outlined">{r.icon}</i>
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="p-4 overflow-auto">{children}</main>
    </div>
  );
}
