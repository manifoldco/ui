import { h, Component, Element } from '@stencil/core';
import ClipboardJS from 'clipboard';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-data-copy-credentials' })
export class ManifoldDataCopyCredentials {
  @Element() el: HTMLElement;

  componentWillLoad() {
    // fetch creds here
    // Note: for linebreaks, you can use the HTML character &#10;
  }

  componentDidLoad() {
    new ClipboardJS('#copy-creds'); // eslint-disable-line no-new
  }

  @logger()
  render() {
    return (
      <button id="copy-creds" data-clipboard-text="# My Credentials&#10;Something">
        Copy
      </button>
    );
  }
}
