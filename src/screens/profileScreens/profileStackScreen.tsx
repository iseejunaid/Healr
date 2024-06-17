import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import ProfileQRScreen from './profileQRScreen';
import ScanQRScreen from './ScanQRScreen';
import Colors from '../../../assets/colors/colors';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import GetVerified from './verificationScreens';
import GetVerifiedStep1 from './verificationScreens/Step1';
import GetVerifiedStep2 from './verificationScreens/Step2';
import GetVerifiedStep3 from './verificationScreens/Step3';
import GetVerifiedStep4 from './verificationScreens/Step4';
import GetVerifiedStep5 from './verificationScreens/Step5';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation, route}: any) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'EditProfile' || routeName === 'ProfileQR' || routeName === 'ScanQR' ||
    routeName === 'GetVerified' || routeName === 'GetVerifiedStep1' || routeName === 'GetVerifiedStep2'
    || routeName === 'GetVerifiedStep3' || routeName === 'GetVerifiedStep4' || routeName === 'GetVerifiedStep5'
    ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: Colors.tertiaryColor,
          height: 60,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      });
    }
  }, [navigation, route]);

  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="ProfileQR" component={ProfileQRScreen} />
      <ProfileStack.Screen name="ScanQR" component={ScanQRScreen} />
      <ProfileStack.Screen name='GetVerified' component={GetVerified}/>
      <ProfileStack.Screen name="GetVerifiedStep1" component={GetVerifiedStep1} />
      <ProfileStack.Screen name="GetVerifiedStep2" component={GetVerifiedStep2} />
      <ProfileStack.Screen name="GetVerifiedStep3" component={GetVerifiedStep3} />
      <ProfileStack.Screen name="GetVerifiedStep4" component={GetVerifiedStep4} />
      <ProfileStack.Screen name="GetVerifiedStep5" component={GetVerifiedStep5} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
