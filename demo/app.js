import { render } from 'hops';
import React from 'react';
import Helmet from 'react-helmet';
import Content from './content.mdx';
import styles from './styles.css';

const components = {
  h1: ({ children }) => (
    <h1 className={styles.headline} id="hops-mdx">
      {children}
    </h1>
  ),
};

export const App = () => (
  <>
    <Helmet>
      <title>Hops MDX Demo</title>
    </Helmet>
    <Content components={components} />
  </>
);

export default render(<App />);
