import React from 'react';
import {Provider} from 'react-redux';

import Routes from './Routes';

import {store, persistor, sagaMiddleware} from '../redux/store/store';
import rootSaga from '../redux/sagas/index';
import {PersistGate} from 'redux-persist/integration/react';
sagaMiddleware.run(rootSaga);

const Providers = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default Providers;
