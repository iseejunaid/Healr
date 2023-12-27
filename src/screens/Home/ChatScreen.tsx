import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';

const ChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header text="Chat" LefticonName="cameraIcon" RighticonName="dotsIcon" />
    </View>
  );
};
export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
});
