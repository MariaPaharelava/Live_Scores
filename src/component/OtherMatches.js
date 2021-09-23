import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import Indicator from './ActivityIndicator';
import Error from './ErrorIndicator';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
import {getLigaByID} from '../api/Matches';
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
  ligaID,
  ...props
}) => {
  const [matchesData, setMatchesData] = useState();
  const [matchesError, setMatchesError] = useState();

  const rednderOtherMathes = matches => {
    return matches
      .filter(match => match.id !== matchID)
      .map(match => {
        return (
          <View style={{paddingTop: 20}} key={match.id}>
            <MatchButton
              matches={match}
              onPress={() =>
                navigation.push('DetailTeam', {
                  matchID: match.id,
                  ligaID: ligaID,
                })
              }
            />
          </View>
        );
      });
  };

  useEffect(() => {
    const matchesrequest = async () => {
      try {
        const matches = await getLigaByID(ligaID);
        setMatchesData(matches);
      } catch (error) {
        setMatchesError(error);
        console.log(error);
      } finally {
      }
    };
    matchesrequest();
    return () => {
      setMatchesData();
    };
  }, [ligaID]);

  if (matchesError) {
    return <Error />;
  }

  return matchesData ? (
    <View style={styles.container}>
      <ScrollView>
        {rednderOtherMathes(matchesData.matches)}
        <View style={{height: 75}} />
      </ScrollView>
    </View>
  ) : (
    <View style={styles.loading}>
      <Indicator />
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
    marginTop: '25%',
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
