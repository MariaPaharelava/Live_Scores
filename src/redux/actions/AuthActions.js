import {
  LOGIN_USER,
  LOGIN_USER_STARTED,
  LOGIN_USER_ERROR,
  LOGIN_USER_COMPLETED,
  SIGNUP_USER,
  SIGNUP_USER_COMPLETED,
  SIGNUP_USER_STARTED,
  SIGNUP_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_COMPLETED,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_STARTED,
  LOAD_USER,
  LOAD_USER_COMPLETED,
  LOAD_USER_STARTED,
  FORGOTPASSWORD_USER,
  FORGOTPASSWORD_USER_STARTED,
  FORGOTPASSWORD_USER_COMPLETED,
  FORGOTPASSWORD_USER_ERROR,
} from './types';

export const loginUser = ({email, password}) => ({
  type: LOGIN_USER,
  payload: {email, password},
});

export const loginStarted = () => ({
  type: LOGIN_USER_STARTED,
});

export const loginError = error => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

export const loginCompleted = user => ({
  type: LOGIN_USER_COMPLETED,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const logoutStarted = () => ({
  type: LOGOUT_USER_STARTED,
});

export const logoutError = error => ({
  type: LOGOUT_USER_ERROR,
  payload: error,
});

export const logoutCompleted = () => ({
  type: LOGOUT_USER_COMPLETED,
});

export const signupUser = ({email, password}) => ({
  type: SIGNUP_USER,
  payload: {email, password},
});

export const signupStarted = () => ({
  type: SIGNUP_USER_STARTED,
});

export const signupError = error => ({
  type: SIGNUP_USER_ERROR,
  payload: error,
});

export const signupCompleted = user => ({
  type: SIGNUP_USER_COMPLETED,
  payload: user,
});

export const loadUser = () => ({
  type: LOAD_USER,
});

export const loadUserSratred = () => ({
  type: LOAD_USER_STARTED,
});

export const loadUserCompleted = user => ({
  type: LOAD_USER_COMPLETED,
  payload: user,
});

export const forgotPasswordUser = ({email}) => ({
  type: FORGOTPASSWORD_USER,
  payload: {email},
});

export const forgotPasswordUserStarted = () => ({
  type: FORGOTPASSWORD_USER_STARTED,
});

export const forgotPasswordUserError = error => ({
  type: FORGOTPASSWORD_USER_ERROR,
  payload: error,
});

export const forgotPasswordUserCompleted = user => ({
  type: FORGOTPASSWORD_USER_COMPLETED,
  payload: user,
});
