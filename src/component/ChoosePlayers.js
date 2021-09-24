import React, {useMemo} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

const ChoosePlayers = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  match,
  types,
  title,
  teams,
  team,
  index,
  formation,
  onValueChange,
  savedTeam,
  position,
  ...props
}) => {
  const items = useMemo(
    () =>
      team
        ? team.players.map(player => ({
            label: player.name,
            value: player,
          }))
        : [{label: '', value: ''}],
    [team],
  );

  const value = savedTeam[position][index];
  console.log(value);
  return (
    <View>
      <View style={[styles.action, {height: 60}]}>
        <RNPickerSelect
          placeholder={{
            label: 'Select player ...',
          }}
          style={{
            placeholder: {color: 'white'},
            inputAndroid: {color: 'white'},
            inputIOS: {color: 'white'},
          }}
          onValueChange={v => {
            console.log(v);
            onValueChange(v);
          }}
          //   value={value}
          items={items}
          children={<Text>{value ? value.name : 'Select player ...'}</Text>}
          //   items={
          //     team
          //       ? team.players.map(player => ({
          //           label: player.name,
          //           value: JSON.stringify(player),
          //         }))
          //       : [{label: '', value: ''}]
          //   }
        />
      </View>
    </View>
  );
};

export default ChoosePlayers;

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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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
