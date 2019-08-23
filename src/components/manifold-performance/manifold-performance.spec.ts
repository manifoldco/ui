import { newSpecPage } from '@stencil/core/testing';
import { ManifoldPerformance } from './manifold-performance';

const ddLogs = {
  addLoggerGlobalContext: jest.fn(),
  init: jest.fn(),
  logger: {
    info: jest.fn(),
  },
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
    expect(ddLogs.logger.info).toHaveBeenCalledWith('manifold-error', {
      message: 'error test',
    });
  });
});
