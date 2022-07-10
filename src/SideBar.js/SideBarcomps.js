import * as React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ProductDetail({item}) {

  return (
    <View style={styles.view}>
      <View>
        <Image source={{uri: item.picture.large}}
          style={{width: 300, height: 300}}
        />
      </View>
      <Text style={styles.text}>Name : {item.name.first +"  " +item.name.last}</Text>
      <Text style={styles.email}>Email : {item.email}</Text>
      <Text style={styles.email}>Phone Number : {item.phone}</Text>
      <Text style={styles.email}>Address : {item.location.country +"-"+item.location.city+"-"+ item.location.state}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    fontFamily: "Roboto-Bold",
  },
  text: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: '#00000090',
  },
  email: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#00000080',
    marginTop: 10
  }
});

export default ProductDetail;