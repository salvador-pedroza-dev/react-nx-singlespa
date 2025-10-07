import React, { createElement } from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { App } from './app';
import './styles.scss';
import '@rns/i18n';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    console.error(err);
    return createElement('<div>Error: {err.message}</div>');
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
