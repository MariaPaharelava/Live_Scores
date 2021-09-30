import {
  LOGIN_USER_STARTED,
  LOGIN_USER_ERROR,
  LOGIN_USER_COMPLETED,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_STARTED,
  LOGOUT_USER_COMPLETED,
  SIGNUP_USER_COMPLETED,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_STARTED,
  LOAD_USER_STARTED,
  LOAD_USER_COMPLETED,
} from '../actions/types';
import {REHYDRATE} from 'redux-persist/lib/constants';
const INITIAL_STATE = {
  user: null,
  loginError: '',
  loginProcessing: false,

  logoutError: '',
  logoutProcessing: false,

  signupError: '',
  signupProcessing: false,

  loadUserProcessing: false,
};

export default function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REHYDRATE:
      return {...state, persistedState: action.payload};
    case LOGIN_USER_STARTED:
      return {...state, loginError: null, loginProcessing: true, user: null};
    case LOGIN_USER_ERROR:
      return {...state, loginError: action.payload, loginProcessing: false};
    case LOGIN_USER_COMPLETED:
      return {...state, user: action.payload, loginProcessing: false};

    case LOGOUT_USER_STARTED:
      return {...state, logoutError: null, logoutProcessing: true};
    case LOGOUT_USER_ERROR:
      return {...state, logoutError: action.payload, logoutProcessing: false};
    case LOGOUT_USER_COMPLETED:
      return {...state, user: null, logoutProcessing: false};

    case SIGNUP_USER_STARTED:
      return {...state, signupError: null, signupProcessing: true, user: null};
    case SIGNUP_USER_ERROR:
      return {...state, signupError: action.payload, signupProcessing: false};
    case SIGNUP_USER_COMPLETED:
      return {...state, user: action.payload, signupProcessing: false};

    // case LOAD_USER_STARTED:
    //   return {...state, user: null};

    // case LOAD_USER_COMPLETED:
    //   return {...state, user: action.payload, loadUserProcessing: true};

    default:
      return state;
  }
}
