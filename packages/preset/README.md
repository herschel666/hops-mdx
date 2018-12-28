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

### Configuration

#### Preset Options

This preset can be configured through the `"aws"` key in your preset config.

```json
"hops": {
  "mdx": {
    "mdPlugins": […]
  }
}
```

| Name            | Type                                    | Required | Description                                                          |
| --------------- | --------------------------------------- | -------- | -------------------------------------------------------------------- |
| `mdx.mdPlugins` | `Array<String | Array<String, Object>>` | _no_     | Optional list of [Remark](https://github.com/wooorm/remark) plugins. |

##### `mdPlugins`

Pass in the module names of remark plugins. E.g. to enable [remark-emoji](https://www.npmjs.com/package/remark-emoji):

```json
{
  "mdx": {
    "mdPlugins": ["remark-emoji"]
  }
}
```

If the plugin provides the setting of options, you can pass in an array holding the plugin name and an options object, instead of just the name.

```json
{
  "mdx": {
    "mdPlugins": [["remark-emoji", { "padSpaceAfter": true }]]
  }
}
```
