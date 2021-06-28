import {StyleSheet} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
export const styles = StyleSheet.create({
  radius: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
    width: 200,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#246BFD',
  },
  noBackground: {
    borderStartColor: 'transparent',
  },
  text: {
    color: colors.white,
    width: 60,
    ...fonts.defaultFont,
  },
});
