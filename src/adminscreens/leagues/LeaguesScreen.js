import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ADMIN_IMAGES} from '../../images/Images';
import Icon from 'react-native-ico-flags';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import styles from './LeaguesScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SPORTS} from '../../constant/Sport';
import {SportsButton} from '../../buttons/SportsButton';
import Search from '../../icons/other/Search.svg';
import {fetchBasketballMoreLigs} from '../../api/Matches';
import {fetchSoccerMoreLigs} from '../../api/Matches';
import {getSoccerLiga} from '../../api/Matches';
import {getBasketballLiga} from '../../api/Matches';
import {getSoccerLigsTable} from '../../api/Matches';
import {getBasketballLigsTable} from '../../api/Matches';
const LeaguesScreen = ({navigation, ligs}) => {
  const [types, setTypes] = useState('');
  const [value, setValue] = useState('');
  const [timoutHandler, settimoutHandler] = useState();
  const [startAfter, setStartAfter] = useState({});
  const [ligsPerload] = useState(2);
  const [lastLigs, setLastLigs] = useState(false);
  const [ligsData, setligsData] = useState([]);
  const [ligsError, setligsError] = useState();
  const [ligsLoading, setligsLoading] = useState();
  const [ligsnavigateLoading, setligsnavigateLoading] = useState();

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

  const deleteRow = (rowMap, rowKey) => {
    const newData = [...ligsData];
    const prevIndex = ligsData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setligsData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = props => {
    const {data, rowHeightAnimatedValue, removeRow, rightActionState} = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <View style={styles.radius}>
          <View style={styles.icon}>
            <Icon style={styles.iconCountry} name={data.item.country} />
            <View style={styles.containerText}>
              <Text style={[styles.text]} numberOfLines={1}>
                {data.item.ligaName}
              </Text>
              <Text style={[styles.textTitle]} numberOfLines={1}>
                {data.item.ligaCountry}
              </Text>
            </View>
          </View>
          <Image source={ADMIN_IMAGES.ARROW_IMAGE} />
        </View>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => navigation.navigate('EditLeagues')}>
            <Image
              source={ADMIN_IMAGES.EDIT_IMAGE}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <Image
                  source={ADMIN_IMAGES.TRASHCAN_IMAGE}
                  resizeMode="contain"
                  style={styles.image}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  if (!ligsData) {
    return <Indicator />;
  }
  if (ligsError) {
    return <Error />;
  }
  console.log(ligsData);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchView}>
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
      <SwipeListView
        data={ligsData}
        keyExtractor={item => item.ligaName}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
        onEndReached={getMoreLigs}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={() =>
          ligsLoading || !lastLigs ? <Indicator /> : null
        }
      />
    </View>
  );
};

export default LeaguesScreen;
