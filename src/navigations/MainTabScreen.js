import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home_screen/HomeScreen';
import ExploreScreen from '../screens/explore_screen/ExploreScreen';
import StandingsScreen from '../screens/standings_screen/StandingsScreen';
import ProfileScreen from '../screens/profile_screen/ProfileScreen';
import ActivityProfileScreen from '../screens/profile_screen/ActivityProfile';
import SettingsProfileScreen from '../screens/profile_screen/SettingsProfileScreen';
import EditProfileScreen from '../screens/profile_screen/EditProfileScreen';

import styles from './MainTabScreenStyles';
import CameraScreen from '../screens/profile_screen/CameraScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ActivityProfile"
      component={ActivityProfileScreen}
      options={{
        headerTitle: ' Activity',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="SettingsProfile"
      component={SettingsProfileScreen}
      options={{
        headerTitle: ' Settings',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: ' Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="Camera"
      component={CameraScreen}
      options={{
        headerTitle: 'Camera',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const MainTabScreen = ({navigation}) => {
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
            <View style={styles.container}>
              {focused ? (
                <View style={styles.button}>
                  <Text style={styles.text}>Home</Text>
                  <View style={styles.circle}></View>
                </View>
              ) : (
                <Image
                  source={require('../images/tab/Home.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: 'white',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? (
                <View style={styles.button}>
                  <Text style={styles.text}>Explore</Text>
                  <View style={styles.circle}></View>
                </View>
              ) : (
                <Image
                  source={require('../images/tab/Discovery.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: 'white',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Standings"
        component={StandingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? (
                <View style={styles.button}>
                  <Text style={styles.text}>Standings</Text>
                  <View style={styles.circle}></View>
                </View>
              ) : (
                <Image
                  source={require('../images/tab/Chart.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: 'white',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? (
                <View style={styles.button}>
                  <Text style={styles.text}>My Profile</Text>
                  <View style={styles.circle}></View>
                </View>
              ) : (
                <Image
                  source={require('../images/tab/Profile.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: 'white',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
