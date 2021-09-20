import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Score} from '../component/Score';
import {MatchButton} from '../buttons/MatchButton';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
const MatchDetail = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  match,
  othermatch,
  ...props
}) => {
  const rednderOtherMathes = (othermatch, currentmutch) => {
    // return othermatch.map(match => {
    //   if (match != currentmutch)
    //     return (
    //       <View style={{paddingTop: 20}} key={match.id}>
    //         <MatchButton
    //           matches={match}
    //           onPress={() =>
    //             navigation.push('DetailTeam', {
    //               match: match,
    //               othermatch: othermatch,
    //             })
    //           }
    //         />
    //       </View>
    //     );
    // });
  };
  return (
    <View>
      <View style={styles.params}>
        <Score
          title="Shooting"
          valueF={match.firstTeam.stats.shooting}
          valueS={match.secondTeam.stats.shooting}
        />
        <Score
          title="Attacks"
          valueF={match.firstTeam.stats.attacks}
          valueS={match.secondTeam.stats.attacks}
        />
        <Score
          title="Possesion"
          valueF={match.firstTeam.stats.possesion}
          valueS={match.secondTeam.stats.possesion}
        />
        <Score
          title="Cards"
          valueF={match.firstTeam.stats.cards}
          valueS={match.secondTeam.stats.cards}
          image={require('../icons/other/yellowcard.png')}
        />
        <Score
          title="Corners"
          valueF={match.firstTeam.stats.corners}
          valueS={match.secondTeam.stats.corners}
        />
      </View>
      <View style={styles.other}>
        <Text style={styles.otherText}>Other Match</Text>
        <TouchableOpacity>
          <Text style={styles.allText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* {rednderOtherMathes(othermatch, match)} */}
        <View style={{height: 75}}></View>
      </ScrollView>
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
