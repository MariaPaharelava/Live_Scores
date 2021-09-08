import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStackNavigator} from '@react-navigation/stack';
import SportSelectionScrenen from '../screens/sportsselector_screen/SportsSelectionScreen';
import MainTabScreen from '../navigations/MainTabScreen';

const AppStack = createStackNavigator();

const AppStackScreen = ({navigation}) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === 'false') {
        // AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(false);
      } else {
        setIsFirstLaunch(true);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'SportSelectionScrenen';
  } else {
    routeName = 'MainTabScreen';
  }
  return (
    <AppStack.Navigator initialRouteName={routeName}>
      <AppStack.Screen
        name="SportSelectionScrenen"
        component={SportSelectionScrenen}
        options={{header: () => null}}
      />
      <AppStack.Screen
        name="MainTabScreen"
        component={MainTabScreen}
        options={{header: () => null}}
      />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
