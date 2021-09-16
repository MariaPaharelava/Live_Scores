import React, {useState} from 'react';
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

import MatchDetail from '../../component/MatchDetail';
import LineUp from '../../component/LineUp';
import H2H from '../../component/H2H';

const DetailTeamScreen = ({navigation, route}) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const {match, othermatch} = route.params;
  const [view, setView] = useState('details');
  const options = [
    {label: 'Match Details', value: 'details'},
    {label: 'Line Up', value: 'lineUp'},
    {label: ' H2H', value: 'h2h'},
  ];

  const selectedView = () => {
    switch (view) {
      case 'details':
        return (
          <MatchDetail
            navigation={navigation}
            match={match}
            othermatch={othermatch}
          />
        );
      case 'lineUp':
        return <LineUp navigation={navigation} match={match} />;
      case 'h2h':
        return <H2H />;
      default:
        return;
    }
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
        {options.map(item => (
          <NavigateButton
            key={item.label}
            title={item.label}
            width={100}
            height={50}
            color={view == item.value ? '#ED6B4E' : '#00000000'}
            onPress={() => {
              setView(item.value);
            }}
          />
        ))}
      </View>
      <View tyle={styles.params}>{selectedView()}</View>
    </View>
  );
};

export default DetailTeamScreen;
