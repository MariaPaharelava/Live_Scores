import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Score} from '../component/Score';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
import {getOtherMatches} from '../api/Matches';
import {getSheduleMatches} from '../api/Matches';
import Indicator from '../api/ActivityIndicator';
import Error from '../api/ErrorIndicator';
import {MatchButton} from '../buttons/MatchButton';
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

  const matchesrequest = async () => {
    setMatchesLoading(true);
    try {
      const matches = await getSheduleMatches(Ligs);
      setMatchesData(matches);
    } catch (error) {
      setMatchesError(error);
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };

  useEffect(() => {
    matchesrequest();
  }, []);

  if (matchesLoading) {
    return <Indicator backgroundColor="#181829" />; //loader
  }
  if (!matchesData) {
    return null; //null
  }
  if (matchesError) {
    return <Error />; //error
  }
  const rednderLigs = ({item}) => {
    return item.matches.map(match => {
      return (
        <View key={match.id}>
          <ExploreMatchButton
            matches={match}
            // onPress={() => match}
          />
        </View>
      );
    });
  };
  return (
    <FlatList
      data={Ligs}
      renderItem={rednderLigs}
      keyExtractor={item => item.id}
    />
  );
};
export default TeamShedule;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   params: {
//     marginTop: Platform.OS === 'ios' ? 30 : 0,
//   },
//   other: {
//     marginTop: Platform.OS === 'ios' ? 40 : 20,
//     marginHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   otherText: {color: colors.white, ...fonts.defaultFont, fontSize: 20},
//   allText: {color: '#C4C4C4', ...fonts.defaultFont, fontSize: 16},
// });
