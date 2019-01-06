import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { App as BasicApp } from '../app';

const App = () => (
  <MemoryRouter>
    <BasicApp />
  </MemoryRouter>
);

describe('Demo (helper)', () => {
  it('should have the correct headline', () => {
    const { root } = renderer.create(<App />);
    const [headline] = root.findByProps({ id: 'hops-mdx' }).children;

    expect(headline).toBe('Hops-MDX!');
  });

  it('should have the MDX logo', () => {
    const { root } = renderer.create(<App />);
    const [
      {
        props: { src, alt },
      },
    ] = root.findAllByType('img');

    expect(src).toBe('./mdx-logo.svg');
    expect(alt).toBe('MDX Logo');
  });

  it('should have a random cat image', () => {
    const { root } = renderer.create(<App />);
    const [
      ,
      {
        props: { src, alt },
      },
    ] = root.findAllByType('img');

    expect(src).toBe('http://placekitten.com/300/200');
    expect(alt).toBe('Random cat');
  });

  it('should apply "remark-emoji" plugin', () => {
    const { root } = renderer.create(<App />);
    const [, { children }] = root.findAllByType('p');
    const text = children
      .filter((child) => {
        return typeof child === 'string';
      })
      .join(' ');

    expect(text.indexOf('👍') > -1).toBe(true);
  });

  it('should have three list items', () => {
    const { root } = renderer.create(<App />);
    const lis = root.findAllByType('li');

    expect(lis.length).toBe(3);
  });

  it('should have a link', () => {
    const { root } = renderer.create(<App />);
    const {
      children: [text],
    } = root.findByProps({ href: '#hops-mdx' });

    expect(text).toBe('is a link');
  });
});
