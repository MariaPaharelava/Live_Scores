import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import MatchDetail from '../../component/MatchDetail';
import LineUp from '../../component/LineUp';
import H2H from '../../component/H2H';
import Error from '../../component/ErrorIndicator';
import Indicator from '../../component/ActivityIndicator';
import {styles} from './DetailTeamScreenStyles';
import {NavigateButton} from '../../buttons/NavigateButton';
import {getSoccerMatchById} from '../../api/Matches';
import {getBasketballMatchById} from '../../api/Matches';
const DetailTeamScreen = ({navigation, route}) => {
  const {matchID, ligaID, types} = route.params;

  const [matchData, setMatchData] = useState();
  const [matchError, setMatchError] = useState();
  const [matchLoading, setMatchLoading] = useState();

  const [view, setView] = useState('details');

  const options = [
    {label: 'Match Details', value: 'details'},
    {label: 'Line Up', value: 'lineUp'},
    {label: ' H2H', value: 'h2h'},
  ];

  useEffect(() => {
    const matchrequest = async () => {
      setMatchLoading(true);
      try {
        if (types === 'soccer') {
          const match = await getSoccerMatchById(matchID);
          setMatchData(match);
        }
        if (types === 'basketball') {
          const match = await getBasketballMatchById(matchID);
          setMatchData(match);
        }
      } catch (error) {
        setMatchError(error);
        console.log(error);
      } finally {
        setMatchLoading(false);
      }
    };
    matchrequest();
    return () => {
      setMatchData();
    };
  }, [matchID]);
  const selectedView = () => {
    switch (view) {
      case 'details':
        return (
          <MatchDetail
            navigation={navigation}
            currentmatch={matchData}
            matchID={matchID}
            ligaID={ligaID}
            types={types}
          />
        );
      case 'lineUp':
        return (
          <LineUp navigation={navigation} match={matchData} types={types} />
        );
      case 'h2h':
        return (
          <H2H
            navigation={navigation}
            currentmatch={matchData}
            matchID={matchID}
            ligaID={ligaID}
            types={types}
          />
        );
      default:
        return;
    }
  };

  if (matchLoading) {
    return <Indicator />;
  }
  if (!matchData) {
    return null;
  }
  if (matchError) {
    return <Error />;
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
              uri: matchData.firstTeam.team[0].teamDetails.imageUrl,
            }}
          />
          <Text style={styles.text}>
            {matchData.firstTeam.team[0].teamDetails.name}
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
              uri: matchData.secondTeam.team[0].teamDetails.imageUrl,
            }}
          />
          <Text style={styles.text}>
            {matchData.secondTeam.team[0].teamDetails.name}
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
            color={view === item.value ? '#ED6B4E' : '#00000000'}
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
