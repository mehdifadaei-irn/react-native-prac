import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function InitialDrawer() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 27, fontWeight: 'bold', color: '#000'}}>
        User in LeftSide 
      </Text>
      <Icon name="arrow-back-outline" size={52} color="#33d" />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default InitialDrawer;
