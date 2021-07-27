import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            // console.log(e);

            Alert.alert('Email or password is incorrect');
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert('Email or password is incorrect');
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {}
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
