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
  types,
  othermatch,
  ...props
}) => {
  const selectedSport = () => {
    switch (types) {
      case 'soccer':
        return (
          <ImageBackground
            source={SPORTS_IMAGES.FIELD_IMAGE}
            style={styles.imageSoccer}>
            {Object.keys(team.players).map(position => (
              <View key={position} style={styles.positionSoccer}>
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
                    </View>
                    <View style={styles.name}>
                      <Text style={styles.text}>{player.name}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ImageBackground>
        );
      case 'basketball':
        return (
          <ImageBackground
            source={SPORTS_IMAGES.BASKETBALLFIELD_IMAGE}
            style={styles.imageBasketball}>
            {Object.keys(team.players).map(position => (
              <View key={position} style={styles.positionBasketball}>
                {team.players[position].map(player => (
                  <View key={player.name} style={styles.namesPlayers}>
                    <View style={styles.captain}>
                      <View style={styles.number}>
                        <Text style={styles.text}>{player.number}</Text>
                      </View>
                    </View>
                    <View style={styles.name}>
                      <Text style={styles.text}>{player.name}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ImageBackground>
        );

      default:
        return;
    }
  };

  return <View style={styles.container}>{selectedSport()}</View>;
};
export default TeamScheme;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSoccer: {
    width: '100%',
    height: '83%',
    alignItems: 'center',
  },
  imageBasketball: {
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
  positionSoccer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  positionBasketball: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
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
