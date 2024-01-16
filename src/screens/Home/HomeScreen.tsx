import React, {useEffect} from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import HealrFilesScreen from './HealrFilesScreen';
import ProfileScreen from './ProfileScreen';
import Colors from '../../../assets/colors/colors';
import CircleComponent from '../../components/CircleComponent';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: any) => {
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
    </SafeAreaProvider>
  );
};

export default HomeScreen;
