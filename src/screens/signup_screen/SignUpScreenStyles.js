import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  footer: {
    backgroundColor: '#222232',
    marginTop: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  onboardingImage: {
    marginHorizontal: 48,
    marginBottom: 'auto',
    opacity: 0.5,
    marginTop: Platform.OS === 'ios' ? 10 : 1,
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
  pressable: {paddingBottom: 20},

  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  text_footer: {
    color: '#5e74f7',
    fontSize: 18,
    marginTop: 35,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#246BFD',
    borderWidth: 1,
    marginTop: 15,
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignIn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#246BFD',
  },
  textSignUp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  color_textPrivate: {
    color: 'white',
  },
  errors: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    margin: 5,
  },
});

export default styles;
