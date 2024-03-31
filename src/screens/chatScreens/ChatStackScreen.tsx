import React from 'react';
import ChatScreen from './ChatScreen';
import IndividualChatScreen from './IndividualChatScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../../assets/colors/colors';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';


const ChatStack = createStackNavigator();

const ChatStackScreen = ({navigation, route}: any) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'IndividualChat') {
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
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;

// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import ChatScreen from './ChatScreen';
// import IndividualChatScreen from './IndividualChatScreen';

// const ChatStack = createStackNavigator();

// const ChatStackScreen = () => (

//   <ChatStack.Navigator
//     initialRouteName="ChatHome"
//     screenOptions={{headerShown: false}}>
//     <ChatStack.Screen name="ChatHome" component={ChatScreen} />
//     <ChatStack.Screen name="IndividualChat" component={IndividualChatScreen} />
//   </ChatStack.Navigator>
// );

// export default ChatStackScreen;
