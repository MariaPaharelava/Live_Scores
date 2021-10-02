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
import {SportsButton} from '../../buttons/SportsButton';
import {LigaButton} from '../../buttons/LigaButton';
import {StandingsTable} from '../../component/StandingsTable';
import {
  fetchBasketballMoreLigs,
  getBasketballLiga,
  getBasketballLigsTable,
  getSoccerLigsTable,
} from '../../api/Matches';
import {fetchSoccerMoreLigs} from '../../api/Matches';
import {getSoccerLiga} from '../../api/Matches';
import {SPORTS} from '../../constant/Sport';
import styles from './StandingScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StandingsScreen = ({navigation}) => {
  const [types, setTypes] = useState('');
  const [ligsData, setligsData] = useState([]);
  const [ligsError, setligsError] = useState();
  const [ligsLoading, setligsLoading] = useState();
  const [startAfter, setStartAfter] = useState({});
  const [ligsPerload] = useState(4);
  const [lastLigs, setLastLigs] = useState(false);
  const [value, setValue] = useState('');
  const [timoutHandler, settimoutHandler] = useState();
  const HandleSportPress = type => {
    if (type !== types) {
      setTypes(type);
      setligsData([]);
      setValue('');
      setStartAfter({});
      setLastLigs(false);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(value => {
      if (value === null) {
        AsyncStorage.setItem('@storage_Key', 'soccer');
        setTypes('soccer');
      } else {
        setTypes(value);
      }
    });
  }, []);

  const ligsrequest = async () => {
    setligsLoading(true);
    try {
      if (types === 'soccer') {
        const ligsdata = await getSoccerLigsTable(ligsPerload);
        setligsData([...ligsData, ...ligsdata.ligs]);
        setStartAfter(ligsdata.lastVisible);
      }
      if (types === 'basketball') {
        const ligsdata = await getBasketballLigsTable(ligsPerload);
        setligsData([...ligsData, ...ligsdata.ligs]);
        setStartAfter(ligsdata.lastVisible);
      }
    } catch (error) {
      setligsError(error);
      console.log(error);
    } finally {
      setligsLoading(false);
    }
  };
  const onInput = async text => {
    setligsLoading(true);
    try {
      if (types === 'soccer') {
        const ligsdata = await getSoccerLiga(ligsPerload, text);
        setligsData(ligsdata.ligs);
        if (text === '') {
          setLastLigs(false);

          setligsData([]);
          ligsrequest();
        }
        setStartAfter(ligsdata.lastVisible);
      }
      if (types === 'basketball') {
        const ligsdata = await getBasketballLiga(ligsPerload, text);
        setligsData(ligsdata.ligs);
        if (text === '') {
          setLastLigs(false);

          setligsData([]);
          ligsrequest();
        }
        setStartAfter(ligsdata.lastVisible);
      }
    } catch (error) {
      setligsError(error);
      console.log(error);
    } finally {
      setligsLoading(false);
    }
  };

  useEffect(() => {
    ligsrequest();
  }, [types]);

  const getMoreLigs = async () => {
    try {
      if (!lastLigs) {
        if (types === 'soccer') {
          const ligsdata = await fetchSoccerMoreLigs(
            startAfter,
            ligsPerload,
            value,
          );
          setligsData([...ligsData, ...ligsdata.ligs]);
          setStartAfter(ligsdata.lastVisible);
          ligsdata.ligs.length === 0 ? setLastLigs(true) : setLastLigs(false);
        }
        if (types === 'basketball') {
          const ligsdata = await fetchBasketballMoreLigs(
            startAfter,
            ligsPerload,
            value,
          );
          setligsData([...ligsData, ...ligsdata.ligs]);
          setStartAfter(ligsdata.lastVisible);
          ligsdata.ligs.length === 0 ? setLastLigs(true) : setLastLigs(false);
        }
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
              types: types,
            })
          }
        />

        <StandingsTable types={types} ligaID={item.id} />
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
                const timout = setTimeout(() => onInput(text), 100);
                settimoutHandler(timout);
              }}
              value={value}
            />
          </View>
        </View>
        <View style={styles.navigate}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {SPORTS.map(item => (
              <SportsButton
                key={item.name}
                title={types === item.type ? item.name : ''}
                image={item.image}
                width={types === item.type ? 120 : 50}
                height={types === item.type ? 50 : 50}
                color={types === item.type ? '#ED6B4E' : '#222232'}
                onPress={() => {
                  HandleSportPress(item.type);
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.content}>
          <FlatList
            data={ligsData}
            renderItem={RednderLigs}
            keyExtractor={item => item.ligaName}
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
