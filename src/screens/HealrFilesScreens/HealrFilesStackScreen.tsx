import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../../assets/colors/colors';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HealrFilesScreen from './HealrFilesScreen';
import NewChat from '../chatScreens/NewChat';


const HealrFilesStack = createStackNavigator();

const HealrFilesStackScreen = ({navigation, route}: any) => {
    
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'Share') {
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
    <HealrFilesStack.Navigator
      initialRouteName="HealrFilesHome"
      screenOptions={{headerShown: false}}>
      <HealrFilesStack.Screen name="HealrFilesHome" component={HealrFilesScreen} />
      <HealrFilesStack.Screen name="Share" component={NewChat} />
    </HealrFilesStack.Navigator>
  );
};

export default HealrFilesStackScreen;