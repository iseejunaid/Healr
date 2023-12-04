import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoadingScreens from './src/screens/onBoarding/onBoardingScreenSwiper';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPassScreen from './src/screens/forgotPassword/index';
import SignupScreen from './src/screens/Signup/SignupScreen1of5';
import SignupScreen2of5 from './src/screens/Signup/SignupScreen2of5';

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
          name="SignupScreen2of5"
          component={SignupScreen2of5}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
