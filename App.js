import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SQLite from 'react-native-sqlite-storage';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Setting from './src/screens/Setting';
import Home from './src/screens/Home';
import SettingMain from './src/screens/SettingMain';
import MainContextProvider from './src/store/context-store';
import Paper from './src/components/Paper';

// import Bse from './Bse'

function openDatabases() {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase(
    {
      name: 'rn_sqlite',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );
  return db;
}

const db = openDatabases();

const Tabs = createBottomTabNavigator();


const App = () => {
  return (
    <MainContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tabs.Navigator
            initialRouteName="settingMain"
            screenOptions={{
              headerShown: false,
            }}>
            <Tabs.Screen
              name="home"
              component={Home}
              options={{
                tabBarIcon: ({size, color}) => (
                  <Icon name="home-outline" color={color} size={size} />
                ),
                tabBarLabelStyle: {
                  fontSize: 13,
                },
                tabBarLabel: 'Home',
              }}
            />
            {/* <Tabs.Screen name="setting" component={Setting} /> */}
            <Tabs.Screen
              name="settingMain"
              component={SettingMain}
              options={{
                tabBarIcon: ({size, color}) => (
                  <Icon name="settings-outline" color={color} size={size} />
                ),
                tabBarLabelStyle: {
                  fontSize: 13,
                },
                tabBarLabel: 'SettingMain',
              }}
            />
            <Tabs.Screen name='paper' component={Paper} />
          </Tabs.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </MainContextProvider>
  );
};

export default App;
