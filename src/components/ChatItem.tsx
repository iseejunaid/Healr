import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';

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
  const onPress = () => {
    navigation.navigate('IndividualChat', {
      userName: userName,
      profileImageSource: profileImageSource,
      receiverId: receiverId,
      userId: userId,
      status: status,
    });
  };
  

  return (
    <TouchableOpacity style={styles.chatItemContainer} onPress={onPress}>
      {profileImageSource ? (
        <Image source={{uri: profileImageSource}} style={styles.profileImage} />
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
    borderRadius: 28,
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
    width: '80%',
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
