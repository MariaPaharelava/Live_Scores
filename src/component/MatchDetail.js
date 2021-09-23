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
  ...props
}) => {
  return (
    <View>
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
