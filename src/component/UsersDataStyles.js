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
    width: '70%',
    padding: 20,
  },
  noBackground: {
    borderStartColor: 'transparent',
  },
  text: {
    marginLeft: 10,
    color: colors.white,
    ...fonts.defaultFont,
  },
  textTitle: {
    marginLeft: 10,

    color: 'gray',
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    opacity: 0.05,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
