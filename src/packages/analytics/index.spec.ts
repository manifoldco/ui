import fetchMock from 'fetch-mock';
import report from './index';
import { ErrorEvent } from './types';

const local = 'begin:https://analytics.arigato.tools';
const stage = 'begin:https://analytics.stage.manifold.co';
const prod = 'begin:https://analytics.manifold.co';
const error: ErrorEvent = {
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
      await report(error);
      expect(fetchMock.called(prod)).toBe(true);
    });
  });

  describe('type', () => {
    beforeEach(() => fetchMock.mock(prod, {}));

    describe('error', () => {
      it('error', async () => {
        await report(error);
        const res = fetchMock.calls()[0][1];
        expect(res && res.body && JSON.parse(res.body.toString())).toEqual(error);
      });
    });
  });
});
