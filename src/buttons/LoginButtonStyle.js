import {colors} from '../constant/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    height: '65%',
    width: '100%',
    backgroundColor: '#222232',
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  hideLine: {
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    opacity: 0.3,
    padding: 10,
    width: 75,
    alignItems: 'center',
    marginLeft: 150,
  },
  modalText: {
    color: 'white',
    paddingLeft: 20,
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 28,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  password: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#181829',
    margin: 10,
    marginHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    padding: 5,
  },
  textInput: {flex: 1},
  imageStyle: {
    padding: 10,
    margin: 5,
  },

  imageStyleHide: {},
  reminder: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: Platform.OS === 'ios' ? 30 : 5,
    justifyContent: 'space-between',
  },
  signupButton: {paddingLeft: 3},
  signupButtonText: {
    color: colors.darkBlue,
  },
  roundedButton: {
    padding: 15,
  },

  rememberButton: {
    backgroundColor: '#222232',
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#65656B',
  },

  textRemember: {
    fontSize: 15,
    color: '#65656B',
    paddingRight: Platform.OS === 'ios' ? 60 : 120,
  },
  textForgot: {
    fontSize: 15,
    color: 'white',
  },
  lastView: {
    flexDirection: 'row',
    padding: Platform.OS === 'ios' ? 30 : 10,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  quastion: {color: '#C4C4C4'},
  signup: {
    paddingLeft: 2,
    color: '#246BFD',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
