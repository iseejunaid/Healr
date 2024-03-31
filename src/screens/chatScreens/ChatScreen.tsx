import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import InputField from '../../components/InputField';
import ChatItem from '../../components/ChatItem';

const ChatScreen: React.FC = ({navigation}: any) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (text: string) => {
    setSearchValue(text);
  };

  return (
    <View style={styles.container}>
      <Header text="Chats" LefticonName="cameraIcon" RighticonName="dotsIcon" />
      <ScrollView style={styles.chatsContainer}>
        <InputField
          style={styles.searchInput}
          handleChange={handleSearchValueChange}
          value={searchValue}
          placeholder="Search"
          width={95}
        />
        <ChatItem
          navigation={navigation}
          profileImageSource={require('../../../assets/images/profile.png')}
          userName="Muhammad Qasim"
          message="This is a sample message sent by Muhammad Qasim"
          time="12:30 PM"
          notificationCount={2}
        />
        <ChatItem
          navigation={navigation}
          profileImageSource={require('../../../assets/images/profile.png')}
          userName="Muhammad Qasim"
          message="This is a sample message sent by Muhammad Qasim"
          time="12:30 PM"
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.newChatButton}
        activeOpacity={0.7}
        onPress={() => {}}>
        <Image
          source={require('../../../assets/images/newChat.png')}
          style={styles.newChatIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
  },
  chatsContainer: {
    height: 630,
    width: '100%',
  },
  searchInput: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'center',
    width: '90%',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    backgroundColor: Colors.tertiaryColor,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 4,
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 4,
  },
  newChatIcon: {
    height: 30,
    width: 28,
    marginTop: -5,
    marginLeft: 5,
  },
});
