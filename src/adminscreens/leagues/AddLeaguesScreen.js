import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './AddLeaguesScreenStyles';
import FormButton from '../../component/FormButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import AddLeagues from '../../component/AddLegues';
import ChooseCountry from '../../component/ChooseCoutry';
import {Alert} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import {LogBox} from 'react-native';

import {ADMIN_IMAGES} from '../../images/Images';
import {getSoocerTeamById} from '../../api/Matches';
import {AddMatchData} from '../../component/AddMatchData';
const AddLeaguesScreen = ({navigation, route}) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
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
  const [sport, setSport] = useState();

  const [ligaData, setligaData] = useState({
    matches: [],
  });

  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(sport => {
      setSport(sport);
    });
  }, [sport]);

  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const hadleAddLeague = async () => {
    const ligaId = uuidv4();

    await firestore()
      .collection(Capitalize(sport))
      .doc(ligaId)
      .set({...ligaData, matches: matchesID, id: ligaId})
      .then(() => {
        Alert.alert('Liga Add!');
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
  console.log('Team', teams);
  console.log('First Team', firstTeam);
  console.log('Second Team', secondTeam);
  return (
    <Swiper showsButtons={true} loop={false}>
      <View style={styles.container}>
        <AddLeagues
          title="Liga Name"
          onChangeText={txt => setligaData(prev => ({...prev, ligaName: txt}))}
        />
        <AddLeagues
          title="Liga Image"
          onChangeText={txt => setligaData(prev => ({...prev, imageUrl: txt}))}
        />

        <ChooseCountry
          title="Liga Country"
          onValueChange={txt =>
            setligaData(prev => ({
              ...prev,
              country: txt,
              ligaCountry: Capitalize(txt),
            }))
          }
        />
      </View>
      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Add Match</Text>
        </View>
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
        <TouchableOpacity
          activeOpacity={0.5}
          style={{width: 60}}
          onPress={() => {
            navigation.navigate('AddMatches');
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
        <View style={styles.addButton}>
          <FormButton
            buttonTitle="Add Matches to League"
            onPress={hadleAddMatches}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.addButton}>
          <FormButton buttonTitle="Add League" onPress={hadleAddLeague} />
        </View>
      </View>
    </Swiper>
  );
};

export default AddLeaguesScreen;
