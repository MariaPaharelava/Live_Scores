import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Button} from 'react-native';
import styles from './AddLeaguesScreenStyles';
import FormButton from '../../component/FormButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import AddLeagues from '../../component/AddLegues';
import ChooseCountry from '../../component/ChooseCoutry';
import {Alert} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import {getSoocerTeamById, getSoocerTeams} from '../../api/Matches';
import ChooseTeam from '../../component/ChooseTeam';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import ChooseFormation from '../../component/ChooseFormation';
import ChoosePlayers from '../../component/ChoosePlayers';
import {ADMIN_IMAGES} from '../../images/Images';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import ChooseType from '../../component/ChooseType';
const AddLeaguesScreen = ({navigation}) => {
  const [sport, setSport] = useState();
  const [teamsData, setTeamsData] = useState();
  const [teamsError, setteamsError] = useState();
  const [team, setTeam] = useState();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [firstTeamPlayers, setfirstTeamPlayers] = useState({
    GKC: [],
    DEF: [],
    MID: [],
    FWD: [],
  });
  const [defPlayer, setdefPlayer] = useState([]);

  const [secondTeamPlayers, setsecondTeamPlayers] = useState({});

  const [teamsLoading, setteamsLoading] = useState();

  const [ligaData, setligaData] = useState({
    matches: [],
  });
  const [match, setMatch] = useState({
    firstTeam: {
      players: {
        GKC: [],
        DEF: [],
        MID: [],
        FWD: [],
      },
    },
    secondTeam: {
      players: {
        GKC: [],
        DEF: [],
        MID: [],
        FWD: [],
      },
    },
  });
  console.log(defPlayer);
  const teamsrequest = async () => {
    setteamsLoading(true);
    try {
      if (sport === 'soccer') {
        const teamdata = await getSoocerTeams();
        setTeamsData(teamdata);
      }

      // if (types === 'basketball') {
      //   const table = await getAwayTableBasketballMatches(ligaID);
      //   setTableMatchesData(table);
      // }
    } catch (error) {
      setteamsError(error);
      console.log(error);
    } finally {
      setteamsLoading(false);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(sport => {
      setSport(sport);
    });
    teamsrequest(sport);
  }, [sport]);

  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const teamrequest = async id => {
    const teamdata = await getSoocerTeamById(id);
    console.log(teamdata);
    setTeam(teamdata);
  };
  console.log(match);
  const RenderPlayers = ({position, index}) => {
    console.log(index);
    return (
      <ChoosePlayers
        team={team}
        index={index}
        position={position}
        savedTeam={match.firstTeam.players}
        // onValueChange={txt =>
        //   setMatch({
        //     ...match,
        //     firstTeam: {
        //       ...match.firstTeam,
        //       players: {
        //         ...match.firstTeam.players,
        //         DEF: [...match.firstTeam.players.DEF, txt],
        //       },
        //     },
        //   })
        // }
        onValueChange={txt => {
          const temp = {...match};
          temp.firstTeam.players[position][index] = txt;
          setMatch(temp);
        }}
      />
    );
  };
  const defPlayers = n => {
    const def = [];
    for (let i = 0; i < n; i++) {
      def.push(<RenderPlayers key={i} index={i} position={'DEF'} />);
    }
    return def;
  };

  const midPlayers = n => {
    const mid = [];
    for (let i = 0; i < n; i++) {
      mid.push(<RenderPlayers key={i} position={'MID'} />);
    }
    return mid;
  };
  const fwdPlayers = n => {
    const fwd = [];
    for (let i = 0; i < n; i++) {
      fwd.push(<RenderPlayers key={i} position={'FWD'} />);
    }
    return fwd;
  };
  const gkcPlayers = n => {
    const gkc = [];
    for (let i = 0; i < n; i++) {
      gkc.push(<RenderPlayers key={i} position={'GKC'} />);
    }
    return gkc;
  };

  const hadleAdd = async () => {
    const matchId = uuidv4();
    const ligaId = uuidv4();

    await firestore()
      .collection(sport + '_matches')
      .doc(matchId)
      .set({...match, id: [matchId]})
      .then(() => {
        Alert.alert('Liga Add!');
      });
    await firestore()
      .collection(Capitalize(sport))
      .add({...ligaData, matches: [matchId], id: [ligaId]});
  };

  if (!teamsData) {
    return <Indicator />;
  }

  if (teamsError) {
    return <Error />;
  }
  console.log(match);
  console.log(date);
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
          <Text style={styles.titleTeam}>Match</Text>
        </View>
        <ChooseType
          title="Choose Type Match"
          onValueChange={txt =>
            setMatch(prev => ({
              ...prev,
              type: txt,
            }))
          }
        />
        <>
          <Button title="Choose Date" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            mode="datetime"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setMatch({...match, playtime: date});
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
      </View>

      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>First Team</Text>
        </View>
        <ChooseTeam
          title="Choose First Team"
          teams={teamsData}
          onValueChange={txt => {
            setMatch({
              ...match,
              firstTeam: {
                ...match.firstTeam,
                team: [txt],
              },
            });
            teamrequest(txt);
          }}
        />
        <ChooseFormation
          title="Choose Formation"
          onValueChange={txt =>
            setMatch({
              ...match,
              firstTeam: {
                ...match.firstTeam,
                formation: txt,
              },
            })
          }
        />
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Choose Players</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>GKC</Text>
            </View>
            <View>{gkcPlayers(match.firstTeam.formation ? 1 : 0)}</View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>DEF</Text>
            </View>
            <View>
              {defPlayers(
                match.firstTeam.formation ? match.firstTeam.formation[0] : 0,
              )}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>MID</Text>
            </View>
            <View>
              {midPlayers(
                match.firstTeam.formation ? match.firstTeam.formation[1] : 0,
              )}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>FWD</Text>
            </View>
            <View>
              {fwdPlayers(
                match.firstTeam.formation ? match.firstTeam.formation[2] : 0,
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Second Team</Text>
        </View>
        <ChooseTeam
          title="Choose Second Team"
          teams={teamsData}
          onValueChange={txt => {
            setMatch({
              ...match,
              secondTeam: {
                ...match.secondTeam,
                team: [txt],
              },
            });
            teamrequest(txt);
          }}
        />
        <ChooseFormation
          title="Choose Formation"
          onValueChange={txt =>
            setMatch({
              ...match,
              secondTeam: {
                ...match.secondTeam,
                formation: txt,
              },
            })
          }
        />
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Choose Players</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>GKC</Text>
            </View>
            <View>{gkcPlayers(match.secondTeam.formation ? 1 : 0)}</View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>DEF</Text>
            </View>
            <View>
              {defPlayers(
                match.secondTeam.formation ? match.secondTeam.formation[0] : 0,
              )}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>MID</Text>
            </View>
            <View>
              {midPlayers(
                match.secondTeam.formation ? match.secondTeam.formation[1] : 0,
              )}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>FWD</Text>
            </View>
            <View>
              {fwdPlayers(
                match.secondTeam.formation ? match.secondTeam.formation[2] : 0,
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <View style={styles.addButton}>
          <FormButton
            buttonTitle="Add One More Match"
            onPress={() => console.log('Pressed')}
          />
        </View>
        <View style={styles.addButton}>
          <FormButton buttonTitle="Add League" onPress={hadleAdd} />
        </View>
      </View>
    </Swiper>
  );
};

export default AddLeaguesScreen;
