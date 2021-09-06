import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SPORTS_IMAGES} from '../images/Images';
const TeamScheme = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  team,
  othermatch,
  ...props
}) => {
  const hasIcon = pl => {
    if (pl.captain) {
      return (
        <Image
          style={{marginLeft: -5}}
          source={require('../icons/other/captain.png')}
        />
      );
    }
    if (pl.card) {
      return (
        <Image
          style={{marginLeft: -5}}
          source={require('../icons/other/yellowcard.png')}
        />
      );
    }
    if (pl.goal) {
      return (
        <Image
          style={{marginLeft: -8}}
          source={require('../icons/other/ball.png')}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SPORTS_IMAGES.FIELD_IMAGE}
        resizeMode="center"
        style={styles.image}>
        {Object.keys(team.players).map(position => (
          <View key={position} style={styles.position}>
            {team.players[position].map(player => (
              <View
                key={player.name}
                style={[
                  styles.namesPlayers,
                  {
                    padding:
                      team.formation.length > 3
                        ? Platform.OS === 'ios'
                          ? 5
                          : 0
                        : Platform.OS === 'ios'
                        ? 12
                        : 5,
                  },
                ]}>
                <View style={styles.captain}>
                  <View style={styles.number}>
                    <Text style={styles.text}>{player.number}</Text>
                  </View>
                  {hasIcon(player)}
                </View>
                <View style={styles.name}>
                  <Text style={styles.text}>{player.name}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ImageBackground>
    </View>
  );
};
export default TeamScheme;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '83%',
    alignItems: 'center',
  },
  number: {
    backgroundColor: '#36B585',
    borderRadius: 25,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    borderRadius: 5,
    backgroundColor: '#558F78',
    borderWidth: 0.3,
    borderColor: 'yellow',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  captain: {
    flexDirection: 'row',
  },
  position: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  namesPlayers: {
    marginHorizontal: Platform.OS === 'ios' ? -10 : -35,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
