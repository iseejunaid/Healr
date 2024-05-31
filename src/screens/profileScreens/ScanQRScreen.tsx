import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, StatusBar} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';

const ScanQRScreen: React.FC = ({navigation}:any) => {
  
  const handleScan = (event: any) => {
    navigation.navigate('ViewProfile',{userId: event.data})
    navigation.pop(2);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.secondaryColor} barStyle="dark-content" />
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
          <Text style={styles.headerText}>Scan QR Code</Text>
        </View>
      </View>
      <QRCodeScanner
        onRead={handleScan}
        reactivate={true}
        reactivateTimeout={5000}
        showMarker={true}
        markerStyle={styles.marker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor:Colors.secondaryColor
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
    tintColor: Colors.tertiaryColor,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
  },
  marker: {
    borderColor: Colors.secondaryWhite,
  }
});

export default ScanQRScreen;
