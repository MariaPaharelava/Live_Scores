import {StyleSheet} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  radius: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 16,
    backgroundColor: '#2B2B3D',
    height: 68,
  },
  time: {
    backgroundColor: '#222232',
    height: 68,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  noBackground: {
    borderStartColor: 'transparent',
  },
  text: {
    color: colors.white,
    ...fonts.defaultFont,
    paddingRight: 5,
  },
  textScore: {
    color: colors.white,
    ...fonts.defaultFont,
  },

  score: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    padding: 8,
  },
  wrapperTeams: {
    flexDirection: 'row',
  },
  wrapperScore: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
