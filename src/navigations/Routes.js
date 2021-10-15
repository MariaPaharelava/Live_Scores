import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStackScreen from './AppStack';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../redux/actions/AuthActions';
import SplashScreen from 'react-native-splash-screen';
const Routes = () => {
  const user = useSelector(state => state.AuthReducer.user);
  const dispatch = useDispatch();

  const userLoading = useSelector(
    state => state.AuthReducer.loadUserProcessing,
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!userLoading) {
      SplashScreen.hide();
    }
  }, [userLoading]);

  return (
    <NavigationContainer>
      {user ? <AppStackScreen /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
