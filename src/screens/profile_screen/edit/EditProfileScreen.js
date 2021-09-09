import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROFILE_IMAGE} from '../../../images/Images';
import storage from '@react-native-firebase/storage';

import firestore from '@react-native-firebase/firestore';
import FormButton from '../../../component/FormButton';
import styles from './EditProfileScreenStyles';
import ImageCropPicker from 'react-native-image-crop-picker';
const EditProfileScreen = ({navigation, route}) => {
  const [image, setImage] = useState(null);

  const {data} = route.params;
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [userData, setUserData] = useState(data);
  const [user, setUser] = useState();
  useEffect(() => {
    AsyncStorage.getItem('User').then(value => {
      setUser(value);
    });
  }, []);
  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      // const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(image.path);
    });
  };
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
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

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }
    firestore()
      .collection('users')
      .doc(user)
      .update({
        fname: userData.fname,
        lname: userData.lname,
        userImg: imgUrl,
      })
      .then(() => {
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <ImageBackground
          style={styles.userImg}
          source={{
            uri: image
              ? image
              : userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}>
          <TouchableOpacity
            style={styles.userEditContainer}
            onPress={choosePhotoFromLibrary}>
            <Image
              style={styles.userEditImg}
              source={PROFILE_IMAGE.EDITIMAGE_IMAGE}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.userName}>
          {userData ? userData.fname : ''} {userData ? userData.lname : ''}
        </Text>
      </View>

      <View style={styles.action}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="white"
          autoCorrect={false}
          value={userData ? userData.fname : ''}
          onChangeText={txt => setUserData({...userData, fname: txt})}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="white"
          value={userData ? userData.lname : ''}
          onChangeText={txt => setUserData({...userData, lname: txt})}
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>

      <FormButton buttonTitle="Update" onPress={handleUpdate} />
    </View>
  );
};

export default EditProfileScreen;
