import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
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
  ...props
}) => {
  const [team, setTeam] = useState(match.firstTeam.teamDetails.id);
  const [formation, setFormation] = useState(match.firstTeam.formation);
  const teams = [
    {
      label: match.firstTeam.teamDetails.name,
      value: match.firstTeam.teamDetails.id,
      formation: match.firstTeam.formation,
    },
    {
      label: match.secondTeam.teamDetails.name,
      value: match.secondTeam.teamDetails.id,
      formation: match.secondTeam.formation,
    },
  ];
  // const rednderFormation = match => {
  //   return match.map(team => {
  //     if (team == match.firstTeam) {
  //       return <Text style={styles.scheme}>({team.firstTeam.formation})</Text>;
  //     } else {
  //       return <Text style={styles.scheme}>({team.firstTeam.formation})</Text>;
  //     }
  //   });
  // };
  const selectedTeam = () => {
    switch (team) {
      case match.firstTeam.teamDetails.id:
        return <TeamScheme navigation={navigation} team={match.firstTeam} />;
      case match.secondTeam.teamDetails.id:
        return <TeamScheme navigation={navigation} team={match.secondTeam} />;

      default:
        return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapperScheme}>
        <Text style={styles.formText}>Formation</Text>

        <Text style={styles.scheme}>{formation.join('-')}</Text>
      </View>
      <View style={styles.navigate}>
        {teams.map(item => (
          <NavigateButton
            key={item.label}
            title={item.label}
            width={100}
            height={35}
            color={team == item.value ? '#ED6B4E' : '#00000000'}
            onPress={() => {
              setTeam(item.value), setFormation(item.formation);
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
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 20 : 10,
    marginLeft: 20,
  },
  params: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
});
