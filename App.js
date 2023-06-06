import React, { useState } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './containers/HomeScreen';
import MatchesScreen from './containers/Combinaisons';
import MessagesScreen from './containers/AboutScreen';
import ProfileScreen from './containers/Search';

import LoginScreen from './containers/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 

  return (
    <>
 
    <NavigationContainer>
      <Tab.Navigator

        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: '#363636',
          labelStyle: {
            fontSize: 14,
            textTransform: 'uppercase',
            paddingTop: 10,
          },
          style: {
            backgroundColor: '#FFF',
            borderTopWidth: 0,
            paddingVertical: 30,
            height: 60,
            marginBottom: 0,
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowColor: '#000',
            shadowOffset: { height: 0, width: 0 },
          },
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={MessagesScreen} />
        <Tab.Screen name="Search " component={ProfileScreen} />
        <Tab.Screen name="Combinaison" component={MatchesScreen} />

      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
