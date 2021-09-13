import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import Indicator from './ActivityIndicator';
import Error from './ErrorIndicator';
import {TeamTable} from './TeamTable';
import {
  getAwayTableBasketballMatches,
  getAwayTableSoccerMatches,
} from '../api/Matches';

const AwayTable = ({navigation, ligaID, types}) => {
  const [tablematchesData, setTableMatchesData] = useState([]);
  const [tablematchesError, setTableMatchesError] = useState();
  const [tablematchesLoading, setTableMatchesLoading] = useState();

  useEffect(() => {
    const tablematchesrequest = async () => {
      setTableMatchesLoading(true);
      try {
        if (types === 'soccer') {
          const table = await getAwayTableSoccerMatches(ligaID);
          setTableMatchesData(table);
        }
        if (types === 'basketball') {
          const table = await getAwayTableBasketballMatches(ligaID);
          setTableMatchesData(table);
        }
      } catch (error) {
        setTableMatchesError(error);
        console.log(error);
      } finally {
        setTableMatchesLoading(false);
      }
    };
    tablematchesrequest();
    return () => {
      setTableMatchesData();
    };
  }, [ligaID]);

  if (!tablematchesData) {
    return null;
  }
  if (tablematchesError) {
    return <Error />;
  }

  const renderTeam = table => {
    return table.map(team => {
      return (
        <View key={team.team}>
          <TeamTable team={team} types={types} />
        </View>
      );
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {renderTeam(tablematchesData)}
        <View style={styles.lastView} />
      </ScrollView>
      {tablematchesLoading && (
        <View style={styles.loading}>
          <Indicator />
        </View>
      )}
    </View>
  );
};

export default AwayTable;

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
