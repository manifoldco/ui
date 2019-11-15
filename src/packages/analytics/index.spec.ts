import fetchMock from 'fetch-mock';
import report from './index';
import { AnalyticsEvent } from './types';

const local = 'begin:http://analytics.arigato.tools';
const stage = 'begin:https://analytics.stage.manifold.co';
const prod = 'begin:https://analytics.manifold.co';
const metric: AnalyticsEvent = {
  type: 'metric',
  name: 'rtt_graphql',
  properties: {
    componentName: 'MANIFOLD_PRODUCT',
    duration: 123,
    uiVersion: '1.2.3',
  },
  source: 'ui',
};
const error: AnalyticsEvent = {
  type: 'error',
  name: 'ui_error',
  properties: {
    code: 'code',
    componentName: 'MANIFOLD-PRODUCT',
    message: 'message',
    uiVersion: '1.2.3',
  },
  source: 'ui',
};

describe('analytics', () => {
  describe('env', () => {
    afterEach(fetchMock.restore);

    it('local', async () => {
      fetchMock.mock(local, {});
      await report(error, { env: 'local' });
      expect(fetchMock.called(local)).toBe(true);
    });

    it('stage', async () => {
      fetchMock.mock(stage, {});
      await report(error, { env: 'stage' });
      expect(fetchMock.called(stage)).toBe(true);
    });

    it('prod', async () => {
      fetchMock.mock(prod, {});
      await report(error, { env: 'prod' });
      expect(fetchMock.called(prod)).toBe(true);
    });
  });

  describe('type', () => {
    beforeEach(() => fetchMock.mock(prod, {}));
    afterEach(fetchMock.restore);

    describe('error', () => {
      it('error', async () => {
        await report(error, { env: 'prod' });
        const res = fetchMock.calls()[0][1];
        expect(res && res.body && JSON.parse(res.body.toString())).toEqual(error);
      });

      it('metric', async () => {
        await report(metric, { env: 'prod' });
        const res = fetchMock.calls()[0][1];
        expect(res && res.body && JSON.parse(res.body.toString())).toEqual({
          ...metric,
          properties: {
            ...metric.properties,
            duration: '123', // numbers should submit as strings
          },
        });
      });
    });
  });
});
