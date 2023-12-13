import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoadingScreens from './src/screens/onBoarding/onBoardingScreenSwiper';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPassScreen from './src/screens/forgotPassword/index';
import SignupScreen from './src/screens/Signup/SignupScreen1';
import SignupScreen2 from './src/screens/Signup/SignupScreen2';
import SignupScreen3 from './src/screens/Signup/SignupScreen3';
import SignupScreen4 from './src/screens/Signup/SignupScreen4';
import SignupScreen5 from './src/screens/Signup/SignupScreen5';
import SignupScreen6 from './src/screens/Signup/SignupScreen6';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="OnBoardingScreens"
          component={OnBoadingScreens}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassScreen"
          component={ForgotPassScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen2"
          component={SignupScreen2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen3"
          component={SignupScreen3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen4"
          component={SignupScreen4}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen5"
          component={SignupScreen5}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen6"
          component={SignupScreen6}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}