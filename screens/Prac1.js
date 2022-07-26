import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      await fetch('https://picsum.photos/v2/list?page=2&limit=8')
        .then(response => response.json())
        .then(json => setData(json));
    };

    fetchImages();
  }, []);
  

  const topRef = useRef();
  const botRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    console.log(index)
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
    if(index * (90) -40 > width /2){
      console.log('shod');
      botRef?.current?.scrollToOffset({
        offset: index * (90) - width/2 + 40,
        animated: true
      })
    }else {
      botRef?.current?.scrollToOffset({
        offset: 0,
        animated: true 
      })
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            ref={topRef}
            data={data}
            keyExtractor={item => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            
            onMomentumScrollEnd={ev => {
              scrollToActiveIndex(
                Math.round(ev.nativeEvent.contentOffset.x / width)
              );
            }}
            renderItem={({item}) => {
              return (
                <View style={{width, height}}>
                  <Image
                    source={{uri: item.download_url}}
                    style={[StyleSheet.absoluteFillObject]}
                  />
                </View>
              );
            }}
          />
          <FlatList
            ref={botRef}
            data={data}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}
            style={{position: 'absolute', bottom: 60}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={()=> scrollToActiveIndex(index)}>
                  <Image
                    source={{uri: item.download_url}}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      marginRight: 10,
                      borderWidth: 2,
                      borderColor:
                        index === activeIndex ? '#fff' : 'transparent',
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
    </View>
  );
};
