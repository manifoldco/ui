import { AnalyticsEvent } from './types';

const endpoint = {
  stage: 'https://analytics.stage.manifold.co',
  prod: 'https://analytics.manifold.co',
};

interface AnalyticsOptions {
  env?: 'stage' | 'prod';
}

/**
 * Report an error or analytics event to Manifold
 * @param {Object} eventData Event data to send to Manifold
 * @param {string} eventData.type 'event' or 'error'
 * @param {string} eventData.name name_of_event (lowercase with underscores)
 * @param {string} [eventData.description] User-readable description of this event
 * @param {Object} eventData.properties Free-form object of event properties (different names will require different properties)
 * @param {Object} [options] Analytics options
 * @param {string} [options.env] 'prod' (default) or 'stage'
 */
export default function report(
  evt: AnalyticsEvent,
  userOptions: AnalyticsOptions = { env: 'prod' }
) {
  const options: AnalyticsOptions = {
    env: 'prod',
    ...(userOptions || {}),
  };
  const url = endpoint[options.env || 'prod'];
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      ...evt,
      source: 'ui', // add source
    }),
  });
}
