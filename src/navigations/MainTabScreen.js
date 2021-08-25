import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home_screen/HomeScreen';
import ExploreScreen from '../screens/explore_screen/ExploreScreen';
import StandingsScreen from '../screens/standings_screen/StandingsScreen';
import ProfileScreen from '../screens/profile_screen/ProfileScreen';
import styles from './MainTabScreenStyles';
const Tab = createBottomTabNavigator();

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
        component={ProfileScreen}
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
