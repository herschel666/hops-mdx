const mdx = require('@mdx-js/mdx');
const babel = require('@babel/core');
const { cosmiconfigSync } = require('cosmiconfig');

const defaultMdxConfig = { mdPlugins: [] };

const options = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'usage',
        corejs: 3,
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    require.resolve('@babel/plugin-transform-flow-strip-types'),
    require.resolve('babel-plugin-dynamic-import-node'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
  ],
  babelrc: false,
};

const js = String.raw;

const requirePlugin = (plugin) => {
  if (Array.isArray(plugin)) {
    return [require(plugin[0])].concat(plugin.slice(1));
  }
  return require(plugin);
};

module.exports.process = (src) => {
  const result = cosmiconfigSync('hops').search();
  const { config = defaultMdxConfig } = result;
  const remarkPlugins = config.mdx.mdPlugins.map(requirePlugin);

  try {
    const injectedJSX = js`import React from 'react';
import { mdx } from '@mdx-js/react';
${mdx.sync(src, { remarkPlugins })}`;

    // Transform ES6 with babel
    return babel.transformSync(injectedJSX, options).code;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
