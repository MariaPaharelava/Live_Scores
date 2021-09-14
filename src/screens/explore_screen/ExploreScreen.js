import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  fetchMoreBasketballMatches,
  getBasketballMatches,
  getSoccerMatches,
  getTeamBasketballMatches,
} from '../../api/Matches';
import {fetchMoreSoccerMatches} from '../../api/Matches';
import {getTeamSoccerMatches} from '../../api/Matches';
import Search from '../../icons/other/Search.svg';
import {SportsButton} from '../../buttons/SportsButton';
import {ExploreMatchButton} from '../../buttons/ExploreMatchButton';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import styles from './ExploreScreenStyles';
import {SPORTS} from '../../constant/Sport';

import AsyncStorage from '@react-native-async-storage/async-storage';
const ExploreScreen = ({navigation}) => {
  const [matchesData, setMatchesData] = useState([]);
  const [matchesError, setMatchesError] = useState();
  const [matchesLoading, setMatchesLoading] = useState();
  const [startAfter, setStartAfter] = useState({});
  const [matchPerLoad] = useState(2);
  const [lastMatch, setLastMatch] = useState(false);
  const [value, setValue] = useState('');
  const [timoutHandler, settimoutHandler] = useState();
  const [types, setTypes] = useState('');
  const HandleSportPress = type => {
    if (type !== types) {
      setTypes(type);
      setMatchesData([]);
      setStartAfter({});
      setLastMatch(false);
      setValue('');
    }
  };
  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(value => {
      if (value === null) {
        AsyncStorage.setItem('@storage_Key', '');
        setTypes('');
      } else {
        setTypes(value);
      }
    });
  }, []);

  const matchesrequest = async (refresh = false) => {
    setMatchesLoading(true);
    try {
      if (types === 'soccer') {
        const matchesdata = await getSoccerMatches(matchPerLoad);
        if (refresh) {
          setLastMatch(false);
          setMatchesData(matchesdata.matches);
        } else {
          setMatchesData([...matchesData, ...matchesdata.matches]);
        }
        setStartAfter(matchesdata.lastVisible);
      }
      if (types === 'basketball') {
        const matchesdata = await getBasketballMatches(matchPerLoad);
        if (refresh) {
          setLastMatch(false);
          setMatchesData(matchesdata.matches);
        } else {
          setMatchesData([...matchesData, ...matchesdata.matches]);
        }
        setStartAfter(matchesdata.lastVisible);
      }
    } catch (error) {
      setMatchesError(error);
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };
  const onInput = async text => {
    setMatchesLoading(true);
    try {
      if (types === 'soccer') {
        const matchesdata = await getTeamSoccerMatches(matchPerLoad, text);
        setMatchesData(matchesdata.matches);

        if (text === '') {
          setLastMatch(false);
          setMatchesData([]);
          matchesrequest();
        }
        setStartAfter(matchesdata.lastVisible);
      }
      if (types === 'basketball') {
        const matchesdata = await getTeamBasketballMatches(matchPerLoad, text);
        setMatchesData(matchesdata.matches);

        if (text === '') {
          setLastMatch(false);
          setMatchesData([]);
          matchesrequest();
        }
        setStartAfter(matchesdata.lastVisible);
      }
    } catch (error) {
      setMatchesError(error);
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };

  useEffect(() => {
    matchesrequest();
  }, [types]);

  const getMoreMatches = async () => {
    try {
      if (!lastMatch) {
        if (types === 'soccer') {
          const matchesdata = await fetchMoreSoccerMatches(
            startAfter,
            matchPerLoad,
            value,
          );
          setMatchesData([...matchesData, ...matchesdata.matches]);
          setStartAfter(matchesdata.lastVisible);
          matchesdata.matches.length === 0
            ? setLastMatch(true)
            : setLastMatch(false);
        }
        if (types === 'basketball') {
          const matchesdata = await fetchMoreBasketballMatches(
            startAfter,
            matchPerLoad,
            value,
          );
          setMatchesData([...matchesData, ...matchesdata.matches]);
          setStartAfter(matchesdata.lastVisible);
          matchesdata.matches.length === 0
            ? setLastMatch(true)
            : setLastMatch(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };

  const RednderLigs = ({item}) => {
    return (
      <View key={item.id}>
        <ExploreMatchButton matches={item} />
      </View>
    );
  };

  if (!matchesData) {
    return null;
  }
  if (matchesError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#181829'}}>
      <View>
        <View style={styles.wrapper}>
          <View style={styles.search}>
            <Search />
            <TextInput
              style={styles.textInput}
              color="white"
              placeholderTextColor="#65656B"
              placeholder="Search your team..."
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
          <TouchableOpacity
            onPress={() => {
              setValue('');
              matchesrequest(true);
            }}>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
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

        <View style={styles.container}>
          <FlatList
            data={matchesData}
            renderItem={RednderLigs}
            keyExtractor={item => item.id}
            style={{height: Platform.OS === 'ios' ? '90%' : '67%'}}
            onEndReached={getMoreMatches}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={150}
            ListFooterComponent={() =>
              matchesLoading || !lastMatch ? <Indicator /> : null
            }
          />
          <View style={styles.lastView} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
