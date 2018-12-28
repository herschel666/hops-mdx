# `hops-mdx`

[![npm](https://img.shields.io/npm/v/hops-mdx.svg)](https://www.npmjs.com/package/hops-mdx)

**Please see the [main Hops Readme](https://github.com/xing/hops/blob/master/README.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that brings [MDX](https://mdxjs.com/) support to your application.

### Installation

_This preset must be used together with the `hops-react` preset._

```bash
npm install --save hops-mdx
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project](https://github.com/xing/hops/tree/master#quick-start).

### Basic usage

Create a file `src/content.md`:

```mdx
# Hello World!

This **is** a _paragraph_.
```

Then import it as a component in your `src/app.js`:

```jsx
import React from 'react';
import { render } from 'hops';
import Content from './content.md';

export default render(<Content />);
```

This will render a single Hops page with the content:

```html
<h1>Hello World!</h1>
<p>This <strong>is</strong> a <em>paragraph</em>.</p>
```

For advanced usage, [check out the MDX documentation](https://mdxjs.com/).

### Registering plugins

MDX supports [Remark](https://github.com/wooorm/remark) plugins. To register them, define a `mdx.mdPlugins`-property on your [Hops configuration](https://github.com/xing/hops#configuration).

To e.g. enable [remark-emoji](https://www.npmjs.com/package/remark-emoji) support, add the following value to your Hops config:

```json
{
  "mdx": {
    "mdPlugins": ["remark-emoji"]
  }
}
```

`hops-mdx` will then convert emojis, marked by using the colon syntax (`:emoji:`), into real `UTF-8` emojis. You can also pass in options, if the plugin provides that feature:

```json
{
  "mdx": {
    "mdPlugins": [["remark-emoji", { "padSpaceAfter": true }]]
  }
}
```

Note that the plugin name and config object is wrapped into its own array!

### Testing

In order to enable you to test components properly, that import MDX, there's a helper that brings MDX support to your Jest environment.

#### Installation

```bash
npm install --save hops-mdx-jest
```

#### Usage

To use the helper, extend your Jest configuration. Assuming you're already using [`jest-preset-hops`](https://github.com/xing/hops/tree/master/packages/jest-preset), this should look like this:

```json
{
  "jest": {
    "preset": "jest-preset-hops",
    "transform": {
      "\\.mdx?$": "hops-mdx-jest"
    }
  }
}
```

Now your MDX components will e.g. be fully rendered into snapshot tests.
