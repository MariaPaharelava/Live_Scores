import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './DetailTeamScreenStyles';
import {NavigateButton} from '../../buttons/NavigateButton';
import {LogBox} from 'react-native';
import {Score} from '../../component/Score';
import {MatchButton} from '../../buttons/MatchButton';
import {Ligs} from '../../component/Ligs';

const DetailTeamScreen = ({navigation, route}) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {match, othermatch} = route.params;
  // const [matches] = React.useState(route.params.matches);

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     matches: matches,
  //   });
  // }, [navigation, matches]);

  const rednderLigs = (othermatch, currentmutch) => {
    return othermatch.map(match => {
      if (match != currentmutch)
        return (
          <View style={{paddingTop: 20}} key={match.id}>
            <MatchButton
              matches={match}
              onPress={() =>
                navigation.navigate('DetailTeam', {
                  match: match,
                  othermatch: othermatch,
                })
              }
            />
          </View>
        );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Image
            style={styles.icon}
            source={{
              uri: match.firstTeam.teamDetails.imageUrl,
            }}
          />
          <Text style={styles.text}>{match.firstTeam.teamDetails.name}</Text>
        </View>
        <View style={styles.column}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.textScore}>{match.firstTeam.score}</Text>
            <Text style={styles.textScore}>-</Text>
            <Text style={styles.textScore}>{match.secondTeam.score}</Text>
          </View>

          <Text style={styles.text}>90.15</Text>
        </View>

        <View style={styles.column}>
          <Image
            style={styles.icon}
            source={{
              uri: match.secondTeam.teamDetails.imageUrl,
            }}
          />
          <Text style={styles.text}>{match.secondTeam.teamDetails.name}</Text>
        </View>
      </View>
      <View style={styles.navigate}>
        <NavigateButton
          title="Match Detail"
          width={100}
          color="#ED6B4E"
          height={50}
          onPress={() => {}}
        />
        <NavigateButton
          title="Line up"
          width={100}
          height={50}
          color="#ED6B4E"
          onPress={() => {}}
        />
        <NavigateButton
          title="H2H"
          width={100}
          height={50}
          color="#ED6B4E"
          onPress={() => {}}
        />
      </View>
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
          image={require('../../icons/other/yellowcard.png')}
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
        {rednderLigs(othermatch, match)}
        <View style={{height: 75}}></View>
      </ScrollView>
    </View>
  );
};

export default DetailTeamScreen;
