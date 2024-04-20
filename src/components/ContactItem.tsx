import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';

interface ContactItemProps {
  navigation: any;
  profileImageSource?: any;
  handlePress?: () => void;
  userId?: string;
  receiverId?: string;
  userName: string;
  expertise: string;
  invitable?: string;
  status?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  navigation,
  handlePress,
  profileImageSource,
  userId,
  receiverId,
  userName,
  expertise,
  invitable,
  status
}) => {
  const onPress = () => {
    if(invitable){
      const message = `Hey! I would like to invite you to join Healr. Here is the link to download the app: https://healrworld.com/download`;
      const smsUri = `sms:${invitable}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
      Linking.openURL(smsUri).catch(err => console.error('An error occurred', err));
    }else{
      navigation.navigate('IndividualChat', {
        userName: userName,
        profileImageSource: profileImageSource,
        receiverId: receiverId,
        userId: userId,
        status: status,
      });
    }
  };  
  return (
    <TouchableOpacity style={styles.contactItemContainer} onPress={handlePress? handlePress:onPress}>
      {profileImageSource ? (
        <Image source={{uri: profileImageSource}} style={styles.profileImage} />
      ) : (
        <Image
          source={require('../../assets/images/placeholder.jpg')}
          style={styles.profileImage}
        />
      )}
      <View style={styles.expertiseContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={invitable ? styles.inviteText : styles.expertiseText}
            numberOfLines={1}
            ellipsizeMode="tail">
            {expertise}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  contactItemContainer: {
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
  expertiseContainer: {
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
  expertiseText: {
    fontFamily: Fonts.regular,
    color: Colors.quadraryColor,
    paddingTop: 2,
    paddingLeft: 2,
    fontSize: 14,
    lineHeight: 18,
  },
  inviteText: {
    fontFamily: Fonts.semiBold,
    color: Colors.primaryColor,
    paddingTop: 2,
    paddingLeft: 2,
    fontSize: 14,
    lineHeight: 18,
  },
});
