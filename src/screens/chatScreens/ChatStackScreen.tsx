import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import IndividualChatScreen from './IndividualChatScreen';

type ChatStackParamList = {
  ChatHome: undefined;
  IndividualChat: undefined;
};

const ChatStack = createStackNavigator<ChatStackParamList>();

const ChatStackScreen = () => (
  <ChatStack.Navigator
    initialRouteName="ChatHome"
    screenOptions={{headerShown: false}}>
    <ChatStack.Screen name="ChatHome" component={ChatScreen} />
    <ChatStack.Screen name="IndividualChat" component={IndividualChatScreen} />
  </ChatStack.Navigator>
);

export default ChatStackScreen;
