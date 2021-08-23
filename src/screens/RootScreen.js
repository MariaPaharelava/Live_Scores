import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Onboarding from './onboarding/Onboarding';
import SignInScreen from './signin_screen/SignInScreen';
import SignUpScreen from './signup_screen/SignUpScreen';
import SportsSelectionScreen from './sportsselector_screen/SportsSelectionScreen';
import Tabs from '../navigations/MainTabScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Onboarding" component={Onboarding} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen
      name="SportsSelectionScreen"
      component={SportsSelectionScreen}
    />
    <RootStack.Screen name="HomeScreen" component={Tabs} />
  </RootStack.Navigator>
);

export default RootStackScreen;
