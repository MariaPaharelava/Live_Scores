import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Score} from '../component/Score';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
import {getOtherMatches} from '../api/Matches';
import Indicator from '../api/ActivityIndicator';
import Error from '../api/ErrorIndicator';
import {MatchButton} from '../buttons/MatchButton';
const OtherMatches = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  currentmatch,
  othermatch,
  liga,
  matchID,
  ...props
}) => {
  const [matchesData, setMatchesData] = useState([]);
  const [matchesError, setMatchesError] = useState();
  const [matchesLoading, setMatchesLoading] = useState();

  const rednderOtherMathes = matchesData => {
    return matchesData.map(match => {
      if (match != currentmatch)
        return (
          <View style={{paddingTop: 20}} key={match.id}>
            <MatchButton
              matches={match}
              onPress={() =>
                navigation.push('DetailTeam', {
                  matchID: match.id,
                })
              }
            />
          </View>
        );
    });
  };

  const matchesrequest = async () => {
    setMatchesLoading(true);
    try {
      const matches = await getOtherMatches(matchID);
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

  // if (matchesLoading) {
  //   return <Indicator />; //loader
  // }
  if (!matchesData) {
    return null; //null
  }
  if (matchesError) {
    return <Error />; //error
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {rednderOtherMathes(matchesData)}
        <View style={{height: 75}}></View>
      </ScrollView>

      {matchesLoading && (
        <View style={styles.loading}>
          <Indicator />
        </View>
      )}
    </View>
  );
};
export default OtherMatches;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
  params: {
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  other: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otherText: {color: colors.white, ...fonts.defaultFont, fontSize: 20},
  allText: {color: '#C4C4C4', ...fonts.defaultFont, fontSize: 16},
});
