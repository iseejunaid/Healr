import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Colors from '../../../assets/colors/colors';

const ScanQRScreen: React.FC = ({navigation}:any) => {
  
  const handleScan = (event: any) => {
    navigation.navigate('ViewQRProfile',{userId: event.data})
  };

  return (
    <View style={styles.container}>
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
  marker: {
    borderColor: Colors.secondaryWhite,
  }
});

export default ScanQRScreen;
