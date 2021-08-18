import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import {TAB_IMAGES} from '../images/Images';

import HomeScreen from '../screens/home_screen/HomeScreen';
import ExploreScreen from '../screens/explore_screen/ExploreScreen';
import StandingsScreen from '../screens/standings_screen/StandingsScreen';
import ProfileScreen from '../screens/profile_screen/profile/ProfileScreen';
import ActivityProfileScreen from '../screens/profile_screen/activity/ActivityProfileScreen';
import SettingsProfileScreen from '../screens/profile_screen/settings/SettingsProfileScreen';
import EditProfileScreen from '../screens/profile_screen/edit/EditProfileScreen';
import DetailTeamScreen from '../screens/detailteam_screen/DetailTeamScreen';
import StandingsDetailScreen from '../screens/standingsdetail_screen/StandingsDetailScreen';
import styles from './MainTabScreenStyles';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#181829',
        shadowColor: '#181829',
        elevation: 0,
      },
    }}>
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
      }}
    />
    <Stack.Screen
      name="SettingsProfile"
      component={SettingsProfileScreen}
      options={{
        headerTitle: ' Settings',
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: ' Edit Profile',
      }}
    />
  </Stack.Navigator>
);
const HomeStack = ({navigation, route}) => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#181829',
        shadowColor: '#181829',
        elevation: 0,
      },
    }}>
    <Stack.Screen
      name="Home Screen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="DetailTeam"
      component={DetailTeamScreen}
      options={{
        headerTitle: route.headerTitle,
      }}
    />
    <Stack.Screen
      name="StandingsDetail"
      component={StandingsDetailScreen}
      options={({route}) => ({
        title: route.params.title,
      })}
    />
  </Stack.Navigator>
);

const StandingsStack = ({navigation, route}) => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#181829',
        shadowColor: '#181829',
        elevation: 0,
      },
    }}>
    <Stack.Screen
      name="Standings Screen"
      component={StandingsScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="StandingsDetail"
      component={StandingsDetailScreen}
      options={({route}) => ({
        title: route.params.title,
      })}
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
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? (
                <View style={styles.button}>
                  <Text style={styles.text}>Home</Text>
                  <View style={styles.circle} />
                </View>
              ) : (
                <Image
                  source={TAB_IMAGES.HOME_IMAGE}
                  resizeMode="contain"
                  style={styles.image}
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
                  <View style={styles.circle} />
                </View>
              ) : (
                <Image
                  source={TAB_IMAGES.DISCOVERY_IMAGE}
                  resizeMode="contain"
                  style={styles.image}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Standings"
        component={StandingsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? (
                <View style={styles.button}>
                  <Text style={styles.text}>Standings</Text>
                  <View style={styles.circle} />
                </View>
              ) : (
                <Image
                  source={TAB_IMAGES.CHART_IMAGE}
                  resizeMode="contain"
                  style={styles.image}
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
                  <View style={styles.circle} />
                </View>
              ) : (
                <Image
                  source={TAB_IMAGES.PROFILE_IMAGE}
                  resizeMode="contain"
                  style={styles.image}
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
