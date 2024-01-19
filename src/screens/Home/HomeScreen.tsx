import React, {useEffect,useState} from 'react';
import {BackHandler, StatusBar, Keyboard} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import HealrFilesScreen from './HealrFilesScreen';
import ProfileScreen from './ProfileScreen';
import Colors from '../../../assets/colors/colors';
import CircleComponent from '../../components/CircleComponent';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks'

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: any) => {
  const keyboard = useKeyboard();
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
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={Colors.secondaryColor}
        barStyle={'dark-content'}
      />
      <Tab.Navigator
        initialRouteName="Chat"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
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
              !keyboard.keyboardShown ? <CircleComponent focused={focused} iconName="messageIcon" /> : null    
            ),
          }}
        />
        <Tab.Screen
          name="Healrfiles"
          component={HealrFilesScreen}
          options={{
            tabBarIcon: ({focused}) => (
              !keyboard.keyboardShown ? <CircleComponent focused={focused} iconName="healrFilesIcon" /> : null    
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              !keyboard.keyboardShown ? <CircleComponent focused={focused} iconName="profileIcon" /> : null    
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
