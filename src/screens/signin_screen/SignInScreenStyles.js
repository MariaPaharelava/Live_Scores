import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../constant/colors';
import {fonts} from '../../constant/fonts';
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
    height: Platform.OS === 'ios' ? '70%' : 'auto',

    width: '100%',
    backgroundColor: '#222232',
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
    paddingBottom: 15,
    fontSize: 26,
    marginLeft: 10,
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
    paddingLeft: 10,
    color: 'white',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    marginTop: Platform.OS === 'ios' ? '10%' : '5%',
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
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.lightGray,
    ...fonts.defaultFont,
    fontSize: 14,
    paddingTop: 15,
  },
  lastView: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
  },
  quastion: {
    color: colors.lightGray,
    ...fonts.defaultFont,
    fontSize: 14,
  },
  signup: {
    paddingLeft: 2,
    color: colors.darkBlue,
  },
  signupButton: {paddingLeft: 3},
  signupButtonText: {
    color: colors.darkBlue,
    ...fonts.defaultFont,
    fontSize: 14,
  },
  hideLine: {
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    opacity: 0.3,
    padding: 10,
    width: 75,
    alignItems: 'center',
  },
  rememberText: {
    color: 'gray',
    paddingRight: Platform.OS === 'ios' ? 30 : 80,
  },
  password: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#181829',
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 5,
    padding: Platform.OS === 'ios' ? 10 : 0,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
  },
  errors: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    margin: 5,
  },
});
export default styles;
