import React, {useState, useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Actions, Composer, GiftedChat, Send} from 'react-native-gifted-chat';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';

interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

const IndividualChatScreen = ({navigation}:any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const composeMsg = text => {
    let uuid = getNewUuid();
    let createdAt = new Date().toISOString();
    const msg = {
      _id: uuid,
      createdAt: createdAt,
      text: text,
      user: {_id: 1, name: 'User 1'},
    };
    return msg;
  };

  const customtInputToolbar = () => {
    return (
      <View style={styles.customInputView}>
        <TouchableOpacity onPress={()=> console.log("Pressed")}>
            <Image
            source={require('../../../assets/images/back.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
        <Composer
          placeholder="Type message here"
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
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.sendIcon}
          />
        </Send>
      </View>
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
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
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
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
    height:55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',    
  },
  composerTxt: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendBtnContainer: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: 'blue',
  },
});