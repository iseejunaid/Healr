// ChatItem.tsx
import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';

interface ChatItemProps {
  profileImageSource: any;
  userName: string;
  message: string;
  time: string;
  notificationCount?: number;
  onPress: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  profileImageSource,
  userName,
  message,
  time,
  notificationCount,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.chatItemContainer}
    onPress={onPress}>
      <Image source={profileImageSource} style={styles.profileImage} />
      <View style={styles.messageContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.userName}>{userName}</Text>
          <Text
            style={[
              styles.timeText,
              {
                color: notificationCount
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
                color: notificationCount
                  ? Colors.tertiaryColor
                  : Colors.quadraryColor,
                width: notificationCount ? '90%' : '100%',
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {message}
          </Text>
          {notificationCount ? (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{notificationCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
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
    height: 55,
    width: 55,
  },
  messageContainer: {
    marginTop: 10,
    marginLeft: 5,
    width: '82%',
  },
  userName: {
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
    fontSize: 15,
    lineHeight: 17,
  },
  messageText: {
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
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
    // left: '550%',
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