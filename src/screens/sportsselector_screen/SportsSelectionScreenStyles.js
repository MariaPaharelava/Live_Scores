import {StyleSheet, Platform} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
    display: 'flex',
  },
  containerText: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 90 : 25,
    marginLeft: '10%',
  },
  question: {
    color: 'white',
    fontSize: 36,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  chooseText: {
    color: '#65656B',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingTop: 14,
  },
  sportImages: {
    flexDirection: 'row',
    flex: 1,
    margin: 20,
    flexWrap: 'wrap',
    paddingTop: Platform.OS === 'ios' ? 30 : 5,
    justifyContent: 'space-between',
  },
  sportImages2: {
    margin: 10,
  },

  roundedButton: {
    flex: 0.5,
    padding: 30,
    textAlign: 'center',
  },
  skipButton: {alignItems: 'center', marginTop: 15},
  button: {alignItems: 'center', justifyContent: 'center', padding: 20},
  touchableOpacity: {
    width: 95,
    height: 95,
    backgroundColor: '#222232',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textUnderButton: {
    color: 'white',
    fontSize: 18,
    marginTop: 4,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  textSkip: {
    color: 'white',
    fontSize: 16,
  },
});
