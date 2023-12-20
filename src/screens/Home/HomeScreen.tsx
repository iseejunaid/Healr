import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import HealrFilesScreen from './HealrFilesScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
     screenOptions={{headerShown: false}}>
      <Tab.Group>
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Healr Files" component={HealrFilesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default HomeScreen;
