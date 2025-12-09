// import 'vite/client';
import '@mantine/core/styles.css';

import { notNull } from '@grbn/kit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ROARR } from 'roarr';

import { App } from './app';

ROARR.write = message => {
  const s = JSON.parse(message) as Record<string, unknown>;
  if (typeof s.message !== 'string') {
    throw new TypeError(`Invalid message format: ${message}`);
  }
  console.log(s.message);
};

createRoot(notNull(document.querySelector(`#root-app-id`))).render(
  <StrictMode>
    <App />
  </StrictMode>
);
