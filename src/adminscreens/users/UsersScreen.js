import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Platform, FlatList} from 'react-native';
import {fetchMoreUsers, getUsers} from '../../api/Matches';
import {UsersData} from '../../component/UsersData';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import styles from './UsersScreenStyles';
const UsersScreen = ({navigation}) => {
  const [usersData, setusersData] = useState([]);
  const [usersError, setusersError] = useState();
  const [usersLoading, setusersLoading] = useState();
  const [startAfter, setStartAfter] = useState({});
  const [userPerload] = useState(2);
  const [lastUser, setlastUser] = useState(false);

  const usersrequset = async () => {
    setusersLoading(true);
    try {
      const usersdata = await getUsers(userPerload);
      setlastUser(false);
      setusersData(usersdata.users);

      setStartAfter(usersdata.lastVisible);
    } catch (error) {
      setusersError(error);
      console.log(error);
    } finally {
      setusersLoading(false);
    }
  };

  useEffect(() => {
    usersrequset();
  }, []);
  const getMoreUsers = async () => {
    try {
      if (!lastUser) {
        const userdata = await fetchMoreUsers(startAfter, userPerload);
        setusersData([...usersData, ...userdata.users]);
        setStartAfter(userdata.lastVisible);
        userdata.users.length === 0 ? setlastUser(true) : setlastUser(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setusersLoading(false);
    }
  };

  const RenderUsers = ({item}) => {
    return (
      <View key={item.email}>
        <UsersData
          firstTitle="Name"
          secondTitle="Email"
          firstInfo={item.name}
          secondInfo={item.email}
          image={item.userImg}
        />
      </View>
    );
  };

  if (!usersData) {
    return null;
  }

  if (usersError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#181829'}}>
      <View>
        <View style={styles.container}>
          <FlatList
            data={usersData}
            renderItem={RenderUsers}
            keyExtractor={item => item.email}
            style={{height: Platform.OS === 'ios' ? '90%' : '67%'}}
            onEndReached={getMoreUsers}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={150}
            ListFooterComponent={() =>
              usersLoading || !lastUser ? <Indicator /> : null
            }
          />
          <View style={styles.lastView} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UsersScreen;
