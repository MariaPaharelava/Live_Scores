import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
import {NavigateButton} from '../buttons/NavigateButton';
import TeamScheme from './TeamSheme';

const LineUp = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  match,
  types,
  ...props
}) => {
  const [team, setTeam] = useState(match.firstTeam.team[0].teamDetails.name);
  const [formation, setFormation] = useState(match.firstTeam.formation);
  const teams = [
    {
      label: match.firstTeam.team[0].teamDetails.name,
      value: match.firstTeam.team[0].teamDetails.name,
      formation: match.firstTeam.formation,
    },
    {
      label: match.secondTeam.team[0].teamDetails.name,
      value: match.secondTeam.team[0].teamDetails.name,
      formation: match.secondTeam.formation,
    },
  ];
  const selectedSport = () => {
    switch (types) {
      case 'soccer':
        return (
          <View style={styles.wrapperScheme}>
            <Text style={styles.formText}>Formation</Text>

            <Text style={styles.scheme}>({formation.join('-')})</Text>
          </View>
        );
      case 'basketball':
        return <View style={styles.wrapperScheme}></View>;

      default:
        return;
    }
  };

  const selectedTeam = () => {
    switch (team) {
      case match.firstTeam.team[0].teamDetails.name:
        return (
          <TeamScheme
            navigation={navigation}
            team={match.firstTeam}
            types={types}
          />
        );
      case match.secondTeam.team[0].teamDetails.name:
        return (
          <TeamScheme
            navigation={navigation}
            team={match.secondTeam}
            types={types}
          />
        );

      default:
        return;
    }
  };
  return (
    <View style={styles.container}>
      {selectedSport()}
      <View style={styles.navigate}>
        {teams.map(item => (
          <NavigateButton
            key={item.label}
            title={item.label}
            width={100}
            height={35}
            color={team === item.value ? '#ED6B4E' : '#00000000'}
            onPress={() => {
              setTeam(item.value);
              setFormation(item.formation);
            }}
          />
        ))}
      </View>
      <View tyle={styles.params}>{selectedTeam()}</View>
    </View>
  );
};

export default LineUp;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  wrapperScheme: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formText: {
    color: colors.white,
    ...fonts.defaultFont,
    fontSize: 20,
    marginRight: 20,
  },
  scheme: {color: '#C4C4C4', ...fonts.defaultFont, fontSize: 14},
  navigate: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 10,
  },
  params: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
});
