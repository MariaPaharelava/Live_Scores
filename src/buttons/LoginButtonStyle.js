import {colors} from '../constant/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  password: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#181829',
    margin: 12,
    marginHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    padding: Platform.OS === 'ios' ? 10 : 5,
  },
  textInput: {flex: 1},
  imageStyle: {
    padding: 10,
    margin: 5,
  },
});
