import {StyleSheet, Platform} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
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
    width: '90%',
    borderWidth: 1,
    height: 50,
    margin: 5,
    paddingHorizontal: 15,
    borderColor: '#222232',
    backgroundColor: '#222232',
  },
  navigate: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#181829',
    marginBottom: Platform.OS === 'ios' ? 50 : 30,
  },
  lastView: {height: 35},
});
export default styles;
