// import React from 'react';
// import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
// import {TeamTable} from './TeamTable';

// const HomeTable = ({navigation, liga}) => {
//   const renderTeam = hometable => {
//     return hometable.map(team => {
//       return (
//         <View key={team.team}>
//           <TeamTable
//             team={team}
//             // onPress={() => match}
//           />
//         </View>
//       );
//     });
//   };
//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.content}>
//         {renderTeam(liga.hometable)}
//         <View style={styles.lastView}></View>
//       </ScrollView>
//     </View>
//   );
// };

// export default HomeTable;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   lastView: {height: 75},
//   content: {
//     height: Platform.OS === 'ios' ? '84%' : '80%',
//     backgroundColor: '#181829',
//   },
// });

import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {TeamTable} from './TeamTable';
import {getHomeTableMatches} from '../api/Matches';
import Indicator from '../api/ActivityIndicator';
import Error from '../api/ErrorIndicator';

const HomeTable = ({navigation, matchID}) => {
  const [tablematchesData, setTableMatchesData] = useState([]);
  const [tablematchesError, setTableMatchesError] = useState();
  const [tablematchesLoading, setTableMatchesLoading] = useState();

  const tablematchesrequest = async () => {
    setTableMatchesLoading(true);
    try {
      const table = await getHomeTableMatches(matchID);
      setTableMatchesData(table);
    } catch (error) {
      setTableMatchesError(error);
      console.log(error);
    } finally {
      setTableMatchesLoading(false);
    }
  };

  useEffect(() => {
    tablematchesrequest();
    return () => {
      setTableMatchesData();
    };
  }, []);

  // if (tablematchesLoading) {
  //   return <Indicator />; //loader
  // }
  if (!tablematchesData) {
    return null; //null
  }
  if (tablematchesError) {
    return <Error />; //error
  }

  const renderTeam = tablematchesData => {
    return tablematchesData.map(team => {
      return (
        <View key={team.team}>
          <TeamTable team={team} onPress={() => match} />
        </View>
      );
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {renderTeam(tablematchesData)}
        <View style={styles.lastView}></View>
      </ScrollView>
      {tablematchesLoading && (
        <View style={styles.loading}>
          <Indicator />
        </View>
      )}
    </View>
  );
};

export default HomeTable;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastView: {height: 75},
  content: {
    height: Platform.OS === 'ios' ? '84%' : '80%',
    backgroundColor: '#181829',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
