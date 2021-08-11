import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Search from '../../icons/other/Search.svg';
import {IMAGES, SPORTS_IMAGES} from '../../images/Images';
import {SportsButton} from '../../buttons/SportsButton';
import {Ligs} from '../../component/Ligs';
import {ExploreMatchButton} from '../../buttons/ExploreMatchButton';

const ExploreScreen = ({navigation}) => {
  // const [filterData, setFilterData] = useState([]);
  // const [masterData, setmasterData] = useState([]);
  // const [search, setSearch] = useState('');
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
  // useEffect(() => {
  //   fetchPosts();
  //   return () => {};
  // }, []);

  // const fetchPosts = () => {
  //   const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  //   fetch(apiUrl)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       setFilterData(responseJson);
  //       setmasterData(responseJson);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // const searchFilter = text => {
  //   if (text) {
  //     const newData = masterData.filter(item => {
  //       const itemData = item.title
  //         ? item.title.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilterData(newData);
  //     setSearch(text);
  //   } else {
  //     setFilterData(masterData);
  //     setSearch(text);
  //   }
  // };

  // const ItemView = ({item}) => {
  //   return (
  //     <Text style={styles.itemStyle}>
  //       {item.id}
  //       {'. '}
  //       {item.title.toUpperCase()}
  //     </Text>
  //   );
  // };

  // const ItemSeparatorView = () => {
  //   return (
  //     <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} />
  //   );
  // };
  // const clearSearch = () => {
  //   setSearch('');
  //   searchFilter();
  // };

  // const selectedView = () => {
  //   switch (view) {
  //     case 'soccer':
  //       return (
  //         <SportsButton
  //           navigation={navigation}
  //           match={match}
  //           othermatch={othermatch}
  //         />
  //       );
  //     case 'lineUp':
  //       return <LineUp navigation={navigation} match={match} />;
  //     case 'h2h':
  //       return <H2H />;
  //     default:
  //       return;
  //   }
  // };

  // const rednderLigs = ligs => {
  //   return ligs.map(liga => {
  //     const matchIndex = getIndex(liga.matches);
  //     return (
  //       <View key={liga.id}>
  //         <ExploreMatchButton
  //           liga={liga}
  //           matches={liga.matches[matchIndex]}
  //           onPress={() =>
  //             navigation.push('DetailTeam', {
  //               match: liga.matches[matchIndex],
  //               othermatch: liga.matches,
  //               liga: liga,
  //             })
  //           }
  //         />
  //       </View>
  //     );
  //   });
  // };

  const rednderLigs = ligs => {
    return ligs.map(liga => {
      return liga.matches.map(match => {
        return (
          <View key={match.id}>
            <ExploreMatchButton
              matches={match}
              // onPress={() => match}
            />
          </View>
        );
      });
    });
  };

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
              placeholder="Search your team..."
            />
          </View>
          <TouchableOpacity>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navigate}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {options.map(item => (
              <SportsButton
                key={item.label}
                title={view == item.value ? item.label : ''}
                image={item.image}
                width={view == item.value ? 120 : 50}
                height={view == item.value ? 50 : 50}
                color={view == item.value ? '#ED6B4E' : '#222232'}
                onPress={() => {
                  setView(item.value);
                }}
              />
            ))}
          </ScrollView>
        </View>
        <ScrollView style={styles.content}>
          {rednderLigs(Ligs)}
          <View style={styles.lastView}></View>
        </ScrollView>
        {/* 
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}></FlatList> */}
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
  },
  itemStyle: {
    padding: 15,
    color: 'white',
  },
  textInput: {
    paddingLeft: 15,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    width: '70%',
    borderWidth: 1,
    height: 50,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#222232',
    backgroundColor: '#222232',
  },
  navigate: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 15,
  },
  content: {
    // width: '100%',
    // height: Platform.OS === 'ios' ? '50%' : '40%',
    marginTop: Platform.OS === 'ios' ? 40 : 30,

    backgroundColor: '#181829',
  },
  lastView: {height: 75},
});
