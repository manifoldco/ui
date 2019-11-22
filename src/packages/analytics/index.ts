import { AnalyticsEvent } from './types';

const endpoint = {
  local: 'http://analytics.arigato.tools/v1/events',
  stage: 'https://analytics.stage.manifold.co/v1/events',
  prod: 'https://analytics.manifold.co/v1/events',
};

interface AnalyticsOptions {
  env: 'local' | 'stage' | 'prod';
}

function stringifyProperties(evt: AnalyticsEvent) {
  return {
    ...evt,
    properties: Object.entries(evt.properties).reduce(
      (properties, [key, value]) => ({ ...properties, [key]: `${value}` }),
      {}
    ),
  };
}

/**
 * Report an error or analytics event to Manifold
 * @param {Object} eventData Event data to send to Manifold
 * @param {string} eventData.type 'event' or 'error'
 * @param {string} eventData.name name_of_event (lowercase with underscores)
 * @param {string} [eventData.description] User-readable description of this event
 * @param {Object} eventData.properties Free-form object of event properties (different names will require different properties)
 * @param {string} eventData.source Will be 'ui'
 * @param {Object} [options] Analytics options
 * @param {string} [options.env] 'prod' (default) or 'stage'
 */
export default function report(evt: AnalyticsEvent, options: AnalyticsOptions) {
  const url = endpoint[options.env];
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      ...stringifyProperties(evt),
      source: 'ui', // add source
    }),
  });
}

export function mark(el: HTMLElement, name: AnalyticsEvent['name']) {
  const markName = `${el.tagName}-${name}-start`;
  if (performance.getEntriesByName(markName, 'mark').length === 0) {
    performance.mark(markName);
  }
}

export function measure(el: HTMLElement, name: AnalyticsEvent['name']) {
  const startMarkName = `${el.tagName}-${name}-start`;
  const endMarkName = `${el.tagName}-${name}-end`;
  const startMarks = performance.getEntriesByName(startMarkName, 'mark');
  const endMarks = performance.getEntriesByName(endMarkName, 'mark');
  if (startMarks.length) {
    if (!endMarks.length) {
      performance.mark(endMarkName);
      const endMark = performance.getEntriesByName(endMarkName, 'mark')[0];
      return {
        duration: endMark.startTime - startMarks[0].startTime,
        firstReport: true,
      };
    }
    return {
      duration: endMarks[0].startTime - startMarks[0].startTime,
      firstReport: false,
    };
  }
  return null;
}
