import {StyleSheet} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },

  noBackground: {
    borderStartColor: 'transparent',
  },
  text: {
    color: colors.white,
    ...fonts.defaultFont,
    paddingHorizontal: 5,
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
    paddingLeft: 5,
  },
  dimensions: {height: 30, width: 30},
});
