import fetchMock from 'fetch-mock';
import report from './index';
import { ErrorEvent } from './types';

const stage = 'https://analytics.stage.manifold.co';
const prod = 'https://analytics.manifold.co';
const error: ErrorEvent = {
  type: 'error',
  name: 'Error',
  properties: {
    code: 'code',
    componentName: 'MANIFOLD-PRODUCT',
    message: 'message',
    uiVersion: '1.2.3',
  },
};

describe('analytics', () => {
  describe('env', () => {
    afterEach(() => fetchMock.restore());

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
    beforeEach(() => {
      fetchMock.mock(prod, {});
    });
    describe('error', () => {
      it('error', async () => {
        await report(error);
        expect(JSON.parse(fetchMock.calls()[0][1].body.toString())).toEqual(error);
      });
    });
  });
});
