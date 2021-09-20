// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
// const UsersScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>UsersScreen Screen </Text>
//       <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#181829',
//   },
//   text: {
//     color: 'white',
//   },
// });

// export default UsersScreen;
import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Platform, FlatList} from 'react-native';
import {fetchMoreUsers, getUsers} from '../../api/Matches';
import {fetchMoreSoccerMatches} from '../../api/Matches';
import {getTeamSoccerMatches} from '../../api/Matches';
import Search from '../../icons/other/Search.svg';
import {SportsButton} from '../../buttons/SportsButton';
import {ExploreMatchButton} from '../../buttons/ExploreMatchButton';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import styles from './UsersScreenStyles';
import {ProfileData} from '../../component/ProfileData';
import {UsersData} from '../../component/UsersData';
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
  console.log(usersData);
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
