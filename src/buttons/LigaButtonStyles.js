import {StyleSheet} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'column',
  },
  radius: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    justifyContent: 'space-between',
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
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCountry: {marginRight: 10},
});
