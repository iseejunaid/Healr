import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';
import OptionsModal from './OptionsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteChat } from '../screens/chatScreens/ChatHelper';

interface ChatItemProps {
  navigation: any;
  profileImageSource?: any;
  userId: string;
  receiverId: string;
  userName: string;
  message: string;
  time: string;
  status: string;
  notificationCount?: number;
}

const ChatItem: React.FC<ChatItemProps> = ({
  navigation,
  profileImageSource,
  userId,
  receiverId,
  userName,
  message,
  time,
  status,
  notificationCount,
}) => {
  const [icon, setIcon] = useState<'image' | 'video' | 'document' | 'null'>(
    'null',
  );
  const [markAsUnread, setMarkAsUnread] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [chatItemLayout, setChatItemLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const chatItemRef = useRef(null);

  useEffect(() => {
    const fetchMarkAsUnreadStatus = async () => {
      const markunread = await getMarkAsUnreadStatus(receiverId);
      if (markunread !== null) {
        setMarkAsUnread(markunread);
      }
    };

    fetchMarkAsUnreadStatus();

    if (message.includes('Image') && message.length < 11) {
      setIcon('image');
    } else if (message.includes('Video') && message.length < 11) {
      setIcon('video');
    } else if (message.includes('Document') && message.length < 13) {
      setIcon('document');
    } else {
      setIcon('null');
    }
  }, [message, userId]);

  const onPress = () => {
    navigation.navigate('IndividualChat', {
      userName: userName,
      profileImageSource: profileImageSource,
      receiverId: receiverId,
      userId: userId,
      status: status,
    });
  };

  const toggleOptionsModal = () => {
    setIsOptionsModalVisible(!isOptionsModalVisible);
  };

  const onOptionClick = async (option: string) => {
    switch (option) {
      case 'Mark as unread':
        setMarkAsUnread(true);
        await saveMarkAsUnreadStatus(receiverId, true);
        break;
      case 'Mark as read':
        setMarkAsUnread(false);
        await saveMarkAsUnreadStatus(receiverId, false);
        break;
      case 'Delete':
        await deleteChat(receiverId, userId);
        break;
      case 'Clear chat':
        console.log('Clear chat');
        break;
      case 'Block':
        console.log('Block');
        break;
    }
    setIsOptionsModalVisible(false);
  };

  const handleLayout = () => {
    chatItemRef.current.measure((x, y, width, height, pageX, pageY) => {
      setChatItemLayout({x: pageX, y: pageY, width, height});
    });
  };
  const modalOptions = [
    { text: markAsUnread ? 'Mark as read' : 'Mark as unread' },
    { text: 'Delete' },
    { text: 'Block' },
  ];
  
  const saveMarkAsUnreadStatus = async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));      
    } catch (error) {
      console.error('Error saving mark as unread status:', error);
    }
  };

  const getMarkAsUnreadStatus = async (key: string): Promise<boolean | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting mark as unread status:', error);
      return null;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.chatItemContainer}
        onPress={onPress}
        onLongPress={toggleOptionsModal}
        ref={chatItemRef}
        onLayout={handleLayout}>
        {profileImageSource ? (
          <Image
            source={{uri: profileImageSource}}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require('../../assets/images/placeholder.jpg')}
            style={styles.profileImage}
          />
        )}
        <View style={styles.messageContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.userName}>{userName}</Text>
            <Text
              style={[
                styles.timeText,
                {
                  color: notificationCount || markAsUnread
                    ? Colors.primaryColor
                    : Colors.quadraryColor,
                },
              ]}>
              {time}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={[
                styles.messageText,
                {
                  color: notificationCount || markAsUnread
                    ? Colors.tertiaryColor
                    : Colors.quadraryColor,
                  width: notificationCount || markAsUnread ? '90%' : '100%',
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {message}
              {icon === 'image' ? (
                <Image source={require('../../assets/images/chatImage.png')} />
              ) : icon === 'video' ? (
                <Image source={require('../../assets/images/chatVideo.png')} />
              ) : icon === 'document' ? (
                <Image
                  source={require('../../assets/images/chatDocument.png')}
                />
              ) : null}
            </Text>
            {notificationCount ? (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{notificationCount}</Text>
              </View>
            ) : null}

            {markAsUnread && (!notificationCount || notificationCount === 0) ? (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}></Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <OptionsModal
        visible={isOptionsModalVisible}
        onClose={toggleOptionsModal}
        foregroundColor={Colors.tertiaryColor}
        onOptionClick={onOptionClick}
        modalStyle={{
          top: chatItemLayout.y + 5,
          left: chatItemLayout.x + chatItemLayout.width - 140,
          backgroundColor: Colors.secondaryWhite,
          width: 140,
        }}
        options={modalOptions}
      />
    </>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  chatItemContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  profileImage: {
    borderRadius: 28,
    height: 55,
    width: 55,
  },
  messageContainer: {
    marginTop: 10,
    marginLeft: 5,
    width: '82%',
    paddingLeft: 5,
  },
  userName: {
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
    fontSize: 15,
    lineHeight: 17,
    width: '80%',
  },
  messageText: {
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
    paddingTop: 2,
    paddingLeft: 2,
    fontSize: 14,
    lineHeight: 18,
  },
  timeContainer: {
    marginTop: 5,
    width: '14%',
  },
  timeText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 14,
  },
  notificationBadge: {
    backgroundColor: Colors.primaryColor,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  notificationText: {
    fontFamily: Fonts.regular,
    color: Colors.secondaryColor,
    fontSize: 12,
    lineHeight: 17,
    alignSelf: 'center',
  },
});
