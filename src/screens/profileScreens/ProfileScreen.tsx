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
import Loader from '../../components/Loader';

const ProfileScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [expertise, setExpertise] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);  

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const name = await AsyncStorage.getItem('name');
      setProfileImage((await AsyncStorage.getItem('photoURL')) ?? '');
      const statusValue = await AsyncStorage.getItem('status');
      const expertiseValue = (await AsyncStorage.getItem('expertise')) ?? '';
      const expertiseInput = (await AsyncStorage.getItem('expertiseInput')) ?? '';

      if (name) {
        setName(name);
      }

      setStatus(statusValue ? capitalizeFirstLetter(statusValue) : '');
      
      if (expertiseValue === 'unlisted') {
        setExpertise(capitalizeFirstLetter(expertiseInput));
      } else {
        setExpertise(capitalizeFirstLetter(expertiseValue));
      }      
    } catch (error: any) {
      console.error('Error fetching data from AsyncStorage:', error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Use useFocusEffect to fetch data whenever the screen gains focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // Fetch data whenever the screen gains focus
    });

    return unsubscribe; // Clean up the subscription when component unmounts
  }, []);

  const items = [
    {label: 'Status'},
    {label: 'My QR Code'},
    {label: 'Notifications'},
    {label: 'Change Password'},
  ];

  const optionsHandler = (label: string) => {    
    switch (label) {
      case 'Status':
        console.log('Status');
        break;
      case 'My QR Code':
        console.log('My QR Code');
        break;
      case 'Notifications':
        console.log('Notifications');
        break;
      case 'Change Password':
        console.log('Change Password');
        
        navigation.navigate('CreateNewPassScreen');
        break;
      default:
        break;
    }
  }

  const onLogout = async () => {
    try {
      await AsyncStorage.clear();
      await auth.signOut();
      navigation.popToTop();
    } catch (error: any) {
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
          {loading ? (
            <Loader/>
          ) : (
        <View style={styles.imgView}>
          
            <View style={styles.circle}>
              {profileImage ? (
                <Image source={{uri: profileImage}} style={styles.image} />
              ) : (
                <Image
                  source={require('../../../assets/images/placeholder.jpg')}
                  style={styles.image}
                />
              )}
            </View>

          <Text style={styles.nametxt}>{name}</Text>
          <Text style={styles.professiontxt}>{expertise}</Text>
          <Text style={styles.statustxt}>{status}</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={{color: Colors.secondaryColor}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
          )}
      </View>

      <View
        style={{
          flex: 1.5,
          alignItems: 'center',
          marginTop: '6%',
          marginBottom: '4%',
        }}>
        {items.map(({label}, index) => (
          <TouchableOpacity key={index} style={styles.middle}
          onPress={() => optionsHandler(label)}>
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
    marginTop: '2%',
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
