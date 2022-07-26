import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Prac1 from './screens/Prac1';
import Prac2 from './screens/Prac2';
import Prac3 from './screens/Prac3';
import Prac4 from './screens/Prac4';
import Prac5 from './screens/Prac5';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            header: () => null,
            tabBarStyle: {
              backgroundColor: '#4f8ee0',
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
              fontSize: 15,
            },
          }}>
          <Tab.Screen
            name="prac1"
            component={Prac1}
            options={{
              tabBarIcon: ({size}) => (
                <Icon name="image" size={size} color="#000" />
              ),
              tabBarLabel: 'slider',
            }}
          />
          <Tab.Screen
            name="prac2"
            component={Prac2}
            options={{
              tabBarIcon: ({size}) => (
                <Icon name="image" size={size} color="#000" />
              ),
              tabBarLabel: 'Blur',
            }}
          />
          <Tab.Screen
            name="prac3"
            component={Prac3}
            options={{
              tabBarIcon: ({size}) => (
                <Icon name="image" size={size} color="#000" />
              ),
              tabBarLabel: 'Sticky',
            }}
          />
          <Tab.Screen
            name="prac4"
            component={Prac4}
            options={{
              tabBarIcon: ({size}) => (
                <Icon name="image" size={size} color="#000" />
              ),
              tabBarLabel: 'carousel',
            }}
          />

          <Tab.Screen
            name="prac5"
            component={Prac5}
            options={{
              tabBarIcon: ({size}) => (
                <Icon name="image" size={size} color="#000" />
              ),
              tabBarLabel: 'Bar',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
