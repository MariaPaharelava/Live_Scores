import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  textInput: {
    paddingLeft: Platform.OS === 'ios' ? 0 : 15,
    color: 'white',
    width: 30,
    fontSize: 18,
    fontWeight: 'bold',
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
  players: {
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  titlePlayers: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: 'white',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 40,
  },
  image: {width: 30, height: 30, tintColor: 'white', marginRight: 20},
  scrollView: {
    marginBottom: 80,
  },
  containerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 55,
  },
  score: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',

    width: 30,
    textAlign: 'center',
    flexShrink: 0,
  },
  scoreText: {
    color: '#C4C4C4',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  statsView: {
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
});

export default styles;
