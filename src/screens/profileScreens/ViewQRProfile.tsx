import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../components/Loader';
import OptionsModal from '../../components/OptionsModal';
import { deleteChat } from '../chatScreens/ChatHelper';
import { fetchUser } from './EditProfileHelper';

const ViewQRProfileScreen = ({navigation, route}: any) => {
  const userId = route.params.userId;
  const [name, setName] = useState('');
  const [profileImageSource, setProfileImageSource] = useState('');
  const [expertise, setExpertise] = useState('');
  const [about, setAbout] = useState('');
  const [status, setStatus] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  useEffect(() => {
    fetchUser(userId).then(user => {
        setName(user?.name);
        setProfileImageSource(user?.photoURL);
        setExpertise(capitalizeFirstLetter(user?.expertise));
        setAbout(user?.about);
        setStatus(capitalizeFirstLetter(user?.status));
        setWorkplace(user?.workplace);
        setLoading(false);
        });
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const options = [{text: 'Block'}, {text: 'Delete Chat'}];
  const handleOptionClick = async (option: string) => {
    switch (option) {
      case 'Block':
        console.log('Block');
        break;
      case 'Delete Chat':
        setLoading(true);
        await deleteChat(userId);
        setLoading(false);
        navigation.pop(2);
        break;
      default:
        break;
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <View style={{flex: 0.8}}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.35)',
            'rgba(228, 246, 247, 0.35)',
            'rgba(34, 40, 49, 0.35)',
          ]}
          style={styles.gradientBackground}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={{height: '100%', justifyContent: 'center'}}
              onPress={() => navigation.pop(2)}>
              <Image
                source={require('../../../assets/images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.headerText}>Profile</Text>
            </View>
            <TouchableOpacity
              style={{height: '100%', justifyContent: 'center'}}
              onPress={() => {
                toggleModal();
              }}>
              <Image
                source={require('../../../assets/images/dotsIcon.png')}
                style={styles.dotsImg}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: 110, width: '100%'}} />
        </LinearGradient>
        <View style={styles.imgView}>
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
          <Text style={styles.nametxt}>{name}</Text>
          <Text style={styles.professiontxt}>{expertise}</Text>
          <Text style={styles.statustxt}>{status}</Text>
        </View>
      </View>
      <View style={{flex: 1.5, marginTop: '6%', paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.pop()}>
            <Image
              tintColor={Colors.tertiaryColor}
              source={require('../../../assets/images/messageIcon.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
          <View style={styles.iconCircle}>
            <Image
              tintColor={Colors.tertiaryColor}
              source={require('../../../assets/images/call.png')}
              style={{height: 20, width: 20}}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.heading}>About</Text>
          <Text style={styles.valueText}>{about}</Text>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.heading}>Workplace</Text>
          <Text style={styles.valueText}>{workplace}</Text>
        </View>
      </View>
      <OptionsModal
        visible={modalVisible}
        onClose={toggleModal}
        options={options}
        onOptionClick={handleOptionClick}
        foregroundColor={Colors.tertiaryColor}
        modalStyle={{
          backgroundColor: Colors.secondaryColor,
          top: 45,
          right: 20,
        }}
      />
    </View>
  );
};
export default ViewQRProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
  backImg: {
    height: 20,
    width: 22,
  },
  headerContainer: {
    height: 55,
    backgroundColor: Colors.secondaryColor,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
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
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
  },
  dotsImg: {
    width: 5,
    height: 20,
  },
  heading: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
  },
  valueText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.quadraryColor,
  },
});
