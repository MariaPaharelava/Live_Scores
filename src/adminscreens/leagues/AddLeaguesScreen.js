import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './AddLeaguesScreenStyles';
import FormButton from '../../component/FormButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import AddLeagues from '../../component/AddLegues';
import ChooseCountry from '../../component/ChooseCoutry';
import {v4 as uuidv4} from 'uuid';
const AddLeaguesScreen = ({navigation}) => {
  const [sport, setSport] = useState();
  const [ligaData, setligaData] = useState({
    matches: [],
    alltable: [],
    awaytable: [],
    hometable: [],
  });
  const [match, setMatch] = useState({
    playtime: new Date(),
    firstTeam: {
      teamDetails: {
        name: '',
        imageUrl: '',
      },
    },
    secondTeam: {
      teamDetails: {
        name: '',
        imageUrl: '',
      },
    },
  });

  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(sport => {
      setSport(sport);
    });
  }, []);

  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const hadleAdd = async () => {
    const matchId = uuidv4();
    await firestore()
      .collection(Capitalize(sport))
      .add({...ligaData, matches: [matchId]});
    await firestore()
      .collection(sport + '_matches')
      .doc(matchId)
      .set({...match, id: [matchId]});
  };
  return (
    <Swiper showsButtons={true} loop={false}>
      <View style={styles.container}>
        <AddLeagues
          title="LigaName"
          onChangeText={txt => setligaData(prev => ({...prev, ligaName: txt}))}
        />
        <AddLeagues
          title="LigaCountry"
          onChangeText={txt =>
            setligaData(prev => ({...prev, ligaCountry: txt}))
          }
        />
        <ChooseCountry
          title="LigaImage"
          onValueChange={txt => setligaData(prev => ({...prev, country: txt}))}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>First Team</Text>
        </View>
        <AddLeagues
          title="TeamName"
          onChangeText={txt =>
            setMatch({
              ...match,
              firstTeam: {
                ...match.firstTeam,
                teamDetails: {
                  ...match.firstTeam.teamDetails,
                  name: txt,
                },
              },
            })
          }
        />
        <AddLeagues
          title="ImageTeam"
          onChangeText={txt =>
            setMatch({
              ...match,
              firstTeam: {
                ...match.firstTeam,
                teamDetails: {
                  ...match.firstTeam.teamDetails,
                  imageUrl: txt,
                },
              },
            })
          }
        />
      </View>
      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Second Team</Text>
        </View>
        <AddLeagues
          title="TeamName"
          onChangeText={txt =>
            setMatch({
              ...match,
              secondTeam: {
                ...match.secondTeam,
                teamDetails: {
                  ...match.secondTeam.teamDetails,
                  name: txt,
                },
              },
            })
          }
        />
        <AddLeagues
          title="ImageTeam"
          onChangeText={txt =>
            setMatch({
              ...match,
              secondTeam: {
                ...match.secondTeam,
                teamDetails: {
                  ...match.secondTeam.teamDetails,
                  imageUrl: txt,
                },
              },
            })
          }
        />

        <View style={styles.addButton}>
          <FormButton buttonTitle="Add" onPress={hadleAdd} />
        </View>
      </View>
    </Swiper>
  );
};

export default AddLeaguesScreen;
