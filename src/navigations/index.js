import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../redux/store/store';

import Routes from './Routes';
const store = configureStore();

const Providers = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default Providers;
