import React from 'react';
import {styles} from './LoginButtonStyle';
import PropTypes from 'prop-types';
import Message from '../icons/Message.svg';
import Hide from '../icons/Hide.svg';
import Password from '../icons/Password.svg';
import Show from '../icons/Show.svg';

import {View, TextInput, TouchableOpacity} from 'react-native';
export const LoginButton = ({
  onChangeText,
  onPress,
  data,
  noBackground = false,
  ...props
}) => {
  return (
    <View>
      <View style={styles.password}>
        <Message style={styles.imageStyle} />
        <TextInput
          placeholderTextColor="#65656B"
          placeholder="Email"
          selectionColor="#65656B"
          style={styles.textInput}
          color="white"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.password}>
        <Password style={styles.imageStyle} />

        <TextInput
          placeholderTextColor="#65656B"
          placeholder="Password"
          selectionColor="#65656B"
          color="white"
          style={styles.textInput}
          secureTextEntry={data.secureTextEntry ? true : false}
          autoCapitalize="none"
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onPress}>
          {data.secureTextEntry ? (
            <Hide style={styles.imageStyleHide} />
          ) : (
            <Show />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

LoginButton.propTypes = {
  onPress: PropTypes.func,
  noBackground: PropTypes.bool,
  onChangeText: PropTypes.func,
  data: PropTypes.object,
};
LoginButton.defaultProps = {
  noBackground: false,
};
