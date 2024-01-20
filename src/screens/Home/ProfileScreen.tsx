import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import PressableBtn from '../../components/PressableBtn';

const ProfileScreen = () => {
  const onLogout = () => {
    Alert.alert('Logout');
  };
  return (
    <View style={styles.container}>
      <Header text="Profile" RighticonName="settingsIcon" />
      <View style={{flex: 2}} />
      <View style={{flex: 2}} />
      <View style={styles.bottom}>
        <PressableBtn
          onPress={onLogout}
          fontColor={Colors.secondaryColor}
          text="Logout"
        />
      </View>
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
});
