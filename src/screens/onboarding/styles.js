import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  onboarding_image: {
    marginHorizontal: 48,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  onboarding_text: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
    width: 255,
    height: 160,
    left: 20,
  },
  first_section: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  second_section: {
    color: '#65656B',
    fontSize: 16,
    marginLeft: 'auto',
    marginTop: 'auto',
    left: 18,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  signin_button: {
    width: 200,
    height: 20,
    left: 40,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#246BFD',
  },
  signup_button: {
    width: 70,
    height: 50,
    marginRight: 40,
    top: 10,
  },
  signin_button_text: {
    width: 60,
    left: 75,
    top: 18,
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    color: 'white',
  },
  signup_button_text: {
    fontSize: 18,
    color: '#C4C4C4',
  },
});
export default styles;
