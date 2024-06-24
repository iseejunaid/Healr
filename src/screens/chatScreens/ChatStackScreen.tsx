import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../../assets/colors/colors';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ChatScreen from './ChatScreen';
import IndividualChatScreen from './IndividualChatScreen';
import NewChat from './NewChat';
import ViewProfileScreen from './ViewProfile';
import CreateDossier from './CreateDossier';
import SearchScreen from './Search';

const ChatStack = createStackNavigator();

const ChatStackScreen = ({navigation, route}: any) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (
      routeName === 'IndividualChat' ||
      routeName === 'newChat' ||
      routeName === 'ViewProfile' ||
      routeName === 'CreateDossier' ||
      routeName === 'Search'
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
    <ChatStack.Navigator
      initialRouteName="ChatHome"
      screenOptions={{headerShown: false}}>
      <ChatStack.Screen name="ChatHome" component={ChatScreen} />
      <ChatStack.Screen
        name="IndividualChat"
        component={IndividualChatScreen}
      />
      <ChatStack.Screen name="NewChat" component={NewChat} />
      <ChatStack.Screen name="ViewProfile" component={ViewProfileScreen} />
      <ChatStack.Screen name="CreateDossier" component={CreateDossier} />
      <ChatStack.Screen name="Search" component={SearchScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;
