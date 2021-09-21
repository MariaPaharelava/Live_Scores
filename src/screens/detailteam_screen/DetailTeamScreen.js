import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './DetailTeamScreenStyles';
import {NavigateButton} from '../../buttons/NavigateButton';
<<<<<<< HEAD
=======

>>>>>>> 77dc7115c39ec7e6248354b6f08232765a4c39cc
import MatchDetail from '../../component/MatchDetail';
import LineUp from '../../component/LineUp';
import H2H from '../../component/H2H';
import {getMatch} from '../../api/Matches';
import Indicator from '../../api/ActivityIndicator';
import Error from '../../api/ErrorIndicator';

const DetailTeamScreen = ({navigation, route}) => {
  const {matchID} = route.params;

  const [matchData, setMatchData] = useState();
  const [matchError, setMatchError] = useState();
  const [matchLoading, setMatchLoading] = useState();

  const [view, setView] = useState('details');

  const options = [
    {label: 'Match Details', value: 'details'},
    {label: 'Line Up', value: 'lineUp'},
    {label: ' H2H', value: 'h2h'},
  ];

  const matchrequest = async () => {
    setMatchLoading(true);
    try {
      const match = await getMatch(matchID);
      setMatchData(match);
    } catch (error) {
      setMatchError(error);
      console.log(error);
    } finally {
      setMatchLoading(false);
    }
  };

  useEffect(() => {
    matchrequest();
    return () => {
      setMatchData();
    };
  }, []);

  const selectedView = () => {
    switch (view) {
      case 'details':
        return (
          <MatchDetail
            navigation={navigation}
            currentmatch={matchData}
            matchID={matchID}
            // othermatch={othermatch}
          />
        );
      case 'lineUp':
        return <LineUp navigation={navigation} match={matchData} />;
      case 'h2h':
        return <H2H />;
      default:
        return;
    }
  };

  if (matchLoading) {
<<<<<<< HEAD
    return <Indicator />; //loader
=======
    return null;
>>>>>>> 77dc7115c39ec7e6248354b6f08232765a4c39cc
  }
  if (!matchData) {
    return null;
  }
  if (matchError) {
<<<<<<< HEAD
    return <Error />; //error
=======
    return null;
>>>>>>> 77dc7115c39ec7e6248354b6f08232765a4c39cc
  }
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
              uri: matchData.firstTeam.teamDetails.imageUrl,
            }}
          />
          <Text style={styles.text}>
            {matchData.firstTeam.teamDetails.name}
          </Text>
        </View>
        <View style={styles.column}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.textScore}>{matchData.firstTeam.score}</Text>
            <Text style={styles.textScore}>-</Text>
            <Text style={styles.textScore}>{matchData.secondTeam.score}</Text>
          </View>

          <Text style={styles.text}>90.15</Text>
        </View>

        <View style={styles.column}>
          <Image
            style={styles.icon}
            source={{
              uri: matchData.secondTeam.teamDetails.imageUrl,
            }}
          />
          <Text style={styles.text}>
            {matchData.secondTeam.teamDetails.name}
          </Text>
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
      <View>{selectedView()}</View>
    </View>
  );
};

export default DetailTeamScreen;
