import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import 'react-native-get-random-values';

import {v4 as uuidv4} from 'uuid';
import {RoundedButton} from '../../buttons/RoundedButton';
import {ScrollView} from 'react-native-gesture-handler';
const AddPostScreen = () => {
  const user = useSelector(state => state.AuthReducer.user);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    const postId = uuidv4();

    firestore()
      .collection('posts')
      .doc(postId)
      .set({
        userId: user,
        post: post,
        title: title,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        // likes: 0,
        comments: 0,
      })
      .then(() => {
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
        setPost(null);
        setTitle(null);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
    firestore().collection('comments').doc(postId).set({});
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#35364d'}}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.InputWrapper}>
            {image != null ? (
              <Image style={styles.AddImage} source={{uri: image}} />
            ) : (
              <Image
                style={styles.AddImage}
                source={require('../../images/images/default-img.jpg')}
              />
            )}
            <View style={styles.postTitle}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="white"
                multiline
                maxLength={35}
                numberOfLines={4}
                value={title}
                onChangeText={title => setTitle(title)}
                style={styles.InputField}
              />
            </View>
            <View style={[styles.postTitle, {marginBottom: 20}]}>
              <TextInput
                placeholder="Description"
                placeholderTextColor="white"
                multiline
                numberOfLines={4}
                value={post}
                onChangeText={content => setPost(content)}
                style={styles.InputField}
              />
            </View>

            {uploading ? (
              <View style={styles.StatusWrapper}>
                <Text style={{color: 'white'}}>{transferred} % Completed!</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              // <TouchableOpacity style={styles.SubmitBtn} onPress={submitPost}>
              //   <Text style={styles.SubmitBtnText}>Post</Text>
              // </TouchableOpacity>
              <RoundedButton title="Post" onPress={submitPost} />
            )}
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={takePhotoFromCamera}
              style={styles.roundButton1}>
              <Text>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={choosePhotoFromLibrary}
              style={styles.roundButton1}>
              <Text>Choose Photo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  InputWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },

  InputField: {
    paddingTop: 0,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 15,
    color: 'white',
  },
  AddImage: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  StatusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  SubmitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  SubmitBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e64e5',
  },
  roundButton1: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: '#2e64e5',
  },
  buttonWrapper: {
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
    marginBottom: '8%',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingBottom: 30,
  },
  postTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#222232',
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
});
