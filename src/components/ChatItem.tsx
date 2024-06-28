import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';
import OptionsModal from './OptionsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { blockUser, deleteChat, retrieveBlockStatus, unblockUser } from '../screens/chatScreens/ChatHelper';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../configs/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

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
  markDelete?: boolean;
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
  markDelete,
}) => {
  const [icon, setIcon] = useState<'image' | 'video' | 'document' | 'null'>(
    'null',
  );
  const [blocked, setBlocked] = useState(false);
  const [localNotificationCount, setLocalNotificationCount] = useState(0);
  const [markAsUnread, setMarkAsUnread] = useState(false);
  const [deleted, setDeleted] = useState(markDelete);
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
      if(notificationCount){
        setMarkAsUnread(true);
        return;
      }
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
    } else if (message.includes('Document') && message.length < 14) {
      setIcon('document');      
    } else {
      setIcon('null');
    }
  }, [message, userId]);

  useEffect(() => {
    if (notificationCount) {
      setLocalNotificationCount(notificationCount);
    }
  }, [notificationCount]);

  useFocusEffect(
    useCallback(() => {
      const checkIfBlocked = async () => {
        const isBlocked = await retrieveBlockStatus(receiverId);
        setBlocked(isBlocked);
      };
      
      checkIfBlocked();
    }, []));

    useEffect(() => {
      if(notificationCount != localNotificationCount){
        setLocalNotificationCount(notificationCount);
      }
      if(notificationCount === 0){
        setMarkAsUnread(false);
      }
    }, [notificationCount]);

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
        setIsOptionsModalVisible(false);
        await saveMarkAsUnreadStatus(receiverId, true);
        break;
      case 'Mark as read':
        setMarkAsUnread(false);
        setIsOptionsModalVisible(false);
        await saveMarkAsUnreadStatus(receiverId, false);
        break;
      case 'Delete':
        setDeleted(true);
        setIsOptionsModalVisible(false);
        await deleteChat(receiverId, userId);
        break;
      case 'Block':
        setIsOptionsModalVisible(false);
        setBlocked(true);
        blockUser(receiverId);
        break;
      case 'Unblock':
        setIsOptionsModalVisible(false);
        setBlocked(false);
        unblockUser(receiverId);
        break;
    }
  };

  const handleLayout = () => {
    chatItemRef.current.measure((x, y, width, height, pageX, pageY) => {
      setChatItemLayout({x: pageX, y: pageY, width, height});
    });
  };

  const modalOptions = [
    { text: markAsUnread ? 'Mark as read' : 'Mark as unread' },
    { text: 'Delete' },
    { text: blocked ? 'Unblock' : 'Block'},
  ];
  
  const saveMarkAsUnreadStatus = async (key: string, value: boolean) => {
    if(localNotificationCount){
      setLocalNotificationCount(0);

      const collectionRef = collection(db, 'chats');
      const q = query(
        collectionRef,
        where('user._id', '==', receiverId),
        where('receiver_id', '==', userId),
        where('received', '==', false)
      );
      const msgs = await getDocs(q);
      msgs.forEach(async doc => {        
          await updateDoc(doc.ref, {
            received: true,
          });
      });      
    }

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

  return !deleted ? (
    <>
      <TouchableOpacity
        style={styles.chatItemContainer}
        onPress={onPress}
        onLongPress={toggleOptionsModal}
        ref={chatItemRef}
        onLayout={handleLayout}
      >
        {profileImageSource ? (
          <Image
            source={{ uri: profileImageSource }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require('../../assets/images/placeholder.jpg')}
            style={styles.profileImage}
          />
        )}
        <View style={styles.messageContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.userName}>{userName}</Text>
            <Text
              style={[
                styles.timeText,
                {
                  color: localNotificationCount || markAsUnread
                    ? Colors.primaryColor
                    : Colors.quadraryColor,
                },
              ]}
            >
              {time}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={[
                styles.messageText,
                {
                  color: localNotificationCount || markAsUnread
                    ? Colors.tertiaryColor
                    : Colors.quadraryColor,
                  width: localNotificationCount || markAsUnread ? '90%' : '100%',
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {message}
              {icon === 'image' ? (
                <Image source={require('../../assets/images/chatImage.png')} />
              ) : icon === 'video' ? (
                <Image source={require('../../assets/images/chatVideo.png')} />
              ) : icon === 'document' ? (
                <Image source={require('../../assets/images/chatDocument.png')} />
              ) : null}
            </Text>
            {localNotificationCount ? (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{localNotificationCount}</Text>
              </View>
            ) : null}
  
            {markAsUnread && (!localNotificationCount || localNotificationCount === 0) ? (
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
  ) : null;
  
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
