import {StyleSheet, Platform} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
  },
  profileData: {
    marginLeft: Platform.OS === 'ios' ? 25 : 35,
  },
  text: {
    color: 'white',
  },
});
export default styles;
