import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from '../screens/onboarding/Onboarding';
import SignInScreen from '../screens/signin_screen/SignInScreen';
import SignUpScreen from '../screens/signup_screen/SignUpScreen';
const Stack = createStackNavigator();

const AuthStack = () => {
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  // let routeName;

  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true');
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   // AsyncStorage.clear();
  //   AsyncStorage.getItem('alreadyLaunched').then(value => {
  //     if (value == null) {
  //       console.log(value);

  //       setIsFirstLaunch(true);
  //     } else {
  //       console.log(value);

  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);

  // if (isFirstLaunch === null) {
  //   return null;
  // } else if (isFirstLaunch === true) {
  //   routeName = 'Onboarding';
  // } else {
  //   routeName = 'SignInScreen';
  // }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
