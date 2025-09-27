import './style.css';
import { registerApplication, start } from 'single-spa';

async function loadApp(appName: string) {
  const m = await import(/* @vite-ignore */ appName);

  if (m) {
    return m;
  } else {
    console.log(m);
    return await import(/* @vite-ignore */ appName);
  }
}

registerApplication({
  name: '@rns/schedule',
  app: async () => await loadApp('@rns/schedule'),
  activeWhen: ['/schedule'],
});

registerApplication({
  name: '@rns/dashboard',
  app: async () => await loadApp('@rns/dashboard'),
  activeWhen: (location) =>
    location.pathname === '/' || location.pathname === '/dashboard',
});

registerApplication({
  name: '@rns/signature',
  app: async () => await loadApp('@rns/signature'),
  activeWhen: ['/signature'],
});

start({
  urlRerouteOnly: true,
});
