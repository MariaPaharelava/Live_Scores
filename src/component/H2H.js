import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import Indicator from './ActivityIndicator';
import Error from './ErrorIndicator';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
import {getBasketballLigaByID, getSoccerLigaByID} from '../api/Matches';
import {MatchButton} from '../buttons/MatchButton';
const H2H = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  currentmatch,
  othermatch,
  liga,
  matchID,
  ligaID,
  types,
  ...props
}) => {
  const [matchesData, setMatchesData] = useState();
  const [matchesError, setMatchesError] = useState();
  const filterMatch = match => {
    if (
      match.firstTeam.team[0].teamDetails.name ===
        currentmatch.firstTeam.team[0].teamDetails.name &&
      match.secondTeam.team[0].teamDetails.name ===
        currentmatch.secondTeam.team[0].teamDetails.name
    ) {
      return true;
    } else {
      return false;
    }
  };
  const rednderOtherMathes = matches => {
    return matches
      .filter(match => match.id !== matchID)
      .filter(filterMatch)
      .map(match => {
        return (
          <View style={{paddingTop: 20}} key={match.id}>
            <MatchButton
              matches={match}
              onPress={async () =>
                await navigation.push('DetailTeam', {
                  matchID: match.id,
                  ligaID: ligaID,
                  types: types,
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
        if (types === 'soccer') {
          const matches = await getSoccerLigaByID(ligaID);
          setMatchesData(matches);
        }
        if (types === 'basketball') {
          const matches = await getBasketballLigaByID(ligaID);
          setMatchesData(matches);
        }
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
export default H2H;

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
