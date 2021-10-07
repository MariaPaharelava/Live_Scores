import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './EditLeagueScreenStyles';
import FormButton from '../../component/FormButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import ChooseCountry from '../../component/ChooseCoutry';
import {Alert} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {LogBox} from 'react-native';
import {ADMIN_IMAGES} from '../../images/Images';
import {getSoocerTeamById} from '../../api/Matches';
import {AddMatchData} from '../../component/AddMatchData';
import EditLeagues from '../../component/EditLeagues';
import EditLeaguesCountry from '../../component/EditLeaguesCoutry';
const EditLeagueScreen = ({navigation, route}) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {data} = route.params;
  const [ligaData, setligaData] = useState(data);
  const [sport, setSport] = useState();

  const [matches, setMatches] = useState([]);
  const [matchesID, setMatchesID] = useState([]);

  const [teamsLoading, setteamsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [firstTeam, setfirstTeam] = useState();
  const [secondTeam, setsecondTeam] = useState();
  const firstteamrequest = async id => {
    const teamdata = await getSoocerTeamById(id);
    setfirstTeam(teamdata);
  };
  const secondteamrequest = async id => {
    const teamdata = await getSoocerTeamById(id);
    setsecondTeam(teamdata);
  };

  useEffect(() => {
    if (route.params?.matchAdd) {
      setMatches([...matches, route.params.matchAdd]);

      firstteamrequest(route.params.matchAdd.firstTeam.team[0]);
      secondteamrequest(route.params.matchAdd.secondTeam.team[0]);
    }
  }, [route.params?.matchAdd]);

  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(sport => {
      setSport(sport);
    });
  }, [sport]);

  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const hadleAddLeague = async () => {
    matchesID.forEach(async matchId => {
      firestore()
        .collection('Soccer')
        .doc(ligaData.id)
        .update({
          matches: firestore.FieldValue.arrayUnion(`${matchId}`),
        });
    });
    firestore().collection('Soccer').doc(ligaData.id).update({
      imageUrl: ligaData.imageUrl,
      ligaName: ligaData.ligaName,
      ligaCountry: ligaData.ligaCountry,
      country: ligaData.country,
    });
  };
  const hadleAddMatches = async () => {
    matches.forEach(async match => {
      let matchId = uuidv4();
      await firestore()
        .collection(sport + '_matches')
        .doc(matchId)
        .set({...match, id: matchId})
        .then(() => {
          Alert.alert('Matches Add!');
        });
      setMatchesID(prev => [...prev, matchId]);
    });
  };
  const addTeam = (firstT, secondT, time) => {
    const team = [];
    if (firstT && secondT && time == null) {
      return;
    }

    team.push({firstTeam: firstT, secondTeam: secondT, time: time});

    setTeams([...teams, team]);
    setteamsLoading(true);
  };
  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activedot} />}
      paginationStyle={{
        bottom: 100,
      }}>
      <View style={styles.container}>
        <EditLeagues
          title="Liga Name"
          text={ligaData.ligaName}
          onChangeText={txt => setligaData({...ligaData, ligaName: txt})}
        />
        <EditLeagues
          title="Liga Image"
          text={ligaData.imageUrl}
          onChangeText={txt => setligaData({...ligaData, imageUrl: txt})}
        />

        <EditLeaguesCountry
          title="Liga Country"
          text={ligaData.country}
          onValueChange={txt =>
            setligaData({
              ...ligaData,
              country: txt,
              ligaCountry: Capitalize(txt),
            })
          }
        />
      </View>
      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Add Match</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{width: 60, paddingBottom: 5}}
            onPress={() => {
              navigation.navigate('AddMatches', {
                name: 'EditLeagues',
              });
              setfirstTeam();
              setsecondTeam();
              setteamsLoading(false);
            }}>
            <Image
              source={ADMIN_IMAGES.PLUS_IMAGE}
              resizeMode="contain"
              style={styles.imagePlus}
            />
          </TouchableOpacity>
        </View>
        {ligaData.matches.map((match, index) => {
          return (
            <View key={index} style={{marginLeft: 10}}>
              <AddMatchData
                firstTeam={match.firstTeam.team[0]}
                secondTeam={match.secondTeam.team[0]}
                playtime={new Date(match.playtime)}
              />
            </View>
          );
        })}
        {teams.map((team, index) => {
          return (
            <View key={index} style={{marginLeft: 10}}>
              <AddMatchData
                firstTeam={team[0].firstTeam}
                secondTeam={team[0].secondTeam}
                playtime={team[0].time}
              />
            </View>
          );
        })}

        {(firstTeam && secondTeam) !== undefined && !teamsLoading
          ? addTeam(firstTeam, secondTeam, route.params?.matchAdd.playtime)
          : null}

        <View style={styles.addButton}>
          <FormButton
            buttonTitle="Upload New Matches"
            onPress={hadleAddMatches}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.addButton}>
          <FormButton
            buttonTitle="Update League"
            onPress={() => {
              hadleAddLeague();
              navigation.navigate('Leagues');
            }}
          />
        </View>
      </View>
    </Swiper>
  );
};

export default EditLeagueScreen;
