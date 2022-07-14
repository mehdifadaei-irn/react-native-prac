import * as React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const data = [
  {name: 'mehdi', key: "1"},
  {name: 'mamal', key: "2"},
  {name: 'bahBah', key: "3"},
]

import DrawerComp from '../Drawer/DrawerComp';
import InitialDrawer from '../Drawer/InitialDrawer';

function Tab_B() {
  console.log('tabB');

  return (
    <Drawer.Navigator 
      useLegacyImplementation 
      initialRouteName="InitialDrawer"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#33d9' },
      }}
    >
      <Drawer.Screen
        name="Fav" 
        component={InitialDrawer}
        options={{
          title: "FavoriteItems",
          drawerIcon: ()=> <Icon name='star' size={20} color={'gold'}/>
        }}
      />

      {/* {data.map((item, i)=> (
        <Drawer.Screen name={item.name} key={item.key} children={()=> <DrawerComp text={item.name}/>}/>
      ))} */}

    </Drawer.Navigator>
  );
}

export default Tab_B;
