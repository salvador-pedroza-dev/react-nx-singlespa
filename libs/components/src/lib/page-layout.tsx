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
      <aside
        className=" bg-surface p-2 bg"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <ul className="flex gap-1 flex-col">
          {routes.map((r) => (
            <li
              className={r.route === route ? selected : ''}
              key={`route-${r.route}`}
            >
              <a
                className="flex justify-center items-center h-12"
                href={`/${r.route}`}
                onClick={() => setRoute(r.route)}
                aria-label={r.label}
                aria-current={r.route === route ? 'page' : undefined}
              >
                <i className="material-symbols-outlined" aria-hidden="true">
                  {r.icon}
                </i>
                <span className="sr-only">{r.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="p-4 overflow-auto" role="main">
        {children}
      </main>
    </div>
  );
}
