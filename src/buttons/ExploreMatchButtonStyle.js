import {StyleSheet} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  noBackground: {
    borderStartColor: 'transparent',
  },
  text: {
    color: colors.white,
    ...fonts.defaultFont,
  },

  wrapper: {
    flexDirection: 'row',
  },

  wrapperScore: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
  },
  content: {
    flexDirection: 'row',
  },
  backImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222232',
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 2,
  },
  data: {
    color: '#65656B',
  },
});
