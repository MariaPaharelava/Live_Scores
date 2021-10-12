import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import {ADMIN_IMAGES} from '../../images/Images';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import 'react-native-get-random-values';

import {v4 as uuidv4} from 'uuid';

const ChatScreen = ({route}) => {
  const {postId, comments} = route.params;
  console.log(comments);
  const [messages, setMessages] = useState([]);
  const [commentsValue, setcommentsValue] = useState(comments + 1);
  const user = useSelector(state => state.AuthReducer.user);
  const [userData, setUserData] = useState();
  const [userLoading, setuserLoading] = useState();
  const [userError, setuserError] = useState();
  const getUser = async () => {
    try {
      const currentUser = await firestore()
        .collection('users')
        .doc(user)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
          }
        });
    } catch (error) {
      setuserError(error);
      console.log(error);
    } finally {
      setuserLoading(false);
    }
  };

  useEffect(() => {
    getUser();

    const subscribe = firestore()
      .collection('comments')
      .doc(postId)
      .collection('commentsData')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            data.createdAt = data.createdAt.toDate();
            console.log(data.createdAt);

            setMessages(prevMessages => GiftedChat.append(prevMessages, data));
          }
        });
      });

    return () => subscribe();
  }, []);

  function onSend(messages) {
    const commentsId = uuidv4();

    firestore()
      .collection('comments')
      .doc(postId)
      .collection('commentsData')
      .doc(commentsId)
      .set(messages[0]);

    firestore().collection('posts').doc(postId).update({
      comments: commentsValue,
    });
  }

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{paddingBottom: 10, paddingRight: 5}}>
          <Image
            source={ADMIN_IMAGES.SEND_IMAGE}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <Image
        source={ADMIN_IMAGES.SCROLLDOWN_IMAGE}
        resizeMode="contain"
        style={styles.image}
      />
    );
  };
  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#2b2b3d',
        }}
      />
    );
  };
  if (!userData) {
    return <Indicator />;
  }
  if (userError) {
    return <Error />;
  }
  console.log(commentsValue);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#35364d'}}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => {
            onSend(messages);
            setcommentsValue(count => count + 1);
          }}
          user={{
            _id: user,
            name: userData.name,
            avatar: userData.userImg,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          showAvatarForEveryMessage={true}
          renderInputToolbar={props => customtInputToolbar(props)}
          placeholderTextColor="#65656B"
          textInputStyle={{color: '#fff'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 30 : 50,
    backgroundColor: '#181829',
  },
  image: {
    width: 25,
    height: 25,
    tintColor: '#2e64e5',
  },
});
