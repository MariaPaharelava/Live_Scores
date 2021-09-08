import {StyleSheet} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'column',
  },
  radius: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
  },
  noBackground: {
    borderStartColor: 'transparent',
  },
  text: {
    color: colors.white,
    ...fonts.defaultFont,
  },
  textTitle: {
    color: 'gray',
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    opacity: 0.05,
  },
});
