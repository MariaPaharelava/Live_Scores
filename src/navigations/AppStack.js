import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SportSelectionScrenen from '../screens/sportsselector_screen/SportsSelectionScreen';
import MainTabScreen from '../navigations/MainTabScreen';

const AppStack = createStackNavigator();

const AppStackScreen = ({navigation}) => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen
      name="SportSelectionScrenen"
      component={SportSelectionScrenen}
    />
    <AppStack.Screen name="MainTabScreen" component={MainTabScreen} />
  </AppStack.Navigator>
);

export default AppStackScreen;
