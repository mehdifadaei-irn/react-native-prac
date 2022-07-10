import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const api = 'https://randomuser.me/api/';

import SideBarcomps from './SideBarcomps';

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{
        fontFamily: 'Roboto-Bold',
        fontSize: 30
      }}>This is my Side bar using Drawer</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const progress = useDrawerProgress();

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        style={{
          transform: [{translateX}],
          
        }}>
        <View style={styles.topView}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/17.jpg'}}
            style={{width: 77, height: 77, borderRadius: 50}}
          />
          <Text style={styles.name}>Jhon Doe.</Text>
          <Text style={styles.address}>fereydonKenar, IRI</Text>
        </View>
        <DrawerItemList {...props}/>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function SideBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())
      .then(json => setData(json.results))
      .catch(error => console.error(error));
  }, []);

  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
          fontSize: 20
        },
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#33d8',
        drawerLabelStyle: {fontSize: 19,},
        headerTitleAlign: 'center',
        headerTintColor: "#fff",
        headerStyle: {backgroundColor: '#33dd'}
      }}

      >
      <Drawer.Screen name="init" component={Article} />
      {data.map(item => (
        <Drawer.Screen
          key={item.id.value}
          name={item.name.first}
          children = {()=> <SideBarcomps item={item}/>}
          
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  text: {
    fontSize: 25,
    fontFamily: 'EduQLDBeginner-Bold',
    color: '#000000',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  address: {
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
    color: '#fff',
  },
});

export default SideBar;
