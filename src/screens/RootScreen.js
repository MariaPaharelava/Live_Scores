import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Onboarding from './onboarding/Onboarding';
import HomeScreen from './home_screen/HomeScreen';
import LoginScreen from './login_screen/LoginScreen';
import SportsSelectionScreen from './sportsselector_screen/SportsSelectionScreen';
import Tabs from '../navigations/Tabs';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Onboarding" component={Onboarding} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen
      name="SportsSelectionScreen"
      component={SportsSelectionScreen}
    />
    <RootStack.Screen name="HomeScreen" component={Tabs} />
  </RootStack.Navigator>
);

export default RootStackScreen;
