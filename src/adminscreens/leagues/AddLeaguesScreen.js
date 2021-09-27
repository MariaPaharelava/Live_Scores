import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
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
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import ChooseType from '../../component/ChooseType';
import {Score} from '../../component/Score';
const AddLeaguesScreen = ({navigation}) => {
  const [sport, setSport] = useState();
  const [teamsData, setTeamsData] = useState();
  const [teamsError, setteamsError] = useState();
  const [team, setTeam] = useState();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [firstTeamstats, setfirstTeamstats] = useState({
    attacks: '0',
    cards: '0',
    possesion: '0',
    shooting: '0',
    corners: '0',
  });
  const [secondTeamstats, setsecondTeamstats] = useState({
    attacks: '0',
    cards: '0',
    possesion: '0',
    shooting: '0',
    corners: '0',
  });

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
      stats: {
        attacks: '0',
        cards: '0',
        possesion: '0',
        shooting: '0',
        corners: '0',
      },
      score: '0',
    },
    secondTeam: {
      players: {
        GKC: [],
        DEF: [],
        MID: [],
        FWD: [],
      },
      stats: {
        attacks: '0',
        cards: '0',
        possesion: '0',
        shooting: '0',
        corners: '0',
      },
      score: '0',
    },
  });
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
  const RenderPlayers = ({position, index, selectedTeam}) => {
    return (
      <ChoosePlayers
        team={team}
        index={index}
        position={position}
        savedTeam={match[selectedTeam].players}
        onValueChange={txt => {
          const temp = {...match};
          temp[selectedTeam].players[position][index] = txt;
          setMatch(temp);
        }}
      />
    );
  };
  const defPlayers = (n, selected) => {
    const def = [];
    for (let i = 0; i < n; i++) {
      def.push(
        <RenderPlayers
          key={i}
          index={i}
          position={'DEF'}
          selectedTeam={selected}
        />,
      );
    }
    return def;
  };

  const midPlayers = (n, selected) => {
    const mid = [];
    for (let i = 0; i < n; i++) {
      mid.push(
        <RenderPlayers
          key={i}
          index={i}
          position={'MID'}
          selectedTeam={selected}
        />,
      );
    }
    return mid;
  };
  const fwdPlayers = (n, selected) => {
    const fwd = [];
    for (let i = 0; i < n; i++) {
      fwd.push(
        <RenderPlayers
          key={i}
          index={i}
          position={'FWD'}
          selectedTeam={selected}
        />,
      );
    }
    return fwd;
  };
  const gkcPlayers = (n, selected) => {
    const gkc = [];
    for (let i = 0; i < n; ++i) {
      gkc.push(
        <RenderPlayers
          key={i}
          index={i}
          position={'GKC'}
          selectedTeam={selected}
        />,
      );
    }
    return gkc;
  };

  const hadleAdd = async () => {
    const matchId = uuidv4();
    const ligaId = uuidv4();

    await firestore()
      .collection(sport + '_matches')
      .doc(matchId)
      .set({...match, id: matchId})
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
  console.log(firstTeamstats, secondTeamstats);
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
          <View style={[styles.action, {alignItems: 'center'}]}>
            <Text style={{color: 'white'}}>{JSON.stringify(date)}</Text>
          </View>
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
          {/* <View style={styles.statsView}>
            <Text style={[styles.title, {opacity: 0.7}]}>FirstTeam</Text>
            <Text style={styles.title}>Stats</Text>
            <Text style={[styles.title, {opacity: 0.7}]}>SecondTeam</Text>
          </View>

          <View style={styles.containerStats}>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setfirstTeamstats({...firstTeamstats, shooting: txt})
              }
              value={firstTeamstats.shooting}
            />

            <Text style={styles.scoreText}>Shooting</Text>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setsecondTeamstats({...secondTeamstats, shooting: txt})
              }
              value={secondTeamstats.shooting}
            />
          </View>
          <View style={styles.containerStats}>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setfirstTeamstats({...firstTeamstats, attacks: txt})
              }
              value={firstTeamstats.attacks}
            />

            <Text style={styles.scoreText}>Attacks</Text>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setsecondTeamstats({...secondTeamstats, attacks: txt})
              }
              value={secondTeamstats.attacks}
            />
          </View>
          <View style={styles.containerStats}>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setfirstTeamstats({...firstTeamstats, possesion: txt})
              }
              value={firstTeamstats.possesion}
            />

            <Text style={styles.scoreText}>Possesion</Text>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setsecondTeamstats({...secondTeamstats, possesion: txt})
              }
              value={secondTeamstats.possesion}
            />
          </View>
          <View style={styles.containerStats}>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setfirstTeamstats({...firstTeamstats, cards: txt})
              }
              value={firstTeamstats.cards}
            />

            <Text style={styles.scoreText}>Cards</Text>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setsecondTeamstats({...secondTeamstats, cards: txt})
              }
              value={secondTeamstats.cards}
            />
          </View>
          <View style={styles.containerStats}>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setfirstTeamstats({...firstTeamstats, corners: txt})
              }
              value={firstTeamstats.corners}
            />

            <Text style={styles.scoreText}>Corners</Text>
            <TextInput
              placeholderTextColor="white"
              autoCorrect={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={txt =>
                setsecondTeamstats({...secondTeamstats, corners: txt})
              }
              value={secondTeamstats.corners}
            />
          </View> */}
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
            <View>
              {gkcPlayers(match.firstTeam.formation ? 1 : 0, 'firstTeam')}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>DEF</Text>
            </View>
            <View>
              {defPlayers(
                match.firstTeam.formation ? match.firstTeam.formation[0] : 0,
                'firstTeam',
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
                'firstTeam',
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
                'firstTeam',
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
            <View>
              {gkcPlayers(match.secondTeam.formation ? 1 : 0, 'secondTeam')}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>DEF</Text>
            </View>
            <View>
              {defPlayers(
                match.secondTeam.formation ? match.secondTeam.formation[0] : 0,
                'secondTeam',
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
                'secondTeam',
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
                'secondTeam',
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
