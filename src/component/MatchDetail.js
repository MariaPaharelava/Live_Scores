import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Score} from '../component/Score';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
import OtherMatches from './OtherMatches';
const MatchDetail = ({
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
  const selectedSport = () => {
    switch (types) {
      case 'soccer':
        return (
          <View style={styles.params}>
            <Score
              title="Shooting"
              valueF={currentmatch.firstTeam.stats.shooting}
              valueS={currentmatch.secondTeam.stats.shooting}
            />
            <Score
              title="Attacks"
              valueF={currentmatch.firstTeam.stats.attacks}
              valueS={currentmatch.secondTeam.stats.attacks}
            />
            <Score
              title="Possesion"
              valueF={currentmatch.firstTeam.stats.possesion}
              valueS={currentmatch.secondTeam.stats.possesion}
            />
            <Score
              title="Cards"
              valueF={currentmatch.firstTeam.stats.cards}
              valueS={currentmatch.secondTeam.stats.cards}
              image={require('../icons/other/yellowcard.png')}
            />
            <Score
              title="Corners"
              valueF={currentmatch.firstTeam.stats.corners}
              valueS={currentmatch.secondTeam.stats.corners}
            />
          </View>
        );
      case 'basketball':
        return (
          <View style={styles.params}>
            <Score
              title="Throws"
              valueF={currentmatch.firstTeam.stats.throws}
              valueS={currentmatch.secondTeam.stats.throws}
            />
            <Score
              title="Assists"
              valueF={currentmatch.firstTeam.stats.assists}
              valueS={currentmatch.secondTeam.stats.assists}
            />
            <Score
              title="Blocks"
              valueF={currentmatch.firstTeam.stats.blocks}
              valueS={currentmatch.secondTeam.stats.blocks}
            />
            <Score
              title="Rebounds"
              valueF={currentmatch.firstTeam.stats.rebounds}
              valueS={currentmatch.secondTeam.stats.rebounds}
            />

            <Score
              title="Foul"
              valueF={currentmatch.firstTeam.stats.foul}
              valueS={currentmatch.secondTeam.stats.foul}
            />
          </View>
        );

      default:
        return;
    }
  };
  return (
    <View>
      {selectedSport()}
      <View style={styles.other}>
        <Text style={styles.otherText}>Other Match</Text>
        <TouchableOpacity>
          <Text style={styles.allText}>See all</Text>
        </TouchableOpacity>
      </View>
      <OtherMatches
        navigation={navigation}
        matchID={matchID}
        ligaID={ligaID}
        currentmatch={currentmatch}
        types={types}
      />
    </View>
  );
};
export default MatchDetail;

const styles = StyleSheet.create({
  container: {
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
