import {StyleSheet, Platform} from 'react-native';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 20,
  },
  itemStyle: {
    padding: 15,
    color: 'white',
  },
  textInput: {
    paddingLeft: 15,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    width: '70%',
    borderWidth: 1,
    height: 50,
    paddingLeft: 20,
    marginHorizontal: Platform.OS === 'ios' ? 10 : 15,

    borderColor: '#222232',
    backgroundColor: '#222232',
  },
  navigate: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 40 : 40,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  content: {
    marginTop: Platform.OS === 'ios' ? 40 : 40,

    backgroundColor: '#181829',
  },
  lastView: {height: 15},
});
export default styles;
