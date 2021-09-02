import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native';

import Search from '../../icons/other/Search.svg';
import Error from '../../component/ErrorIndicator';
import Indicator from '../../component/ActivityIndicator';
import {SPORTS_IMAGES} from '../../images/Images';
import {SportsButton} from '../../buttons/SportsButton';
import {LigaButton} from '../../buttons/LigaButton';
import {StandingsTable} from '../../component/StandingsTable';
import {getLigsTable} from '../../api/Matches';
import {fetchMoreLigs} from '../../api/Matches';
import {getLiga} from '../../api/Matches';
import styles from './StandingScreenStyles';
const StandingsScreen = ({navigation}) => {
  const [view, setView] = useState('soccer');
  const options = [
    {label: 'Soccer', value: 'soccer', image: SPORTS_IMAGES.SOOCER_IMAGE},
    {
      label: 'Basketball',
      value: 'basketball',
      image: SPORTS_IMAGES.BASKETBALL_IMAGE,
    },
    {
      label: ' Football',
      value: 'football',
      image: SPORTS_IMAGES.FOOTBALL_IMAGE,
    },
    {
      label: ' Baseball',
      value: 'baseball',
      image: SPORTS_IMAGES.BASEBALL_IMAGE,
    },
    {
      label: ' Tennis',
      value: 'tennis',
      image: SPORTS_IMAGES.TENNIS_IMAGE,
    },
    {
      label: ' Volleyball',
      value: 'volleyball',
      image: SPORTS_IMAGES.VOLLEYBALL_IMAGE,
    },
  ];

  const [ligsData, setligsData] = useState([]);
  const [ligsError, setligsError] = useState();
  const [ligsLoading, setligsLoading] = useState();
  const [startAfter, setStartAfter] = useState({});
  const [ligsPerload] = useState(2);
  const [lastLigs, setLastLigs] = useState(false);
  const [value, setValue] = useState('');
  const [timoutHandler, settimoutHandler] = useState();

  const ligsrequest = async () => {
    setligsLoading(true);
    try {
      const ligsdata = await getLigsTable(ligsPerload);
      setligsData([...ligsData, ...ligsdata.ligs]);
      setStartAfter(ligsdata.lastVisible);
    } catch (error) {
      setligsError(error);
      console.log(error);
    } finally {
      setligsLoading(false);
    }
  };
  const onInput = async text => {
    console.log(text);
    setligsLoading(true);
    try {
      const ligsdata = await getLiga(ligsPerload, text);
      setligsData(ligsdata.ligs);
      if (text === '') {
        setLastLigs(false);

        setligsData([]);
        ligsrequest();
      }
      setStartAfter(ligsdata.lastVisible);
    } catch (error) {
      setligsError(error);
      console.log(error);
    } finally {
      setligsLoading(false);
    }
  };

  useEffect(() => {
    ligsrequest();
  }, []);

  const getMoreLigs = async () => {
    try {
      if (!lastLigs) {
        const ligsdata = await fetchMoreLigs(startAfter, ligsPerload);
        setligsData([...ligsData, ...ligsdata.ligs]);
        setStartAfter(ligsdata.lastVisible);
        ligsdata.ligs.length === 0 ? setLastLigs(true) : setLastLigs(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setligsLoading(false);
    }
  };

  const RednderLigs = ({item}) => {
    return (
      <View key={item.id}>
        <LigaButton
          liga={item}
          onPress={() =>
            navigation.push('StandingsDetail', {
              image: item.imageUrl,
              matchID: item.matches[0].id,
              ligaID: item.id,
              title: item.ligaName,
            })
          }
        />

        <StandingsTable teams={item.alltable} />
      </View>
    );
  };

  if (!ligsData) {
    return null;
  }
  if (ligsError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#181829'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.search}>
            <Search />
            <TextInput
              style={styles.textInput}
              color="white"
              placeholderTextColor="#65656B"
              placeholder="Search your competition..."
              onChangeText={text => {
                setValue(text);

                if (timoutHandler) {
                  clearTimeout(timoutHandler);
                }
                const timout = setTimeout(() => onInput(text), 300);
                settimoutHandler(timout);
              }}
              value={value}
            />
          </View>
        </View>
        <View style={styles.navigate}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {options.map(item => (
              <SportsButton
                key={item.label}
                title={view === item.value ? item.label : ''}
                image={item.image}
                width={view === item.value ? 120 : 50}
                height={view === item.value ? 50 : 50}
                color={view === item.value ? '#ED6B4E' : '#222232'}
                onPress={() => {
                  setView(item.value);
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.content}>
          <FlatList
            data={ligsData}
            renderItem={RednderLigs}
            keyExtractor={item => item.id}
            style={{height: Platform.OS === 'ios' ? '90%' : '67%'}}
            onEndReached={getMoreLigs}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={150}
            ListFooterComponent={() =>
              ligsLoading || !lastLigs ? <Indicator /> : null
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StandingsScreen;
