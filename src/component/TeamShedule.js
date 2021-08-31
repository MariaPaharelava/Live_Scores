import React, {useState, useEffect} from 'react';
import {View, FlatList, Platform, Alert} from 'react-native';
import Indicator from './ActivityIndicator';
import Error from './ErrorIndicator';
import {getLigs} from '../api/Matches';
import {getMatches} from '../api/Matches';
import {fetchMoreMatches} from '../api/Matches';
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
  const [startAfter, setStartAfter] = useState({});
  const [matchPerLoad] = useState(8);
  const [lastMatch, setLastMatch] = useState(false);

  useEffect(() => {
    const matchesrequest = async () => {
      setMatchesLoading(true);
      try {
        const matchesdata = await getMatches(matchPerLoad);
        setMatchesData([...matchesData, ...matchesdata.matches]);
        setStartAfter(matchesdata.lastVisible);
      } catch (error) {
        setMatchesError(error);
        console.log(error);
      } finally {
        setMatchesLoading(false);
      }
    };
    matchesrequest();
  }, []);

  const getMoreMatches = async () => {
    try {
      if (!lastMatch) {
        const matchesdata = await fetchMoreMatches(startAfter, matchPerLoad);
        setMatchesData([...matchesData, ...matchesdata.matches]);
        setStartAfter(matchesdata.lastVisible);
        matchesdata.matches.length === 0
          ? setLastMatch(true)
          : setLastMatch(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };

  if (matchesLoading) {
    return <Indicator />;
  }
  if (!matchesData) {
    return null;
  }
  if (matchesError) {
    return <Error />;
  }
  // const rednderLigs = ({item}) => {
  //   return item.matches.map(match => {
  //     return (
  //       <View key={match.id}>
  //         <ExploreMatchButton matches={match} />
  //       </View>
  //     );
  //   });
  // };
  const rednderLigs = ({item}) => {
    return (
      <View key={item.id}>
        <ExploreMatchButton matches={item} />
      </View>
    );
  };
  return (
    <FlatList
      data={matchesData}
      renderItem={rednderLigs}
      keyExtractor={item => item.id}
      style={{height: Platform.OS === 'ios' ? '90%' : '67%'}}
      onEndReached={getMoreMatches}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ListFooterComponent={() => !lastMatch && <Indicator />}
    />
  );
};
export default TeamShedule;
