import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../constant/colors';
import {fonts} from '../../constant/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181829',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#181829',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#181829',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
    justifyContent: 'center',
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  image: {width: 25, height: 25, tintColor: 'white'},
  imagePlus: {
    width: 25,
    height: 25,
    tintColor: 'white',
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
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
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
  containerText: {
    flexDirection: 'column',
  },
  viewScreen: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginLeft: '25%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  nameScreen: {
    color: colors.white,
    ...fonts.defaultFont,
  },
});

export default styles;
