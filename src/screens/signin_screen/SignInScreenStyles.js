import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  onboardingImage: {
    marginHorizontal: 48,
    marginBottom: 'auto',
    opacity: 0.5,
    marginTop: Platform.OS === 'ios' ? 20 : 1,
  },

  footer: {
    height: '70%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: 'white',

    fontSize: 26,
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#181829',
    margin: 10,
    marginHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    padding: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '30%' : '10%',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 30 : 12,
    paddingHorizontal: Platform.OS === 'ios' ? 18 : 12,
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
  signupButton: {paddingLeft: 3},
  signupButtonText: {
    color: '#246BFD',
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
  pressable: {},
});
export default styles;
