import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStackScreen from './AppStack';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../redux/actions/AuthActions';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminTabScreen from './AdminTabScreen';

const Routes = () => {
  const user = useSelector(state => state.AuthReducer.user);
  const [isAdmin, setisAdmin] = useState(null);

  const dispatch = useDispatch();
  const userLoading = useSelector(
    state => state.AuthReducer.loadUserProcessing,
  );

  useEffect(() => {
    dispatch(loadUser());
    AsyncStorage.getItem('Admin').then(value => {
      if (value === 'true') {
        setisAdmin(true);
      } else {
        setisAdmin(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (userLoading) {
      SplashScreen.hide();
    }
  }, [userLoading]);
  console.log(isAdmin);

  return (
    <NavigationContainer>
      {isAdmin ? <AdminTabScreen /> : user ? <AppStackScreen /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
