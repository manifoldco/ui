import { addDecorator, configure } from '@storybook/html';
import { defineCustomElements } from '../dist/loader';
import '../dist/manifold/manifold.css';
import { addReadme } from 'storybook-readme/html';

// Init web components
defineCustomElements();

// storybook-readme
addDecorator(addReadme);

// Load stories (import all files ending in *.stories.js)
const req = require.context('../stories', true, /\.stories\.js$/);
// Specify order here. You don’t have to include all stories, but if you don’t, it’ll appear… somewhere 🤷‍
const storiesOrder = [
  'manifold-marketplace',
  'manifold-product',
  'manifold-plan-selector',
  'manifold-toast',
  'manifold-resource-credentials',
  'manifold-resource-status',
  'manifold-data-product-name',
  'manifold-data-product-logo',
  'manifold-data-resource-list',
  'manifold-data-provision-button',
  'manifold-data-manage-button',
];

function lookup(filename) {
  const index = storiesOrder.findIndex(name => filename.indexOf(name) !== -1);
  return index !== -1 ? index : Number.MAX_SAFE_INTEGER;
}

function loadStories() {
  req
    .keys()
    .sort((a, b) => lookup(a) - lookup(b))
    .forEach(filename => req(filename));
}

configure(loadStories, module);
