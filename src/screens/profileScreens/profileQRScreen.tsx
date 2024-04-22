import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import QRCode from 'react-native-qrcode-svg';

const ProfileQRScreen: React.FC = ({navigation}: any) => {
  return (
    <View style={styles.container}>
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
      <View style={{flex:0.5,justifyContent:'center',alignItems:'center',width:'70%'}}>
        <QRCode
          value="https://www.google.com"
          size={200}
          color={Colors.secondaryColor}
          backgroundColor={Colors.tertiaryColor}
    //       logo={{uri: base64Logo}}
    //   logoSize={30}
    //   logoBackgroundColor='transparent'
        />
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
});

export default ProfileQRScreen;
