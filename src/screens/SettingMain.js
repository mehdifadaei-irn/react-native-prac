import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'

import InitialStack from '../components/settingStacks/InitialStack';
import Help from '../components/settingStacks/Help';
import Lang from '../components/settingStacks/Lang';
import Person from '../components/settingStacks/Person';

const Stack = createStackNavigator();

const SettingMain = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="initial">
      <Stack.Screen
        name="initial"
        component={InitialStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="person"
        component={Person}
        options={{
          headerShadowVisible: false,
          headerTitleContainerStyle: {
            marginLeft: 50,
          },
          headerStatusBarHeight: 25,
          headerLeft: ({screenLayout}) => (
            <Pressable style={{
              paddingHorizontal: 34
            }}
            onPress={()=> navigation.navigate('initial')}
            >
              <Icon name="chevron-back-outline" size={36} color="#000000c5" />
            </Pressable>
          ),
          headerShown: true,
          title: null,
        }}
        
      />
      <Stack.Screen name="language" component={Lang} />
      <Stack.Screen name="help" component={Help} />
    </Stack.Navigator>
  );
};




export default SettingMain;
