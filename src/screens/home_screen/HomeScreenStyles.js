import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  titleText: {
    color: 'white',
    marginRight: 140,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
  },
  touchableOpacity: {
    width: 105,
    height: 105,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222232',
  },
  textUnderButton: {
    color: 'white',
    fontSize: 18,
    marginTop: 4,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  image: {marginBottom: 15},
  button: {alignItems: 'center', justifyContent: 'center', padding: 20},
  sportImages2: {
    margin: 10,
  },
  content: {
    width: '100%',
    height: Platform.OS === 'ios' ? '50%' : '40%',
    backgroundColor: '#181829',
  },
  info: {
    fontSize: 20,
    textAlign: 'left',
    color: '#666666',
    fontStyle: 'italic',
    lineHeight: 40,
    fontWeight: 'bold',
    marginLeft: 6,
    marginBottom: 5,

    letterSpacing: 0.9,
  },
  point: {
    borderColor: '#ad3123',
    borderWidth: 4,
    width: 4,
    height: 4,
    borderRadius: 4,
  },

  lastView: {height: 75},
});
export default styles;
