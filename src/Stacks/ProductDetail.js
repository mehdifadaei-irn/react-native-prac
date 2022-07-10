import * as React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ProductDetail({item, route, navigation}) {
  return (
    <View style={styles.view}>
      <View style={styles.topBanner}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.botBanner}>

        <View style={styles.botBannerTitle}>

          <View style={styles.botBannerTitleText}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.cate}>{item.category}</Text>
          </View>

          <View>
            <Text style={styles.rate}>{item.rating.rate}</Text>
            <Text style={styles.count}>at {item.rating.count} vote</Text>
          </View>

        </View>

        <Text style={styles.desc}>{item.description}</Text>

        <View style={styles.botBannerBottom}>
          <Text style={styles.price}>${item.price}</Text>
          <Icon name="card-outline" size={32} color={"#ff22ff"}/>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    fontFamily: "Roboto-Bold",
  },
  text: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: '#000000',
  },
  image: {
    height: 250,
    width: 300,
  },
  topBanner: {
    flex: 1,
  },
  botBanner: {
    flex: 1,
  },
  botBannerTitle: {
    flexDirection: 'row'
  },
  botBannerTitleText: {
    width: "70%",
    marginRight: 47
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: "Roboto-Bold",
  },
  rate: {
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    fontFamily: "Roboto-Bold",
  },
  count: {
    color: '#000000',
    fontFamily: "Roboto-Medium",
  },
  cate: {
    marginTop: 5,
    fontSize: 20,
    fontFamily: "Roboto-Regular",
  },
  desc: {
    fontSize: 16,
    color: '#000',
    fontFamily: "Roboto-Bold",
    fontWeight: '500'
  },
  botBannerBottom: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  price: {
    fontWeight: '600',
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    color: '#000',
  }
});

export default ProductDetail;
