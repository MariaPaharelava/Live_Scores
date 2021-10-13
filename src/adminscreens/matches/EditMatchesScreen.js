import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import styles from './EditMatchesScreenStyles';
import FormButton from '../../component/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import {getSoocerTeamById, getSoocerTeams} from '../../api/Matches';
import firestore from '@react-native-firebase/firestore';

import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import ChoosePlayers from '../../component/ChoosePlayers';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import Stats from '../../component/Stats';
import EditTeam from '../../component/EditTeam';
import EditFormation from '../../component/EditFormation';
import ChooseType from '../../component/ChooseType';
const EditMatchesScreen = ({navigation, route}) => {
  const {data} = route.params;
  const [matchData, setmatchData] = useState(data);
  const matchdata = data.playtime.toDate();
  const fteam = data.firstTeam.team[0];
  const steam = data.secondTeam.team[0];
  const [sport, setSport] = useState();
  const [teamsData, setTeamsData] = useState();
  const [teamsError, setteamsError] = useState();
  const [team, setTeam] = useState(fteam);
  const [team2, setTeam2] = useState(steam);
  const [teamsLoading, setteamsLoading] = useState();
  const [date, setDate] = useState(matchdata);
  const [open, setOpen] = useState(false);

  const teamsrequest = async () => {
    setteamsLoading(true);
    try {
      if (sport === 'soccer') {
        const teamdata = await getSoocerTeams();
        setTeamsData(teamdata);
        setmatchData({
          ...matchData,
          firstTeam: {
            ...matchData.firstTeam,
            team: [data.firstTeam.team[0].id],
          },
          secondTeam: {
            ...matchData.secondTeam,
            team: [data.secondTeam.team[0].id],
          },
        });
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

  const updateMatch = async () => {
    firestore()
      .collection('soccer_matches')
      .doc(matchData.id)
      .set({
        ...matchData,
      });
  };

  const teamrequest = async (id, setteam) => {
    const teamdata = await getSoocerTeamById(id);

    setteam(teamdata);
  };

  const RenderPlayers = ({position, index, selectedTeam}) => {
    switch (selectedTeam) {
      case 'firstTeam':
        return (
          <ChoosePlayers
            team={team}
            index={index}
            position={position}
            savedTeam={matchData[selectedTeam].players}
            onValueChange={txt => {
              const temp = {...matchData};
              temp[selectedTeam].players[position][index] = txt;
              setmatchData(temp);
            }}
          />
        );
      case 'secondTeam':
        return (
          <ChoosePlayers
            team={team2}
            index={index}
            position={position}
            savedTeam={matchData[selectedTeam].players}
            onValueChange={txt => {
              const temp = {...matchData};
              temp[selectedTeam].players[position][index] = txt;
              setmatchData(temp);
            }}
          />
        );

      default:
        return;
    }
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
      <ScrollView style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>Match Info</Text>
        </View>

        <View style={{marginBottom: 15}}>
          <View style={[styles.action, {alignItems: 'center'}]}>
            <Text style={{color: 'white'}}>{date.toString().slice(0, 24)}</Text>
          </View>
          <TouchableOpacity
            style={styles.dataButton}
            onPress={() => setOpen(true)}>
            <Text style={styles.dataButtonTxt}>Change Date</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="datetime"
            open={open}
            date={date}
            onConfirm={newDate => {
              setOpen(false);
              setDate(newDate);
              setmatchData({...matchData, playtime: newDate});
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <ChooseType
          title="Choose Type"
          label={matchData.type}
          onValueChange={txt =>
            setmatchData({
              ...matchData,
              type: txt,
            })
          }
        />

        <View style={styles.statsView}>
          <Text style={[styles.title, {color: '#4030f0'}]}>
            {fteam.teamDetails.name}
          </Text>
          <Text style={styles.title}>Stats</Text>
          <Text style={[styles.title, {color: '#4030f0'}]}>
            {steam.teamDetails.name}
          </Text>
        </View>

        <Stats
          title="Shooting"
          onChangeFirstTeamText={txt =>
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
                stats: {
                  ...matchData.firstTeam.stats,
                  shooting: txt,
                },
              },
            })
          }
          valueFirstTeam={matchData.firstTeam.stats.shooting}
          onChangeSecondTeamText={txt =>
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
                stats: {
                  ...matchData.secondTeam.stats,
                  shooting: txt,
                },
              },
            })
          }
          valueSecondTeam={matchData.secondTeam.stats.shooting}
        />

        <Stats
          title="Attacks"
          onChangeFirstTeamText={txt =>
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
                stats: {
                  ...matchData.firstTeam.stats,
                  attacks: txt,
                },
              },
            })
          }
          valueFirstTeam={matchData.firstTeam.stats.attacks}
          onChangeSecondTeamText={txt =>
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
                stats: {
                  ...matchData.secondTeam.stats,
                  attacks: txt,
                },
              },
            })
          }
          valueSecondTeam={matchData.secondTeam.stats.attacks}
        />

        <Stats
          title="Possesion"
          onChangeFirstTeamText={txt =>
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
                stats: {
                  ...matchData.firstTeam.stats,
                  possesion: txt,
                },
              },
            })
          }
          valueFirstTeam={matchData.firstTeam.stats.possesion}
          onChangeSecondTeamText={txt =>
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
                stats: {
                  ...matchData.secondTeam.stats,
                  possesion: txt,
                },
              },
            })
          }
          valueSecondTeam={matchData.secondTeam.stats.possesion}
        />

        <Stats
          title="Cards"
          onChangeFirstTeamText={txt =>
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
                stats: {
                  ...matchData.firstTeam.stats,
                  cards: txt,
                },
              },
            })
          }
          valueFirstTeam={matchData.firstTeam.stats.cards}
          onChangeSecondTeamText={txt =>
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
                stats: {
                  ...matchData.secondTeam.stats,
                  cards: txt,
                },
              },
            })
          }
          valueSecondTeam={matchData.secondTeam.stats.cards}
        />
        <Stats
          title="Corners"
          onChangeFirstTeamText={txt =>
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
                stats: {
                  ...matchData.firstTeam.stats,
                  corners: txt,
                },
              },
            })
          }
          valueFirstTeam={matchData.firstTeam.stats.corners}
          onChangeSecondTeamText={txt =>
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
                stats: {
                  ...matchData.secondTeam.stats,
                  corners: txt,
                },
              },
            })
          }
          valueSecondTeam={matchData.secondTeam.stats.corners}
        />
        <View style={styles.statsView}>
          <Text style={[styles.title, {color: '#4030f0'}]}>
            {fteam.teamDetails.name}
          </Text>
          <Text style={styles.title}>Score</Text>
          <Text style={[styles.title, {color: '#4030f0'}]}>
            {steam.teamDetails.name}
          </Text>
        </View>
        <Stats
          onChangeFirstTeamText={txt =>
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
                score: txt,
              },
            })
          }
          valueFirstTeam={matchData.firstTeam.score}
          onChangeSecondTeamText={txt =>
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
                score: txt,
              },
            })
          }
          valueSecondTeam={matchData.secondTeam.score}
        />
      </ScrollView>

      <View style={styles.container}>
        <View style={styles.Team}>
          <Text style={styles.titleTeam}>First Team</Text>
        </View>
        <EditTeam
          title="Edit First Team"
          teams={teamsData}
          team={team.teamDetails.name}
          onValueChange={txt => {
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
                team: [txt],
              },
            });
            teamrequest(txt, setTeam);
          }}
        />
        <EditFormation
          title="Edit Formation"
          label={matchData.firstTeam.formation}
          onValueChange={txt =>
            setmatchData({
              ...matchData,
              firstTeam: {
                ...matchData.firstTeam,
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
              {gkcPlayers(matchData.firstTeam.formation ? 1 : 0, 'firstTeam')}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>DEF</Text>
            </View>
            <View>
              {defPlayers(
                matchData.firstTeam.formation
                  ? matchData.firstTeam.formation[0]
                  : 0,
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
                matchData.firstTeam.formation
                  ? matchData.firstTeam.formation[1]
                  : 0,
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
                matchData.firstTeam.formation
                  ? matchData.firstTeam.formation[2]
                  : 0,
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
        <EditTeam
          title="Edit Second Team"
          teams={teamsData}
          team={team2.teamDetails.name}
          onValueChange={txt => {
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
                team: [txt],
              },
            });
            teamrequest(txt, setTeam2);
          }}
        />
        <EditFormation
          title="Edit Formation"
          label={matchData.secondTeam.formation}
          onValueChange={txt =>
            setmatchData({
              ...matchData,
              secondTeam: {
                ...matchData.secondTeam,
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
              {gkcPlayers(matchData.secondTeam.formation ? 1 : 0, 'secondTeam')}
            </View>
          </View>
          <View>
            <View style={styles.players}>
              <Text style={styles.titlePlayers}>DEF</Text>
            </View>
            <View>
              {defPlayers(
                matchData.secondTeam.formation
                  ? matchData.secondTeam.formation[0]
                  : 0,
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
                matchData.secondTeam.formation
                  ? matchData.secondTeam.formation[1]
                  : 0,
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
                matchData.secondTeam.formation
                  ? matchData.secondTeam.formation[2]
                  : 0,
                'secondTeam',
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <View style={styles.addButton}>
          <FormButton
            buttonTitle="Update Match"
            onPress={() => {
              updateMatch();
              navigation.navigate('Matches');
            }}
          />
        </View>
      </View>
    </Swiper>
  );
};

export default EditMatchesScreen;
