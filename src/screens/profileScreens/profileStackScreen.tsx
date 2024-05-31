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

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation, route}: any) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'EditProfile' || routeName === 'ProfileQR' || routeName === 'ScanQR' ||
    routeName === 'GetVerified' || routeName === 'GetVerifiedStep1'
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
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
