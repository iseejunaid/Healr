import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import PressableBtn from '../../components/PressableBtn';
import Fonts from '../../../assets/fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {auth, db} from '../../../configs/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const ProfileScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [expertise, setExpertise] = useState('');
  const [status, setStatus] = useState('');
  const [verified, setVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const name = await AsyncStorage.getItem('name');
      setProfileImage((await AsyncStorage.getItem('photoURL')) ?? '');
      setVerified((await AsyncStorage.getItem('isVerified')) === 'true');
      setVerificationStatus((await AsyncStorage.getItem('verifiedStatus')) ?? '');
      const statusValue = await AsyncStorage.getItem('status');
      const expertiseValue = (await AsyncStorage.getItem('expertise')) ?? '';
      const expertiseInput =
        (await AsyncStorage.getItem('expertiseInput')) ?? '';

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

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, []);

  const items = [
    ...(verificationStatus == 'unverified' ? [{label: 'Get Verified'}] :
    verificationStatus == 'pending' ? [{label: 'Verification Status'}] : 
    verificationStatus == 'rejected' ? [{label: 'Request Again'}] : []),
    {label: 'Status'},
    {label: 'My QR Code'},
    {label: 'Change Password'},
  ]; 

  const optionsHandler = async (label: string) => {
    switch (label) {
      case 'Get Verified':
        navigation.navigate('GetVerified',{
          profileImageSource: profileImage,
          name: name,
          expertise: expertise,
        });
        break;
      case 'Verification Status':
        Alert.alert(
          'Verification Status',
          'Your verification is pending. Please wait for the admin to verify your documents.',
        );
        break;
      case 'Request Again':
        navigation.navigate('GetVerified',{
          profileImageSource: profileImage,
          name: name,
          expertise: expertise,
        });
        break;
      case 'Status':
        setIsModalVisible(true);
        break;
      case 'My QR Code':
        navigation.navigate('ProfileQR', {
          profileImageSource: profileImage,
          name: name,
          expertise: expertise,
        });
        break;
      case 'Change Password':
        navigation.navigate('CreateNewPassScreen');
        break;
      default:
        break;
    }
  };

  const onLogout = async () => {
    try {
      await AsyncStorage.clear();
      await auth.signOut();
      navigation.navigate('LoginScreen');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (capitalizeFirstLetter(newStatus) === status) {
      setIsModalVisible(false);
      return;
    }
    try {
      setStatus(capitalizeFirstLetter(newStatus));
      setIsModalVisible(false);
      await AsyncStorage.setItem('status', newStatus);
      const userId = auth.currentUser?.uid;
      db.collection('users')
        .where('uid', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              status: newStatus,
            });
          });
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });
    } catch (error: any) {
      console.error('Error updating status:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.secondaryColor} barStyle={'dark-content'} />
      <View style={{flex: verified ? 0.75 : 0.9}}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.35)',
            'rgba(228, 246, 247, 0.35)',
            'rgba(34, 40, 49, 0.35)',
          ]}
          style={styles.gradientBackground}>
          <Header text="Profile" />
          <View style={{height: 110, width: '100%'}}></View>
        </LinearGradient>
        {loading ? (
          <Loader />
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
              <Text style={{color: Colors.secondaryColor,fontFamily:Fonts.regular,marginTop:3}}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Image
        style={styles.verificationBadge}
        source={
          verified
            ? require('../../../assets/images/verified.png')
            : require('../../../assets/images/unVerified.png')
        }
      />
      <View
        style={{
          alignItems: 'center',
          marginBottom: '4%',
        }}>
        {items.map(({label}, index) => (
          <TouchableOpacity
            key={index}
            style={styles.middle}
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

      <Modal
        visible={isModalVisible}
        transparent
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide">
        <View
          style={styles.modalBackground}
          onStartShouldSetResponder={() => {
            setIsModalVisible(false);
            return false;
          }}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => updateStatus('available')}>
              <Text style={styles.modalOptionTxt}>Available</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => updateStatus('unavailable')}>
              <Text style={styles.modalOptionTxt}>Unavailable</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setIsModalVisible(false)}>
              <Text
                style={[styles.modalOptionTxt, {fontFamily: Fonts.semiBold}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    width: '100%',
    elevation: 10,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.quadraryColor,
  },
  modalOptionTxt: {
    fontSize: 14,
    color: Colors.tertiaryColor,
    fontFamily: Fonts.regular,
  },
  closeModalBtn: {
    padding: 15,
    borderTopColor: Colors.quadraryColor,
    alignItems: 'center',
  },
  verificationBadge: {
    position: 'absolute',
    top: 175,
    right: 155,
  },
});
