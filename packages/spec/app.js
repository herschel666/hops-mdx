import { render } from 'hops';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Content from './content.mdx';

import styles from './styles.css';

const H1 = ({ children }) => (
  <h1 className={styles.headline} id="hops-mdx">
    {children}
  </h1>
);
const Image = (props) => <img {...props} data-type="custom-image" />;

const components = {
  h1: H1,
};

export const App = () => (
  <>
    <Helmet>
      <title>Hops MDX Demo</title>
    </Helmet>
    <Switch>
      <Route
        path="/"
        exact={true}
        render={() => <Content components={components} />}
      />
      <Route
        path="/custom-image"
        strict={true}
        exact={true}
        render={() => <Content components={{ ...components, img: Image }} />}
      />
    </Switch>
  </>
);

export default render(<App />);
