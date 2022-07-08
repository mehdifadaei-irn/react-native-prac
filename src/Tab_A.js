import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import ProductDetail from './Stacks/ProductDetail';
import InitialStack from './Stacks/InitialStack';

function Tab_A({route, navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <Stack.Navigator
      InitialStack={'initialStack'}
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#33d9'},
      }}>
      <Stack.Screen
        name="initialStack"
        component={InitialStack}
        options={{
          title: 'ShopList',
        }}
      />
      {data.map((item, i) => (
        <Stack.Screen
          name={item.title}
          key={item.id}
          children={() => <ProductDetail item={item} />}
        />
      ))}

      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
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

export default Tab_A;
