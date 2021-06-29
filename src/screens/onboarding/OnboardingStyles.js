import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  onboardingImage: {
    marginHorizontal: 48,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  onboardingText: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
    width: 255,
    height: 160,
    left: 20,
  },
  firstSection: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  secondSection: {
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
    marginLeft: 40,
    width: 200,
  },
  signupButton: {
    width: 70,
    height: 50,
    marginRight: 40,
    top: 10,
    marginLeft: 50,
  },
  signupButtonText: {
    fontSize: 18,
    color: '#C4C4C4',
  },
});
export default styles;
