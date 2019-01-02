import React from 'react';
import renderer from 'react-test-renderer';
import testFileStub from 'jest-preset-hops/mocks/file';

import { App } from '../app';

describe('Demo', () => {
  it('should have the correct headline', () => {
    const { root } = renderer.create(<App />);
    const [headline] = root.findByProps({ id: 'hops-mdx' }).children;

    expect(headline).toBe('Hops-MDX!');
  });

  it('should have the MDX logo', () => {
    const { root } = renderer.create(<App />);
    const {
      props: { src },
    } = root.findByType('img');

    expect(src).toBe(testFileStub);
  });

  it('should have the <strong> element', () => {
    const { root } = renderer.create(<App />);
    const {
      children: [text],
    } = root.findByType('strong');

    expect(text).toBe('world');
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
