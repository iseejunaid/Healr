import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';

interface ContactItemProps {
  navigation: any;
  profileImageSource?: any;
  userId: string;
  receiverId: string;
  userName: string;
  expertise: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  navigation,
  profileImageSource,
  userId,
  receiverId,
  userName,
  expertise,
}) => {
  
  const onPress = () => {
    navigation.navigate('IndividualChat', {
      userName: userName,
      profileImageSource: profileImageSource,
      receiverId: receiverId,
      userId: userId,
    });
  };

  return (
    <TouchableOpacity style={styles.contactItemContainer} onPress={onPress}>
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
            style={styles.expertiseText}
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
});
