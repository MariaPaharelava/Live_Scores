import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';

import PostCard from './PostCard';
// import firestore from '@react-native-firebase/firestore';
import Indicator from '../../component/ActivityIndicator';
import Search from '../../icons/other/Search.svg';
import {fetchPosts, getSoccerPost} from '../../api/Matches';
import Error from '../../component/ErrorIndicator';
const PostScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [postLoading, setpostLoading] = useState();
  const [postnavigateLoading, setpostnavigateLoading] = useState(true);
  const [postError, setpostError] = useState();
  const [value, setValue] = useState('');
  const [timoutHandler, settimoutHandler] = useState();
  const postsrequest = async () => {
    try {
      setpostLoading(true);

      const postsdata = await fetchPosts();
      console.log(postsdata);
      setPosts(postsdata);
    } catch (e) {
      setpostError(e);
      console.log(e);
    } finally {
      setpostLoading(false);
      setpostnavigateLoading(false);
    }
  };

  useEffect(() => {
    postsrequest();
    navigation.addListener('focus', () =>
      setpostnavigateLoading(!postnavigateLoading),
    );
  }, [navigation, postnavigateLoading]);

  const onInput = async text => {
    setpostLoading(true);
    try {
      const listdata = await getSoccerPost(text);
      setPosts(listdata);
      if (text === '') {
        setPosts([]);
        postsrequest();
      }
      console.log(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setpostLoading(false);
    }
  };

  if (!posts) {
    return null;
  }
  if (postError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {postLoading ? (
        <Indicator />
      ) : (
        <View style={styles.Container}>
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
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                navigation={navigation}
                onPress={() => {
                  navigation.push('UserPost', {
                    item: item,
                  });
                  setValue('');
                }}
              />
            )}
            keyExtractor={item => item.title}
            ListFooterComponent={() => (postLoading ? <Indicator /> : null)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#181829',
  },
  textInput: {
    paddingLeft: 15,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    height: 50,
    paddingLeft: 20,
    marginBottom: 20,
    borderColor: '#222232',
    backgroundColor: '#222232',
  },
});

export default PostScreen;
