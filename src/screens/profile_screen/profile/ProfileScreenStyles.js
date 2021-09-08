import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181829',
  },
  containerImage: {
    backgroundColor: '#181829',
    marginTop: Platform.OS === 'ios' ? 60 : 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },
  userBtn: {
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 25,
  },
  userBtnTxt: {
    color: 'white',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  userEditContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },
  userEditImg: {height: 45, width: 45},
  lastView: {height: 75},
  profileData: {
    marginLeft: Platform.OS === 'ios' ? 25 : 35,
  },
  navigate: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 30 : 20,
  },
});

export default styles;
