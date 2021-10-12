import React from 'react';
import Providers from './navigations/index';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return <Providers />;
};

export default App;
