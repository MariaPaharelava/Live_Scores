import {call, put, takeEvery} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginCompleted,
  loginError,
  loginStarted,
  logoutCompleted,
  logoutError,
  logoutStarted,
  signupCompleted,
  signupError,
  signupStarted,
  loadUserSratred,
  loadUserCompleted,
} from '../actions/AuthActions';

import {
  LOGIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  LOAD_USER,
} from '../actions/types';
import {Alert} from 'react-native';

function* loginUser(params) {
  try {
    yield put(loginStarted());
    const authManager = auth();
    const result = yield call(
      [authManager, authManager.signInWithEmailAndPassword],
      params.payload.email,
      params.payload.password,
    );

    yield put(loginCompleted(result));
  } catch (e) {
    let errorMessage = 'Server Error. Please try again later!';
    if (e.message) {
      errorMessage = e.message;
    }
    yield put(loginError(errorMessage));
    Alert.alert(errorMessage);
  }
}

function* signupUser(params) {
  try {
    yield put(signupStarted());
    const authManager = auth();
    const result = yield call(
      [authManager, authManager.createUserWithEmailAndPassword],

      params.payload.email,
      params.payload.password,
    );

    yield put(signupCompleted(result));
  } catch (e) {
    let errorMessage = 'Server Error. Please try again later!';
    if (e.message) {
      errorMessage = e.message;
    }
    yield put(signupError(errorMessage));
    Alert.alert(errorMessage);
  }
}
function* logoutUser(params) {
  try {
    yield put(logoutStarted());

    const authManager = auth();
    yield call([authManager, authManager.signOut]);
    // yield call(AsyncStorage.clear);

    yield put(logoutCompleted());
  } catch (e) {
    let errorMessage = 'Server Error. Please try again later!';
    if (e.message) {
      errorMessage = e.message;
    }
    yield put(logoutError(errorMessage));
    Alert.alert(errorMessage);
  }
}

// function* loadUser() {
//   try {
//     yield put(loadUserSratred());
//     const value = yield call(AsyncStorage.getItem, 'persist:root');

//     yield put(loadUserCompleted(value));
//   } catch (e) {
//     let errorMessage = 'Server Error. Please try again later!';
//     if (e.message) {
//       errorMessage = e.message;
//     }
//     Alert.alert(errorMessage);
//   }
// }

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(SIGNUP_USER, signupUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  // yield takeEvery(LOAD_USER, loadUser);
}

export default authSaga;
