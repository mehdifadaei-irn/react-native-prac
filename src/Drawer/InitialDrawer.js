import * as React from 'react';
import {Text, View, StyleSheet, FlatList, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FavContext} from '../store/context/context';

function InitialDrawer() {
  const {FavIds, stackData} = React.useContext(FavContext);

  const FavListIsEmpty = FavIds.length === 0 ? true : false;

  const FavItem = stackData.filter(data => FavIds.includes(data.id));

  const FavItems = () => {
    return (
      <FlatList
        style={{backgroundColor: '#fff'}}
        data={FavItem}
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
            android_ripple={{color: '#33d'}}>
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
      // <View>
      //   {FavItem.map((i)=> (
      //     <View key={i.id}>
      //       <Text>{i.price}</Text>
      //     </View>
      //   ))}
      // </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 27, fontWeight: 'bold', color: '#000'}}>
          your favorite list is empty !
        </Text>
        <Icon name="arrow-back-outline" size={52} color="#33d" />
      </View> */}
      {FavListIsEmpty ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: '#000'}}>
            your have no favorite item yet
          </Text>
          <Icon name="arrow-back-outline" size={52} color="#33d" />
        </View>
      ) : (
        <FavItems />
      )}
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
