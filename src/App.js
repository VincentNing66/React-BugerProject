import React, { Fragment } from 'react';
import './App.css';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <Fragment>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </Fragment>
  );
}

export default App;
