import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, StatusBar} from 'react-native';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import QRCode from 'react-native-qrcode-svg';
import {fetchUserId} from '../chatScreens/ChatHelper';
import Loader from '../../components/Loader';

const ProfileQRScreen: React.FC = ({navigation, route}: any) => {
  const {profileImageSource, name, expertise} = route.params;
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUserId().then(id => {
      setUserId(id);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.tertiaryColor} barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{height: '100%', justifyContent: 'center'}}
          onPress={() => navigation.pop()}>
          <Image
            source={require('../../../assets/images/back.png')}
            tintColor={Colors.secondaryWhite}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 22,
          }}>
          <Text style={styles.headerText}>My QR Code</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.QRcontainer}>
          <View style={styles.circle}>
            {profileImageSource ? (
              <Image source={{uri: profileImageSource}} style={styles.image} />
            ) : (
              <Image
                source={require('../../../assets/images/placeholder.jpg')}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userExpertise}>{expertise}</Text>
          </View>
          <View style={{height: 150, justifyContent: 'center'}}>
            {!userId ? (
              <Loader />
            ) : (
              <QRCode
                value={userId}
                logo={require('../../../assets/images/logo.png')}
                logoBackgroundColor={Colors.secondaryWhite}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Scan </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ScanQR')}>
            <Text style={styles.bottombtntxt}>Code</Text>
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
  headerContainer: {
    flex: 0.07,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backImg: {
    height: 20,
    width: 22,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.secondaryWhite,
  },
  body: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  QRcontainer: {
    height: 250,
    width: 250,
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
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
  },
  userExpertise: {
    fontSize: 14,
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
});

export default ProfileQRScreen;
