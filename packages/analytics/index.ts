import { AnalyticsEvent } from './types';

const endpoint = {
  stage: 'https://analytics.stage.manifold.co',
  prod: 'https://analytics.manifold.co',
};

interface AnalyticsOptions {
  env?: 'stage' | 'prod';
}

export default function report(
  evt: AnalyticsEvent,
  userOptions: AnalyticsOptions = { env: 'prod' }
) {
  const options: AnalyticsOptions = {
    env: 'prod',
    ...(userOptions || {}),
  };
  const url = endpoint[options.env || 'prod'];
  return fetch(url, { method: 'POST', body: JSON.stringify(evt) });
}
