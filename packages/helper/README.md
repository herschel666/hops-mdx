# `hops-mdx-jest`

[![npm](https://img.shields.io/npm/v/hops-mdx-jest.svg)](https://www.npmjs.com/package/hops-mdx-jest)

This is a helper that brings MDX support to the Jest enviroment of your Hops application and should be used alongside [`jest-preset-hops`](https://github.com/xing/hops/tree/master/packages/jest-preset).

## Installation

```bash
npm install --save hops-mdx-jest
```

## Usage

To use the helper, extend your Jest configuration like this:

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
