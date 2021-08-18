import React, {useState, useEffect} from 'react';
import {View, FlatList, Platform} from 'react-native';
import Indicator from './ActivityIndicator';
import Error from './ErrorIndicator';
import {getLigs} from '../api/Matches';
import {ExploreMatchButton} from '../buttons/ExploreMatchButton';
const TeamShedule = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  currentmatch,
  othermatch,
  liga,
  Ligs,
  matchID,
  ...props
}) => {
  const [matchesData, setMatchesData] = useState([]);
  const [matchesError, setMatchesError] = useState();
  const [matchesLoading, setMatchesLoading] = useState();

  useEffect(() => {
    const matchesrequest = async () => {
      setMatchesLoading(true);
      try {
        const matches = await getLigs();
        setMatchesData(matches);
      } catch (error) {
        setMatchesError(error);
        console.log(error);
      } finally {
        setMatchesLoading(false);
      }
    };
    matchesrequest();
  }, []);

  if (matchesLoading) {
    return <Indicator />;
  }
  if (!matchesData) {
    return null;
  }
  if (matchesError) {
    return <Error />;
  }
  const rednderLigs = ({item}) => {
    return item.matches.map(match => {
      return (
        <View key={match.id}>
          <ExploreMatchButton matches={match} />
        </View>
      );
    });
  };
  return (
    <FlatList
      data={matchesData}
      renderItem={rednderLigs}
      keyExtractor={item => item.id}
      style={{height: Platform.OS === 'ios' ? '90%' : '67%'}}
    />
  );
};
export default TeamShedule;
