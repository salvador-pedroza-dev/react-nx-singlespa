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
  name: '@single-spa/schedule',
  app: async () => await loadApp('@salvador/schedule'),
  activeWhen: ['/'],
});

start({
  urlRerouteOnly: true,
});
