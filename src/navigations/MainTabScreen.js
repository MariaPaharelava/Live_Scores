import React, {useState, useEffect} from 'react';
import {View, Text, Image, Platform, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import {ADMIN_IMAGES, TAB_IMAGES} from '../images/Images';

import HomeScreen from '../screens/home_screen/HomeScreen';
import ExploreScreen from '../screens/explore_screen/ExploreScreen';
import StandingsScreen from '../screens/standings_screen/StandingsScreen';
import ProfileScreen from '../screens/profile_screen/profile/ProfileScreen';
import SettingsProfileScreen from '../screens/profile_screen/settings/SettingsProfileScreen';
import EditProfileScreen from '../screens/profile_screen/edit/EditProfileScreen';
import DetailTeamScreen from '../screens/detailteam_screen/DetailTeamScreen';
import StandingsDetailScreen from '../screens/standingsdetail_screen/StandingsDetailScreen';
import LeaguesScreen from '../adminscreens/leagues/LeaguesScreen';
import ActivityProfileScreen from '../screens/profile_screen/activity/ActivityProfileScreen.js';
import AddLeaguesScreen from '../adminscreens/leagues/AddLeaguesScreen';
import EditLeaguesScreen from '../adminscreens/leagues/EditLeaguesScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Indicator from '../component/ActivityIndicator';
import Error from '../component/ErrorIndicator';
import ChatScreen from '../screens/post_screen/ChatScreen';

import styles from './MainTabScreenStyles';
import MatchesScreen from '../adminscreens/matches/MatchesScreen';
import EditMatchesScreen from '../adminscreens/matches/EditMatchesScreen';
import UsersScreen from '../adminscreens/users/UsersScreen';
import AddMatchesScreen from '../adminscreens/matches/AddMatchesScreen';
import PostScreen from '../screens/post_screen/PostScreen';
import AddPostScreen from '../screens/post_screen/AddPostSreen';
import UserPost from '../screens/post_screen/UserPost';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation, route}) => (
  <Stack.Navigator
    screenOptions={{
      headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,

      headerBackTitleVisible: false,
      title: '',
      headerTitleAlign: 'center',
      headerTintColor: '#2e64e5',
      headerStyle: {
        backgroundColor: '#35364d',
        shadowColor: '#181829',
        elevation: 0,
      },
    }}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="DetailTeam"
      component={DetailTeamScreen}
      options={{
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="StandingsDetail"
      component={StandingsDetailScreen}
      options={({route}) => ({
        headerTransparent: true,
      })}
    />
  </Stack.Navigator>
);
const LeaguesStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#2e64e5',
      headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,

      headerStyle: {
        backgroundColor: '#35364d',
        shadowColor: '#181829',
        elevation: 0,
      },
    }}>
    <Stack.Screen
      name="Leagues"
      component={LeaguesScreen}
      options={{
        headerTitle: ' Leagues',
        headerLeft: false,

        headerRight: () => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddLeagues')}>
            <Image
              source={ADMIN_IMAGES.PLUS_IMAGE}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen
      name="AddLeagues"
      component={AddLeaguesScreen}
      options={{
        headerTitle: ' AddLeagues',
      }}
    />
    <Stack.Screen
      name="EditLeagues"
      component={EditLeaguesScreen}
      options={{
        headerTitle: ' EditLeagues',
      }}
    />
    <Stack.Screen
      name="AddMatches"
      component={AddMatchesScreen}
      options={{
        headerTitle: ' AddMatches',
      }}
    />
  </Stack.Navigator>
);
const MatchesStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,

      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#2e64e5',
      headerStyle: {
        backgroundColor: '#35364d',
        shadowColor: '#181829',
        elevation: 0,
      },
    }}>
    <Stack.Screen
      name="Matches"
      component={MatchesScreen}
      options={{
        headerLeft: false,
        headerTitle: ' Matches',
      }}
    />

    <Stack.Screen
      name="EditMatches"
      component={EditMatchesScreen}
      options={{
        headerTitle: ' EditMatches',
      }}
    />
  </Stack.Navigator>
);
const UsersStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,
      headerLeft: false,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#2e64e5',
      headerStyle: {
        backgroundColor: '#35364d',
        shadowColor: '#181829',
        elevation: 0,
      },
    }}>
    <Stack.Screen
      name="Users"
      component={UsersScreen}
      options={{
        headerTitle: ' Users',
      }}
    />
  </Stack.Navigator>
);
const ProfileStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#2e64e5',
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
        headerTransparent: true,
        headerBackTitleVisible: false,
        title: '',
        headerTitleAlign: 'center',

        headerStyle: {
          backgroundColor: '#222232',
          shadowColor: 'white',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const StandingsStack = ({navigation, route}) => (
  <Stack.Navigator
    screenOptions={{
      headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,
      title: '',

      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#2e64e5',
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
        headerTransparent: true,
      })}
    />
  </Stack.Navigator>
);
const PostsStack = ({navigation, route}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Post"
      component={PostScreen}
      options={{
        headerLeft: false,

        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,
        headerTintColor: '#2e64e5',
        headerTitleStyle: {
          color: '#2e64e5',
        },
        headerStyle: {
          backgroundColor: '#35364d',
          shadowColor: 'white',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPostScreen')}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={ADMIN_IMAGES.PLUS_IMAGE} style={styles.image} />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPostScreen"
      component={AddPostScreen}
      options={{
        headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,
        title: '',
        headerTransparent: true,

        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#2e64e5',
        headerTitleStyle: {
          color: '#2e64e5',
        },
        headerStyle: {
          backgroundColor: '#35364d',

          shadowColor: 'white',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="UserPost"
      component={UserPost}
      options={{
        headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,
        headerTransparent: true,
        headerBackTitleVisible: false,
        title: '',
        headerTitleAlign: 'center',
        headerTintColor: '#2e64e5',
        headerTitleStyle: {
          color: '#2e64e5',
        },
        headerStyle: {
          backgroundColor: '#222232',
          shadowColor: 'white',
          elevation: 0,
        },
      }}
    />

    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        headerStatusBarHeight: Platform.OS === 'ios' ? 30 : -10,
        headerTransparent: true,
        headerBackTitleVisible: false,
        title: 'Comments',
        headerTitleAlign: 'center',
        headerTintColor: '#2e64e5',
        headerTitleStyle: {
          color: '#2e64e5',
        },
        headerStyle: {
          backgroundColor: '#222232',
          shadowColor: 'white',
          elevation: 0,
        },
      })}
    />
  </Stack.Navigator>
);
const tabRender = (view, focused, isAdmin) => {
  let title;
  let icon;
  switch (view) {
    case 'home':
      title = isAdmin ? 'Leagues' : 'Home';
      icon = isAdmin ? TAB_IMAGES.CHART_IMAGE : TAB_IMAGES.HOME_IMAGE;
      break;
    case 'explore':
      title = isAdmin ? 'Matches' : 'Explore';
      icon = TAB_IMAGES.DISCOVERY_IMAGE;
      break;

    case 'standings':
      title = isAdmin ? 'Users' : 'Standings';
      icon = isAdmin ? TAB_IMAGES.PROFILE_IMAGE : TAB_IMAGES.CHART_IMAGE;
      break;

    case 'profile':
      title = 'Profile';
      icon = isAdmin ? TAB_IMAGES.HOME_IMAGE : TAB_IMAGES.PROFILE_IMAGE;
      break;

    case 'posts':
      title = 'Posts';
      icon = isAdmin ? TAB_IMAGES.PROFILE_IMAGE : TAB_IMAGES.PROFILE_IMAGE;

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
        <Image source={icon} resizeMode="contain" style={styles.tabImage} />
      )}
    </View>
  );
};

const MainTabScreen = ({navigation, route}) => {
  const [isAdmin, setisAdmin] = useState();
  const [isAdminLoading, setisAdminLoading] = useState(true);
  const [isAdminError, setisAdminError] = useState();
  const adminrequest = async () => {
    setisAdminLoading(true);
    try {
      await AsyncStorage.getItem('isAdmin').then(value => {
        if (value === 'true') {
          setisAdmin(true);
        } else {
          setisAdmin(false);
        }
      });
    } catch (error) {
      setisAdminError(error);
      console.log(error);
    } finally {
      setisAdminLoading(false);
    }
  };
  useEffect(() => {
    adminrequest();
  }, [isAdmin]);

  if (isAdminLoading) {
    return <Indicator />;
  }

  if (isAdminError) {
    return <Error />;
  }

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
        component={isAdmin ? LeaguesStack : HomeStack}
        options={{
          tabBarIcon: ({focused}) => tabRender('home', focused, isAdmin),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={isAdmin ? MatchesStack : ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => tabRender('explore', focused, isAdmin),
        }}
      />
      <Tab.Screen
        name="Standings"
        component={isAdmin ? UsersStack : StandingsStack}
        options={{
          tabBarIcon: ({focused}) => tabRender('standings', focused, isAdmin),
        }}
      />
      {!isAdmin ? (
        <Tab.Screen
          name="Posts"
          component={PostsStack}
          options={{
            tabBarIcon: ({focused}) => tabRender('posts', focused, isAdmin),
          }}
        />
      ) : null}
      <Tab.Screen
        name="My Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => tabRender('profile', focused, isAdmin),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
