import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoadingScreens from './src/screens/onBoarding/onBoardingScreenSwiper';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPassScreen from './src/screens/forgotPassword/index';
import CreateNewPassScreen from './src/screens/forgotPassword/CreateNewPass';
import SignupScreen from './src/screens/Signup/SignupScreen1';
import SignupScreen2 from './src/screens/Signup/SignupScreen2';
import SignupScreen3 from './src/screens/Signup/SignupScreen3';
import SignupScreen4 from './src/screens/Signup/SignupScreen4';
import SignupScreen5 from './src/screens/Signup/SignupScreen5';
import SignupScreen6 from './src/screens/Signup/SignupScreen6';
import SignupScreen7 from './src/screens/Signup/SignupScreen7';
import HomeScreen from './src/screens/Home/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Colors from './assets/colors/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.tertiaryColor} />
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown:false}}>
        {/* <Stack.Screen
          name="OnBoardingScreens"
          component={OnBoadingScreens}
        /> */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="ForgotPassScreen"
          component={ForgotPassScreen}
        />
        <Stack.Screen
          name="CreateNewPassScreen"
          component={CreateNewPassScreen}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
        />
        <Stack.Screen
          name="SignupScreen2"
          component={SignupScreen2}
        />
        <Stack.Screen
          name="SignupScreen3"
          component={SignupScreen3}
        />
        <Stack.Screen
          name="SignupScreen4"
          component={SignupScreen4}
        />
        <Stack.Screen
          name="SignupScreen5"
          component={SignupScreen5}
        />
        <Stack.Screen
          name="SignupScreen6"
          component={SignupScreen6}
        />
        <Stack.Screen
          name="SignupScreen7"
          component={SignupScreen7}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}