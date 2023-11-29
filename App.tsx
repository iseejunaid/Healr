import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoadingScreens from './src/screens/onBoarding/onBoardingScreenSwiper';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPassScreen from './src/screens/forgotPassword/index';
import ForgotPassOTPScreen from './src/screens/forgotPassword/ForgotPassOTP';
import CreateNewPassScreen from './src/screens/forgotPassword/CreateNewPass';

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
          name="CreateNewPassScreen"
          component={CreateNewPassScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassOTPScreen"
          component={ForgotPassOTPScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
