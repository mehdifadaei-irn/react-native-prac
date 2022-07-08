import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';


function DrawerComp({text}) {
  return (
      <View style={styles.view}>
        <Text style={styles.text}>{text}</Text>
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

export default DrawerComp;
