import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './AddMatchesScreenStyles';
import FormButton from '../../component/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import {getSoocerTeamById, getSoocerTeams} from '../../api/Matches';
import ChooseTeam from '../../component/ChooseTeam';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import ChooseFormation from '../../component/ChooseFormation';
import ChoosePlayers from '../../component/ChoosePlayers';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
const AddMatchesScreen = ({navigation, route}) => {
  const {name} = route.params;
  const [sport, setSport] = useState();
  const [teamsData, setTeamsData] = useState();
  const [teamsError, setteamsError] = useState();
  const [team, setTeam] = useState();
  const [teamsLoading, setteamsLoading] = useState();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
    type: 'UPC',
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

  const teamrequest = async id => {
    const teamdata = await getSoocerTeamById(id);
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

  if (!teamsData) {
    return <Indicator />;
  }

  if (teamsError) {
    return <Error />;
  }
  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activedot} />}
      paginationStyle={{
        bottom: 100,
      }}>
      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Match</Text>
        </View>

        <>
          <View style={[styles.action, {alignItems: 'center'}]}>
            <Text style={{color: 'white'}}>{date.toString().slice(0, 24)}</Text>
          </View>
          <TouchableOpacity
            style={styles.dataButton}
            onPress={() => setOpen(true)}>
            <Text style={styles.dataButtonTxt}>Choose Date</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="datetime"
            open={open}
            date={date}
            onConfirm={newDate => {
              setOpen(false);
              setDate(newDate);
              setMatch({...match, playtime: newDate});
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
            buttonTitle="Add Match"
            onPress={() => {
              navigation.navigate({
                name: name,
                params: {matchAdd: match, team: team},
                merge: true,
              });

              setMatch({
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
            }}
          />
        </View>
      </View>
    </Swiper>
  );
};

export default AddMatchesScreen;
