import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import InputField from '../../components/InputField';
import Fonts from '../../../assets/fonts/fonts';

const ChatScreen: React.FC = () => {
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
        <View style={styles.chatItemContainer}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.messageContainer}>
            <Text style={styles.userName}>Muhammad Qasim</Text>
            <Text
              style={styles.messageText}
              numberOfLines={1}
              ellipsizeMode="tail">
              This is sample message sent by Muhammad Qasim
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>12:30 PM</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>2</Text> 
            </View>
            {/* make chat separate component */}
          </View>
        </View>
      </ScrollView>
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
  chatItemContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    height: 55,
    width: 55,
  },
  messageContainer: {
    marginTop: 5,
    marginLeft:5,
    width: '69%',
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
    color: Colors.primaryColor,
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
    marginTop: 5,
  },
  notificationText: {
    fontFamily: Fonts.regular,
    color: Colors.secondaryColor,
    fontSize: 12,
    lineHeight: 14,
    alignSelf: 'center',
  },
});
