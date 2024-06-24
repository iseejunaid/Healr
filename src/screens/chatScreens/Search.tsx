import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import {fetchUserId, sendMedia} from './ChatHelper';
import {db} from '../../../configs/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const SearchScreen = ({navigation, route}: any) => {
  const [searchText, setSearchText] = useState('');
  const [placeHolder, setPlaceHolder] = useState('Search Messages and People');
  const [searchMessages, setSearchMessages] = useState(true);
  const [searchUsers, setSearchUsers] = useState(true);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // Fetch user ID
        const id = await fetchUserId();
        setUserId(id);

        // Fetch users
        const users = [];
        const querySnapshot = await db
          .collection('users')
          .where('uid', '!=', id)
          .get();
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          users.push({
            name: userData.name,
            photoURL: userData.photoURL,
            uid: userData.uid,
            status: userData.status,
            expertise: userData.expertiseInput
              ? userData.expertiseInput
              : userData.expertise,
            verified: userData.isVerified,
          });
        });
        setUsers(users);

        // Fetch messages
        const messages = [];

        // Query for messages where the user is the sender
        const senderMessagesSnapshot = await db
          .collection('chats')
          .where('user._id', '==', id)
          .get();

        senderMessagesSnapshot.forEach(doc => {
          const data = doc.data();
          delete data.received;
          delete data.sent;
          messages.push({...data});
        });

        // Query for messages where the user is the receiver
        const receiverMessagesSnapshot = await db
          .collection('chats')
          .where('receiver_id', '==', id)
          .get();

        receiverMessagesSnapshot.forEach(doc => {
          const data = doc.data();
          delete data.received;
          delete data.sent;
          messages.push({...data});
        });

        // Use a map to get unique messages based on _id
        const uniqueMessages = Array.from(
          new Map(messages.map(item => [item._id, item])).values(),
          setLoading(false),
        );

        // Update state with the unique messages
        setMessages(uniqueMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (route.params) {
      searchPeople();
    }
  }, [route]);

  const searchMessage = () => {
    setSearchMessages(true);
    setSearchUsers(false);
    setPlaceHolder('Search Messages');
  };
  const searchPeople = () => {
    setSearchUsers(true);
    setSearchMessages(false);
    setPlaceHolder('Search People');
  };
  const handleBack = () => {
    if (route.params) {
      navigation.pop();
      return;
    }

    if (!searchMessages || !searchUsers) {
      setPlaceHolder('Search Messages and People');
      setSearchMessages(true);
      setSearchUsers(true);
    } else {
      navigation.pop();
    }
  };
  const handleChange = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredMessages([]);
      setFilteredUsers([]);
      return;
    }

    setSearchText(text);
    if (searchMessages && searchUsers) {
      filterAndSetMostRecentMessages(messages, text, userId);
      const filteredUsers = users.filter((user: any) =>
        user.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredUsers(filteredUsers);
    } else {
      if (searchMessages) {
        filterAndSetMostRecentMessages(messages, text, userId);
      } else if (searchUsers) {
        const filteredUsers = users.filter((user: any) =>
          user.name.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredUsers(filteredUsers);
      }
    }
  };

  const filterAndSetMostRecentMessages = (
    messages: object,
    searchText: string,
    userId: string,
  ) => {
    var filteredMessages = [];
    if (Array.isArray(messages) && messages.length > 0) {
      filteredMessages = messages.filter(
        message =>
          typeof message.text === 'string' &&
          message.text.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    const mostRecentMessages = {};
    filteredMessages.forEach(message => {
      const messageUserId =
        message.user._id === userId ? message.receiver_id : message.user._id;
      const messageUserName =
        users.find(user => user.uid === messageUserId)?.name || '';
      if (
        !mostRecentMessages[messageUserId] ||
        mostRecentMessages[messageUserId].createdAt < message.createdAt
      ) {
        mostRecentMessages[messageUserId] = message;
        if (!mostRecentMessages[messageUserId].userName) {
          mostRecentMessages[messageUserId].userName = messageUserName;
        }
        if (typeof message.createdAt === 'object')
          mostRecentMessages[messageUserId].date = formatDate(
            message.createdAt,
          );
      }
    });
    const result = Object.values(mostRecentMessages);
    setFilteredMessages(result);
  };

  function formatDate(date: Date) {
    date = date.toDate();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;

    return formattedDate;
  }

  const renderHighlightedText = (messageText: string) => {
    if (!searchText) {
      return <Text style={styles.optionstxt}>{messageText}</Text>;
    }

    // Split the messageText into parts before and after searchText
    const parts = messageText.split(new RegExp(`(${searchText})`, 'gi'));

    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        // Highlighted text with red color
        <Text key={index} style={styles.highlighted}>
          {part}
        </Text>
      ) : (
        <Text key={index} style={styles.optionstxt}>
          {part}
        </Text>
      ),
    );
  };

  const messagePressed = (message: object) => () => {
    const receiver_id =
      message.user._id === userId ? message.receiver_id : message.user._id;
    const receiver = users.find(user => user.uid === receiver_id);
    navigation.navigate('IndividualChat', {
      userId: userId,
      userName: receiver.name,
      status: receiver.status,
      profileImageSource: receiver.photoURL,
      receiverId: receiver_id,
    });
  };

  const sendFile = (user: any) => {
    sendMedia(route.params.data, user.uid);
    navigation.navigate('IndividualChat', {
      userName: user.name,
      profileImageSource: user.photoURL,
      receiverId: user.uid,
      userId: userId,
      status: user.status,
    });
  };

  const userPressed = (user: object) => async () => {
    const {uid, verified} = user;
    const currUserVerified = await AsyncStorage.getItem('isVerified');

    if (verified) {
      if (currUserVerified === 'true')
        if (route.params?.data) {
          sendFile(user);
        } else {
          navigation.navigate('ViewProfile', {userId: uid});
        }
      else {
        Alert.alert(
          'Error',
          'You need to be verified to interact with Verified users.',
        );
      }
    } else {
      if (route.params?.data) {
        sendFile(user);
      } else {
        navigation.navigate('ViewProfile', {userId: uid});
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headCol} onPress={handleBack}>
          <Image source={require('../../../assets/images/back.png')} />
        </TouchableOpacity>
        <View style={[styles.headCol, {width: '95%'}]}>
          <TextInput
            style={styles.input}
            placeholder={placeHolder}
            placeholderTextColor={Colors.quadraryColor}
            value={searchText}
            onChangeText={handleChange}
          />
        </View>
      </View>
      {searchMessages && searchUsers && (
        <View style={styles.searchOptions}>
          <TouchableOpacity style={styles.options} onPress={searchMessage}>
            <Image source={require('../../../assets/images/search.png')} />
            <Text style={styles.optionstxt}>Search Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={searchPeople}>
            <Image source={require('../../../assets/images/search.png')} />
            <Text style={styles.optionstxt}>Search People</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={styles.body}>
        {loading && (
          <View style={{marginTop: 10}}>
            <Loader />
          </View>
        )}
        {searchMessages && (
          <View>
            {filteredMessages.map((message: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.message}
                onPress={messagePressed(message)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.optionstxt,
                      {color: Colors.tertiaryColor, marginLeft: 0},
                    ]}>
                    {message.userName}
                  </Text>
                  <Text style={[styles.optionstxt, {fontSize: 12}]}>
                    {message.date}
                  </Text>
                </View>
                <Text>{renderHighlightedText(message.text)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {searchUsers && (
          <View style={{marginTop: 10}}>
            {filteredUsers.map((user: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.message}
                onPress={userPressed(user)}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Image
                    source={
                      user.photoURL
                        ? {uri: user.photoURL}
                        : require('../../../assets/images/placeholder.jpg')
                    }
                    style={{width: 50, height: 50, borderRadius: 50}}
                  />
                  <Image
                    source={
                      user.verified
                        ? require('../../../assets/images/verified.png')
                        : require('../../../assets/images/unVerified.png')
                    }
                    style={styles.badge}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={[
                        styles.optionstxt,
                        {color: Colors.tertiaryColor},
                      ]}>
                      {renderHighlightedText(user.name)}
                    </Text>
                    <Text
                      style={[styles.optionstxt, {fontSize: 12, marginTop: 0}]}>
                      {user.expertise.charAt(0).toUpperCase() +
                        user.expertise.slice(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.secondaryColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 10,
    elevation: 5,
    boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.20);',
    backgroundColor: Colors.secondaryWhite,
  },
  headCol: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 3,
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
  searchOptions: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 5,
    boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.20);',
    backgroundColor: Colors.secondaryWhite,
  },
  optionstxt: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 3,
    color: Colors.quadraryColor,
  },
  body: {
    width: '100%',
    marginTop: 10,
    height: '100%',
    backgroundColor: Colors.secondaryWhite,
  },
  message: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
  },
  highlighted: {
    color: Colors.primaryColor,
    fontFamily: Fonts.regular,
  },
  badge: {
    position: 'absolute',
    top: 25,
    left: 30,
  },
});
export default SearchScreen;
