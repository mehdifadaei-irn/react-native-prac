import * as React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


function Detail() {
  return <View style={styles.view}>
    <Text style={styles.text}>Detail page</Text>
  </View>;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    fontFamily: 'Roboto-Bold',
  },
  text: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    color: '#000',
  },
});

export default Detail;
