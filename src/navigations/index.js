import React from 'react';
import {Provider} from 'react-redux';

import Routes from './Routes';
import configureStore from '../redux/store/store';
const store = configureStore();
const Providers = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default Providers;
