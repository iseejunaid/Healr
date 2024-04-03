import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Bubble, Composer, GiftedChat, Send} from 'react-native-gifted-chat';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import {auth, db} from '../../../configs/firebaseConfig';

interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}


const IndividualChatScreen = ({navigation}: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const onSend = (messages: any) => {
    const messageText = messages?.text;
    const msg = composeMsg(messageText);
    setText('');
    console.log(msg);
    addDoc(collection(db, 'chats'), msg)
  };

  const composeMsg = (text: string) => {
    console.log('text', text);

    const createdAt = new Date();
    const msg = {
      _id: 1, // receiverID
      createdAt,
      text,
      user: {_id: auth?.currentUser?.uid, name: 'User 1'},
    };
    return msg;
  };

  useEffect(() => {
    const collectionRef = collection(db, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user,
        })),
      );
    });

    return () => unsubscribe();
  }, []);

  const customtInputToolbar = () => {
    return (
      <View style={styles.customInputView}>
        <TouchableOpacity
          style={{paddingTop: 6}}
          onPress={() => console.log('Pressed')}>
          <Image source={require('../../../assets/images/chatOptions.png')} />
        </TouchableOpacity>
        <Composer
          placeholder="Message"
          text={text}
          onTextChanged={val => {
            setText(val);
          }}
          textInputStyle={styles.composerTxt}
        />
        <Send
          containerStyle={styles.sendBtnContainer}
          alwaysShowSend
          onSend={mes => onSend(mes)}
          text={text}
          label="Send">
          {text !== '' ? (
            <Image source={require('../../../assets/images/sendMessage.png')} />
          ) : (
            <Image
              source={require('../../../assets/images/recordMessage.png')}
            />
          )}
        </Send>
      </View>
    );
  };

  const renderCustomBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        timeTextStyle={{
          right: {color: Colors.quadraryColor, fontFamily: Fonts.regular},
          left: {color: Colors.quadraryColor, fontFamily: Fonts.regular},
        }}
        textStyle={{
          right: {color: Colors.secondaryWhite, fontFamily: Fonts.regular},
          left: {color: 'black', fontFamily: Fonts.regular},
        }}
        wrapperStyle={{
          left: {
            padding: 2,
            backgroundColor: Colors.secondaryColor,
          },
          right: {
            padding: 2,
            backgroundColor: Colors.tertiaryColor,
          },
        }}
      />
    );
  };

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View
          style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{height: '100%', justifyContent: 'center'}}
            onPress={() => navigation.pop()}>
            <Image
              source={require('../../../assets/images/back.png')}
              style={styles.backImg}
            />
          </TouchableOpacity>
          <View
            style={{flexDirection: 'row', marginLeft: 20}}
            onStartShouldSetResponder={() => console.log('open Profile')}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../assets/images/profile.png')}
                style={styles.avatarImage}
              />
            </View>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.tertiaryColor,
                  marginBottom: -5,
                }}>
                Ahmad Khan
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.quadraryColor,
                  fontSize: 12,
                }}>
                Available
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: 60,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{height: '80%', justifyContent: 'center'}}>
            <Image source={require('../../../assets/images/call.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={{height: '80%', justifyContent: 'center'}}>
            <Image source={require('../../../assets/images/videoCall.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
        messagesContainerStyle={{
          backgroundColor: Colors.secondaryWhite,
          borderRadius: 15,
        }}
        renderAvatar={null}
        renderBubble={renderCustomBubble}
        messages={messages}
        user={{
          _id: auth?.currentUser?.uid || '',
        }}
        renderInputToolbar={customtInputToolbar}
      />
    </View>
  );
};
export default IndividualChatScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    backgroundColor: Colors.secondaryColor,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backImg: {
    height: 20,
    width: 22,
  },
  avatarContainer: {
    height: 45,
    width: 45,
    borderRadius: 22,
    overflow: 'hidden',
  },
  avatarImage: {
    height: '100%',
    width: '100%',
  },
  customInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 2,
    backgroundColor: Colors.secondaryColor,
  },
  composerTxt: {
    height: 45,
    backgroundColor: Colors.secondaryWhite,
    borderRadius: 6,
  },
  sendBtnContainer: {
    marginLeft: 10,
    paddingBottom: 3,
  },
});
