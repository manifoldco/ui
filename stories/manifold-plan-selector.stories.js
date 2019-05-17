import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-plan-selector.md';

storiesOf('Plan Selector', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'Blitline',
    () => '<manifold-plan-selector product-label="blitline"></manifold-plan-selector>'
  )
  .add('LogDNA', () => '<manifold-plan-selector product-label="logdna"></manifold-plan-selector>')
  .add('Mailgun', () => '<manifold-plan-selector product-label="mailgun"></manifold-plan-selector>')
  .add(
    'JawsDB',
    () => '<manifold-plan-selector product-label="jawsdb-mysql"></manifold-plan-selector>'
  )
  .add(
    'Memcachier',
    () => '<manifold-plan-selector product-label="memcachier-cache"></manifold-plan-selector>'
  )
  .add(
    'Prefab.cloud',
    () => '<manifold-plan-selector product-label="prefab"></manifold-plan-selector>'
  )
  .add(
    'Ximilar Image Recognition',
    () => '<manifold-plan-selector product-label="custom-recognition"></manifold-plan-selector>'
  )
  .add(
    'Ximilar Tagging',
    () => '<manifold-plan-selector product-label="generic-tagging"></manifold-plan-selector>'
  )
  .add('Zerosix', () => '<manifold-plan-selector product-label="zerosix"></manifold-plan-selector>')
  .add('Ziggeo', () => '<manifold-plan-selector product-label="ziggeo"></manifold-plan-selector>');
