import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * MSW Browser Worker
 * Sets up service worker to intercept network requests in the browser
 */
export const worker = setupWorker(...handlers);

