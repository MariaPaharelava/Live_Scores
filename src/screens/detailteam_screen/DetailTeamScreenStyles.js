import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../constant/colors';
import {fonts} from '../../constant/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
    paddingTop: 20,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  score: {flexDirection: 'row', justifyContent: 'space-around'},
  icon: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  text: {
    color: colors.white,
    ...fonts.defaultFont,
    fontSize: 14,
  },
  textScore: {color: colors.white, ...fonts.defaultFont, fontSize: 40},
  navigate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 20,
  },
  params: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  other: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otherText: {color: colors.white, ...fonts.defaultFont, fontSize: 20},
  allText: {color: '#C4C4C4', ...fonts.defaultFont, fontSize: 16},
});
