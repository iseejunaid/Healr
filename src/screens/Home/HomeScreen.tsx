import React, {useEffect} from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HealrFilesStackScreen from '../HealrFilesScreens/HealrFilesStackScreen';
import ProfileStackScreen from '../profileScreens/profileStackScreen';
import Colors from '../../../assets/colors/colors';
import CircleComponent from '../../components/CircleComponent';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ChatStackScreen from '../chatScreens/ChatStackScreen';
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
          component={ChatStackScreen}
          options={{
            tabBarIcon: ({focused}) =>
              !keyboard.keyboardShown ? (
                <CircleComponent focused={focused} iconName="messageIcon" />
              ) : null,
          }}
        />
        <Tab.Screen
          name="Healrfiles"
          component={HealrFilesStackScreen}
          options={{
            tabBarIcon: ({focused}) =>
              !keyboard.keyboardShown ? (
                <CircleComponent focused={focused} iconName="healrFilesIcon" />
              ) : null,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({focused}) =>
              !keyboard.keyboardShown ? (
                <CircleComponent focused={focused} iconName="profileIcon" />
              ) : null,
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
