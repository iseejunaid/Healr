import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import ChatItem from '../../components/ChatItem';
import {fetchChats} from './ChatHelper';
import {ChatData} from './ChatHelper';
import {auth} from '../../../configs/firebaseConfig';
import Loader from '../../components/Loader';
import Fonts from '../../../assets/fonts/fonts';
import OptionsModal from '../../components/OptionsModal';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen: React.FC = ({navigation}: any) => {
  const [chatsData, setChatsData] = useState<ChatData>({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState('unverified');
  const userId = auth?.currentUser?.uid;

  const fetchChatsData = useCallback(async () => {
    try {
      const data = await fetchChats(); // Your fetchChats function
      setChatsData(data);
    } catch (error) {
      console.error('Error fetching chats data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchChatsData();
    }, [fetchChatsData]),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChatsData();
    });
    return unsubscribe;
  }, [fetchChatsData, navigation]);

  useEffect(() => {
    const checkVerification = async () => {
      const verifiedStatus = await AsyncStorage.getItem('verifiedStatus');
      setVerifiedStatus(verifiedStatus);
    };
    checkVerification();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const options = [
    {text: 'Invite'},
    {text: 'My QR'},
    verifiedStatus === 'unverified' ? {text: 'Get Verified'} : null,
  ].filter(option => option !== null);

  const handleOptionClick = async (option: string) => {
    const profileImageSource = await AsyncStorage.getItem('photoURL');
    const name = await AsyncStorage.getItem('name');
    const expertise = await AsyncStorage.getItem('expertise');
    switch (option) {
      case 'Invite':
        navigation.navigate('NewChat', {invite: true});
        break;
      case 'My QR':
        navigation.navigate('Profile', {
          screen: 'ProfileQR',
          params: {profileImageSource, name, expertise},
        });
        break;
      case 'Get Verified':
        navigation.navigate('GetVerified', {
          screen: 'ProfileQR',
          params: {profileImageSource, name, expertise},
        });
        break;
    }
  };

  const searchPressed = () => {
    navigation.navigate('Search');
    return true;
  };

  return (
    <View style={styles.container}>
      <Header
        text="Chats"
        LefticonName="cameraIcon"
        navigation={navigation}
        onrightIconPress={() => toggleModal()}
        RighticonName="dotsIcon"
      />
      {loading ? (
        <View style={styles.chatsContainer}>
          <Loader backgroundColor={Colors.secondaryColor} />
        </View>
      ) : (
        <ScrollView style={styles.chatsContainer}>
          <View
            style={styles.searchInput}
            onStartShouldSetResponder={searchPressed}>
            <Text style={styles.searchtxt}>Search</Text>
          </View>
          {Object.keys(chatsData).length > 0 ? (
            Object.keys(chatsData).map((key: string) => {
              const createdAt = chatsData[key].createdAt.toDate();
              const imgSource = chatsData[key].profilepic ?? '';              
              const timeString = createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });
              return (
                <ChatItem
                  key={key}
                  navigation={navigation}
                  receiverId={key}
                  userId={userId ?? ''}
                  profileImageSource={imgSource}
                  userName={chatsData[key].name}
                  message={chatsData[key].text}
                  time={timeString}
                  notificationCount={chatsData[key].notificationCount}
                  status={chatsData[key].status}
                  markDelete={false}
                />
              );
            })
          ) : (
            <View
              style={{
                height: 500,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={require('../../../assets/images/noChat.png')} />
              <Text
                style={{
                  marginTop: '5%',
                  fontFamily: Fonts.regular,
                  color: Colors.tertiaryColor,
                }}>
                Ready to Talk? Let's Begin!
              </Text>
            </View>
          )}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.newChatButton}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('NewChat', {invite: true, healrContacts: true});
        }}>
        <Image
          source={require('../../../assets/images/newChat.png')}
          style={styles.newChatIcon}
        />
      </TouchableOpacity>
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
export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
  },
  chatsContainer: {
    height: '90%',
    width: '100%',
  },
  searchInput: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 6,
    alignSelf: 'center',
    width: '92%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 6,
    backgroundColor: Colors.secondaryWhite,
    marginBottom: 15,
  },
  searchtxt: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    marginTop: 5,
    color: Colors.quadraryColor,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    backgroundColor: Colors.tertiaryColor,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 4,
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 4,
  },
  newChatIcon: {
    height: 30,
    width: 28,
    marginTop: -5,
    marginLeft: 5,
  },
});
