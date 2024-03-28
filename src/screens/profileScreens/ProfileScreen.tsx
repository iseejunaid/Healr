import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import PressableBtn from '../../components/PressableBtn';
import Fonts from '../../../assets/fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {auth} from '../../../configs/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const isInternValue = await AsyncStorage.getItem('isIntern');
        const expertiseValue = await AsyncStorage.getItem('expertise');

        if(name){
          setName(name);
        }

        if (isInternValue !== 'true' && expertiseValue !== null) {
          setExpertise(capitalizeFirstLetter(expertiseValue));
        }else{
          setExpertise('Medical Intern');
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error.message);
      }
    };

    fetchData();
  }, []);

  const items = [
    {label: 'Status'},
    {label: 'My QR Code'},
    {label: 'Notifications'},
    {label: 'Change Password'},
  ];

  const onLogout = async () => {
    try {
      await auth.signOut();
      navigation.popToTop();
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={{flex: 2}}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.35)',
            'rgba(228, 246, 247, 0.35)',
            'rgba(34, 40, 49, 0.35)',
          ]}
          style={styles.gradientBackground}>
          <Header text="Profile" />
          <View
            style={{
              height: 110,
              width: '100%',
            }}></View>
        </LinearGradient>
        <View style={styles.imgView}>
          <View style={styles.circle}>
            <Image
              source={require('../../../assets/images/placeholder.jpg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.nametxt}>{name}</Text>
          <Text style={styles.professiontxt}>{expertise}</Text>
          <Text style={styles.statustxt}>Available</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={{color: Colors.secondaryColor}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1.5,
          alignItems: 'center',
          marginTop: '6%',
          marginBottom: '4%',
        }}>
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
    height: 150,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden', 
    borderWidth: 5,
    borderColor: Colors.secondaryColor,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imgView: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
  },
  nametxt: {
    marginTop:"2%",
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
