import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const api_url = "https://fakestoreapi.com/products";

function InitialStack({route, navigation}) {
  const [isRefresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setRefresh(false));
  }, []);
  const productDetail = (id)=> {
    const prod = data.find((item)=> item.id === id)
    navigation.navigate(prod.title)
  }

  return (
    <FlatList
      style={{backgroundColor: '#fff'}}
      data={data}
      renderItem={({item}) => (
        <Pressable
          key={item.id}
          style={({pressed}) => ({
            marginVertical: 6,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
          })}
          android_ripple={{color: '#33d'}}
          onPress={()=> productDetail(item.id)}
          >
          <View>
            <Image 
            source={{uri: item.image}}
            style={{width: 40, height: 40, borderRadius: 100}}
            />
          </View>
          <View>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.subText}>{item.category}</Text>
          </View>
        </Pressable>
      )}></FlatList>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    paddingHorizontal: 7,
    color: '#000',
    textTransform: 'capitalize',
    flexWrap: 'wrap',
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    paddingHorizontal: 7,
    fontWeight: 'bold',
    color: '#00000090',
    textTransform: 'capitalize',
    flexWrap: 'wrap'
  },
});

export default InitialStack;
