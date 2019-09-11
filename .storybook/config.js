import { addDecorator, configure } from '@storybook/html';
import { defineCustomElements } from '../dist/loader';
import '../dist/manifold/manifold.css';
import './theme-manifold.css';

// Init web components
defineCustomElements();

// Load stories (import all files ending in *.stories.js)
const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
