import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'ios' ? 5 : 0,
  },
  button: {alignItems: 'center', justifyContent: 'center'},
  text: {color: 'blue', fontSize: 15},
  circle: {
    width: 6,
    height: 6,
    backgroundColor: 'blue',
    borderRadius: 3,
    marginTop: 5,
  },
  image: {width: 30, height: 30, tintColor: 'blue', marginRight: 20},
  tabImage: {width: 25, height: 25, tintColor: 'white'},
});
export default styles;
