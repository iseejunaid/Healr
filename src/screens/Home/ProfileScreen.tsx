import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  Button,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import PressableBtn from '../../components/PressableBtn';
import Fonts from '../../../assets/fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const items = [
    {label: 'Status'},
    {label: 'My QR Code'},
    {label: 'Healr Web'},
    {label: 'Change Password'},
  ];

  const onLogout = () => {
    Alert.alert('Logout');
  };
  return (
    <View style={styles.container}>
      <Header text="Profile" RighticonName="settingsIcon" />

      <View style={{flex: 2}}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.35)',
            'rgba(228, 246, 247, 0.35)',
            'rgba(34, 40, 49, 0.35)',
          ]}
          style={styles.gradientBackground}>
          <View
            style={{
              height: 110,
              width: '100%',
            }}></View>
        </LinearGradient>
        <View style={styles.imgView}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={{height: 100, width: 100}}
          />
          <Text style={styles.nametxt}>Muhammad Qasim</Text>
          <Text style={styles.professiontxt}>Orthopedic Surgeon</Text>
          <Text style={styles.statustxt}>Available</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={{color: Colors.secondaryColor}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 2, alignItems: 'center'}}>
        {items.map(({label}, index) => (
          <TouchableOpacity key={index} style={styles.middle}>
            <Text style={styles.middletxt}>{label}</Text>
            <Image
              source={require('../../../assets/images/rightArrow.png')}
              style={styles.rightArrowimg}
            />
          </TouchableOpacity>
        ))}
      </View>

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
  gradientBackground: {
    height: 110,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imgView: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
  nametxt: {
    fontSize: 18,
    color: Colors.tertiaryColor,
    fontFamily: Fonts.semiBold,
    lineHeight: 21,
  },
  professiontxt: {
    fontSize: 16,
    color: Colors.tertiaryColor,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
  statustxt: {
    fontSize: 14,
    color: Colors.quadraryColor,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  editBtn: {
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.tertiaryColor,
    width: 105,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  middle: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center',
  },
  middletxt: {
    marginTop: 1,
    fontSize: 13,
    color: Colors.tertiaryColor,
    fontFamily: Fonts.regular,
  },
  rightArrowimg: {
    height: 15,
    width: 9,
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
});
