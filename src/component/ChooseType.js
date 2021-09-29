import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

const ChooseType = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  match,
  types,
  title,
  onValueChange,
  ...props
}) => {
  return (
    <View>
      <View style={styles.rowFront}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.action, {height: 60}]}>
        <RNPickerSelect
          placeholder={{
            label: 'Select type ...',
          }}
          style={{
            placeholder: {color: 'white'},
            inputAndroid: {color: 'white'},
            inputIOS: {color: 'white'},
          }}
          onValueChange={onValueChange}
          items={[
            {label: 'HT', value: 'HT'},
            {label: 'FT', value: 'FT'},
            {label: 'UPC', value: 'UPC'},
          ]}
        />
      </View>
    </View>
  );
};

export default ChooseType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  textInput: {
    paddingLeft: Platform.OS === 'ios' ? 0 : 15,

    color: 'white',
  },
  rowFront: {
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: 'white',
  },
  action: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#222232',
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 5,
  },
});
