import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import {IMAGES, TAB_IMAGES} from '../images/Images';

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
const tabRender = (view, focused) => {
  let title;
  let icon;
  switch (view) {
    case 'home':
      title = 'Home';
      icon = TAB_IMAGES.HOME_IMAGE;
      break;
    case 'explore':
      title = 'Explore';
      icon = TAB_IMAGES.DISCOVERY_IMAGE;
      break;

    case 'standings':
      title = 'Standings';
      icon = TAB_IMAGES.CHART_IMAGE;
      break;

    case 'profile':
      title = 'Profile';
      icon = TAB_IMAGES.PROFILE_IMAGE;
      break;

    default:
      break;
  }
  return (
    <View style={styles.container}>
      {focused ? (
        <View style={styles.button}>
          <Text style={styles.text}>{title}</Text>
          <View style={styles.circle} />
        </View>
      ) : (
        <Image source={icon} resizeMode="contain" style={styles.image} />
      )}
    </View>
  );
};

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
          tabBarIcon: ({focused}) => tabRender('home', focused),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => tabRender('explore', focused),
        }}
      />
      <Tab.Screen
        name="Standings"
        component={StandingsStack}
        options={{
          tabBarIcon: ({focused}) => tabRender('standings', focused),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => tabRender('profile', focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
