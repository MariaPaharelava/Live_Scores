import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import PostActivity from './PostActivityScreen';
import {useDispatch, useSelector} from 'react-redux';

import Indicator from '../../../component/ActivityIndicator';
const ActivityProfileScreen = ({navigation}) => {
  console.log(navigation);
  const user = useSelector(state => state.AuthReducer.user);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '==', user)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime, title, likes, comments} =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              title,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Indicator />
      ) : (
        <View style={styles.Container}>
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostActivity
                item={item}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('UserPost', {
                    item: item,
                  })
                }
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#181829',
  },
});

export default ActivityProfileScreen;
