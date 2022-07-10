import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Tab_A from './src/Tab_A';
import Tab_B from './src/Tab_B';
import Tab_C from './src/Tab_C';
import SideBar from './src/SideBar.js/SideBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'TabA') {
              iconName = 'layers-outline';
              size = focused ? 30 : 25;
            } else if (route.name === 'TabB') {
              iconName = 'settings-outline';
              size = focused ? 30 : 25;
            } else if (route.name === 'TabC') {
              iconName = 'podium-outline';
              size = focused ? 30 : 25;
            }else if (route.name === "TabD") {
              iconName = "person-sharp";
              size = focused ? 30 : 25;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          header: () => null,
          tabBarLabelStyle: {
            fontSize: 16,
          },
        })}>
        <Tab.Screen name="TabA" component={Tab_A} options={{title: 'Stacks'}} />
        <Tab.Screen name="TabB" component={Tab_B} options={{title: 'Drawer'}} />
        <Tab.Screen
          name="TabC"
          component={Tab_C}
          options={{title: 'Top Bar'}}
        />
        <Tab.Screen
          name="TabD"
          component={SideBar}
          options={{title: 'Side Bar'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
