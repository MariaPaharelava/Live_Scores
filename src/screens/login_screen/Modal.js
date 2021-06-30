import React, {useState} from 'react';
import {RoundedButton} from '../../buttons/RoundedButton';
import styles from './ModalStyles';
import Message from '../../icons/Message.svg';
import Hide from '../../icons/Hide.svg';
import Password from '../../icons/Password.svg';
import Show from '../../icons/Show.svg';
import CheckBox from '@react-native-community/checkbox';
import {LoginButton} from '../../buttons/LoginButton';

import {
  Modal,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
const LoginScreen = ({visible, setVisible}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [data, setData] = useState({
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const handlePasswordChange = value => {
    setData({
      ...data,
      password: value,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.button}
              onPress={() => setVisible(!visible)}>
              <View style={styles.hideLine} />
            </Pressable>
            <Text style={styles.modalText}>Welcome</Text>

            <LoginButton
              onChangeText={value => handlePasswordChange(value)}
              data={data}
              onPress={updateSecureTextEntry}
            />

            <View style={styles.reminder}>
              <TouchableOpacity style={styles.signupButton}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
              </TouchableOpacity>

              <Text style={styles.textRemember}>Remember me</Text>

              <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.textForgot}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.roundedButton}>
              <RoundedButton title="Sign in" />
            </View>

            <View style={styles.lastView}>
              <Text style={styles.quastion}>Don't have account?</Text>
              <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
