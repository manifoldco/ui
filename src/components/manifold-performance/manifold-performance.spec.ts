import { newSpecPage } from '@stencil/core/testing';
import { ManifoldPerformance } from './manifold-performance';

const ddLogs = {
  addLoggerGlobalContext: jest.fn(),
  init: jest.fn(),
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
};

(global as any).MutationObserver = class {
  disconnect() {}
  observe() {}
};

describe('<manifold-performance>', () => {
  it('calls DataDog init when DD is ready', async () => {
    const page = await newSpecPage({
      components: [ManifoldPerformance],
      html: `<manifold-performance></manifold-performance>`,
    });
    page.rootInstance.ddLogs = ddLogs;
    await page.waitForChanges();
    expect(ddLogs.init).toHaveBeenCalled();
    expect(ddLogs.addLoggerGlobalContext).toHaveBeenCalledWith('browser-source', 'manifold-ui');
  });
  it('listens for events and logs details to DataDog', async () => {
    const page = await newSpecPage({
      components: [ManifoldPerformance],
      html: `<manifold-performance></manifold-performance>`,
    });
    page.rootInstance.ddLogs = ddLogs;
    await page.waitForChanges();
    dispatchEvent(new CustomEvent('manifold-error', { detail: { message: 'error test' } }));
    expect(ddLogs.logger.error).toHaveBeenCalledWith('manifold-error', {
      type: 'manifold-error',
      message: 'error test',
    });
  });
  it('queues events and logs them once DataDog is available', async () => {
    const page = await newSpecPage({
      components: [ManifoldPerformance],
      html: `<manifold-performance></manifold-performance>`,
    });
    dispatchEvent(
      new CustomEvent('manifold-error', {
        detail: { message: 'error message before DD_LOGS is available' },
      })
    );
    page.rootInstance.ddLogs = ddLogs;
    await page.waitForChanges();
    expect(ddLogs.logger.error).toHaveBeenCalledWith('manifold-error', {
      type: 'manifold-error',
      message: 'error message before DD_LOGS is available',
    });
  });
  it('strips token and expiry from receiveManifoldToken events', async () => {
    const page = await newSpecPage({
      components: [ManifoldPerformance],
      html: `<manifold-performance></manifold-performance>`,
    });
    page.rootInstance.ddLogs = ddLogs;
    await page.waitForChanges();
    dispatchEvent(
      new CustomEvent('receiveManifoldToken', {
        detail: { token: 'token', expiry: 123, duration: 456 },
      })
    );
    expect(ddLogs.logger.info).toHaveBeenCalledWith('receiveManifoldToken', {
      type: 'receiveManifoldToken',
      duration: 456,
    });
  });
  it('logs receiveManifoldToken event as an error if error field exists', async () => {
    const page = await newSpecPage({
      components: [ManifoldPerformance],
      html: `<manifold-performance></manifold-performance>`,
    });
    page.rootInstance.ddLogs = ddLogs;
    await page.waitForChanges();
    dispatchEvent(
      new CustomEvent('receiveManifoldToken', {
        detail: {
          token: 'token',
          expiry: 123,
          duration: 456,
          error: { code: 500, message: 'error message' },
        },
      })
    );
    expect(ddLogs.logger.error).toHaveBeenCalledWith('receiveManifoldToken', {
      type: 'receiveManifoldToken',
      duration: 456,
      error: { code: 500, message: 'error message' },
    });
  });
});
