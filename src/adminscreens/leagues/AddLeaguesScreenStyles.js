import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  textInput: {
    paddingLeft: Platform.OS === 'ios' ? 0 : 15,

    color: 'white',
  },
  rowFront: {
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: 'white',
  },
  action: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#222232',
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 5,
  },

  Team: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#4F5287',
    marginBottom: 20,
  },
  titleTeam: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: 'white',
  },
  addButton: {
    marginTop: Platform.OS === 'ios' ? '80%' : '50%',

    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});

export default styles;
