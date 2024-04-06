import React, {useCallback, useEffect, useState} from 'react';
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
import {fetchChats} from './ChatHelper';
import { ChatData } from './ChatHelper';

const ChatScreen: React.FC = ({navigation}: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [chatsData, setChatsData] = useState<ChatData>({});

  const fetchChatsData = useCallback(async () => {
    const data = await fetchChats();
    setChatsData(data);
  }, []);

  useEffect(() => {
    fetchChatsData();
  }, [fetchChatsData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChatsData();
    });
    return unsubscribe;
  }, [fetchChatsData, navigation]);

  return (
    <View style={styles.container}>
      <Header text="Chats" LefticonName="cameraIcon" RighticonName="dotsIcon" />
      <ScrollView style={styles.chatsContainer}>
        <InputField
          style={styles.searchInput}
          handleChange={setSearchValue}
          value={searchValue}
          placeholder="Search"
          width={95}
        />
        {Object.keys(chatsData).map((key: string) => {
          const createdAt = chatsData[key].createdAt.toDate();
          const timeString = createdAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          console.log(chatsData[key].name);
          return (            
            <ChatItem
              key={key}
              navigation={navigation}
              profileImageSource={require('../../../assets/images/profile.png')}
              userName= {chatsData[key].name}
              // userName={key}
              message={chatsData[key].text}
              time={timeString}
            />
          );
        })}
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
