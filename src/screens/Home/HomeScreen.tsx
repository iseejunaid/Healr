import React, {useEffect} from 'react';
import {BackHandler, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import HealrFilesScreen from './HealrFilesScreen';
import ProfileScreen from './ProfileScreen';
import Colors from '../../../assets/colors/colors';
import CircleComponent from './CircleComponent';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: any) => {
  const iconsize = 30;
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.tertiaryColor,
          height: 60,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      }}>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CircleComponent focused={focused} iconName="messageIcon" />
          ),
        }}
      />
      <Tab.Screen
        name="Healrfiles"
        component={HealrFilesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CircleComponent focused={focused} iconName="healrFilesIcon" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CircleComponent focused={focused} iconName="profileIcon" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
