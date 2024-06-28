import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';
import ScreensHeader from './ScreensHeader';

const GetVerified: React.FC = ({navigation, route}: any) => {
  const {profileImageSource, name, expertise} = route.params;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.tertiaryColor}
        barStyle="light-content"
      />
      <ScreensHeader navigation={navigation} text="Get Verified" />
      <View style={styles.body}>
        <View style={styles.QRcontainer}>
          <View style={styles.circle}>
            {profileImageSource ? (
              <Image source={{uri: profileImageSource}} style={styles.image} />
            ) : (
              <Image
                source={require('../../../../assets/images/placeholder.jpg')}
                style={styles.image}
              />
            )}
          </View>
          <Image
            source={require('../../../../assets/images/verified.png')}
            style={styles.verifiedBadge}
          />
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userExpertise}>{expertise}</Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: Fonts.semiBold,
                color: Colors.quadraryColor,
                marginTop: -2,
              }}>
              (Verified)
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
            <Text style={styles.verificationText}>
              Wanna get verified? Follow the simple steps below to obtain your
              verified badge and enhance your professional profile on Healr: {'\n'}
              1. Provide your identification information accurately.{'\n'}
              2. Upload any required credentials or certifications.{'\n'}
              3. Complete the verification process.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Let's </Text>
          <TouchableOpacity onPress={() => navigation.navigate('GetVerifiedStep1')}>
            <Text style={styles.bottombtntxt}>Begin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.tertiaryColor,
  },
  body: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  QRcontainer: {
    width: 290,
    height: '55%',
    backgroundColor: Colors.secondaryWhite,
    borderRadius: 12,
    alignItems: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: Colors.secondaryWhite,
    top: -30,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userDetailsContainer: {
    marginTop: -30,
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
  },
  userExpertise: {
    fontSize: 11,
    marginTop: -5,
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
  footer: {
    flex: 0.13,
  },
  bottomtxt: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.secondaryColor,
  },
  bottombtntxt: {
    color: Colors.primaryColor,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    marginTop: '2%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 10,
    right: 110,
  },
  verificationText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
});

export default GetVerified;
