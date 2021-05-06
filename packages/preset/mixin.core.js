const { join } = require('path');
const { statSync } = require('fs');
const { colors } = require('util').inspect;
const visit = require('unist-util-visit');
const { isUrlRequest, urlToRequest } = require('loader-utils');
const { Mixin } = require('hops-mixin');

const { yellow, bold } = ['yellow', 'bold'].reduce(
  (acc, c) =>
    Object.assign(acc, {
      [c]: (str) => `\x1b[${colors[c][0]}m${str}\x1b[${colors[c][1]}m`,
    }),
  {}
);

const warn = (msg) =>
  // eslint-disable-next-line no-console
  console.warn(`${yellow(`${bold('[hops-mdx]')} ${msg}`)}\n`);

const yarnLockFileExists = (rootDir) => {
  try {
    return Boolean(statSync(join(rootDir, 'yarn.lock')));
  } catch (_) {
    return false;
  }
};

const requireMdPlugin = (usesYarn) => (plugin) => {
  try {
    if (Array.isArray(plugin)) {
      return [require(plugin[0])].concat(plugin.slice(1));
    }
    return require(plugin);
  } catch (_) {
    const cmd = usesYarn
      ? `yarn add ${plugin}`
      : `npm install --save ${plugin}`;
    warn(`You're trying to register "${plugin}",
but it's not installed. Run the following command to install it:

$ ${cmd}`);
    return null;
  }
};

const isImage = (node) =>
  node.tagName === 'img' && isUrlRequest(node.properties.src);

const imageComponent = (src, alt) => {
  const props = `{ src: ${src}, alt: '${alt}' }`;

  return `{(() => {
  const elem = components && components.img || 'img';
  return React.createElement(elem, ${props});
})()}`;
};

const imageToMdx = () => (root) =>
  visit(root, isImage, (node) => {
    const src = `require('${urlToRequest(node.properties.src)}')`;
    const alt = node.properties.alt || '';
    node.type = 'jsx';
    node.value = imageComponent(src, alt);
    delete node.properties;
    delete node.tagName;
  });

class HopsMdxMixin extends Mixin {
  configureBuild(_, { jsLoaderConfig, allLoaderConfigs }) {
    const usesYarn = yarnLockFileExists(this.config.rootDir);
    const { loader: babelLoader, options } = jsLoaderConfig;
    const remarkPlugins =
      this.config.mdx && Array.isArray(this.config.mdx.mdPlugins)
        ? this.config.mdx.mdPlugins
            .map(requireMdPlugin(usesYarn))
            .filter(Boolean)
        : [];
    const rehypePlugins = [imageToMdx];
    const mdxLoaderConfig = {
      test: /\.mdx?$/,
      use: [
        {
          loader: babelLoader,
          options,
        },
        {
          loader: require.resolve('@mdx-js/loader'),
          options: { remarkPlugins, rehypePlugins },
        },
      ],
    };
    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      mdxLoaderConfig
    );
  }
}

module.exports = HopsMdxMixin;
