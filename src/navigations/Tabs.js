import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home_screen/HomeScreen';
import Onboarding from '../screens/onboarding/Onboarding';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          backgroundColor: '#222232',
          height: Platform.OS === 'ios' ? 70 : 55,
          alignItems: 'center',
          padding: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'ios' ? 5 : 0,
              }}>
              <Image
                source={require('../images/tab/Home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'white',
                }}
              />
              <Text style={{color: focused ? 'blue' : 'white'}}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Onboarding}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'ios' ? 5 : 0,
              }}>
              <Image
                source={require('../images/tab/Discovery.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'white',
                }}
              />
              <Text style={{color: focused ? 'blue' : 'white'}}>Explore</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Standings"
        component={Onboarding}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'ios' ? 5 : 0,
              }}>
              <Image
                source={require('../images/tab/Chart.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'white',
                }}
              />
              <Text style={{color: focused ? 'blue' : 'white'}}>Standings</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={Onboarding}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'ios' ? 5 : 0,
              }}>
              <Image
                source={require('../images/tab/Profile.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'white',
                }}
              />
              <Text style={{color: focused ? 'blue' : 'white'}}>
                My Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
