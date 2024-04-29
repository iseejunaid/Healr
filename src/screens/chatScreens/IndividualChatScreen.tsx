import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import CustomInputToobar from './chatComponents/CustomInputToobar';
import {renderCustomBubble} from './chatComponents/ChatBubble';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import 'react-native-get-random-values';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../../../configs/firebaseConfig';
import {composeMsg, sendDocument, sendMedia} from './ChatHelper';
import RenderVideo from './chatComponents/RenderVideo';
import RenderCustomView from './chatComponents/RenderCustomView';
import RenderAudio from './chatComponents/RenderAudio';

interface Message {
  _id: string;
  receiver_id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
  };
}

const IndividualChatScreen = ({navigation, route}: any) => {
  const {userId, userName, status, profileImageSource, receiverId} =
    route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const onSend = (messages: any, type: string) => {
    if (type === 'text') {
      const messageText = messages?.text;
      const msg = composeMsg(messageText, receiverId, 'text');
      setText('');
      db.collection('chats').doc(msg._id).set(msg);
    } else if (type === 'media') {      
      sendMedia(messages, receiverId);
    }else if (type === 'document') {
      sendDocument(messages, receiverId);
    }
  };

  useEffect(() => {
    const collectionRef = collection(db, 'chats');
    const q = query(
      collectionRef,
      orderBy('createdAt', 'desc'),
      where('user._id', 'in', [userId, receiverId]),
      where('receiver_id', 'in', [userId, receiverId]),
    );
    
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.id,
          receiver_id: doc.data().receiver_id,
          text: doc.data().text,
          image: doc.data().image,
          video: doc.data().video,
          audio: doc.data().audio,
          document: doc.data().document,
          documentName: doc.data().documentName,
          documentType: doc.data().documentExtension,
          documentmrn: doc.data().documentmrn,
          documentDescription: doc.data().documentdescription,
          createdAt: doc.data().createdAt.toDate(),
          user: {
            _id: doc.data().user._id,
          },
        })),
      );
    });

    return () => unsubscribe();
  }, [userId, receiverId]);

  const customtInputToolbar = () => {
    return <CustomInputToobar text={text} setText={setText} onSend={onSend} receiverId={receiverId} navigation={navigation} />;
  };

  const renderVideo = (props: any) => {    
    return <RenderVideo {...props} />;
  }

  const renderCustomView = (props: any) => {
    return <RenderCustomView {...props} />;
  };

  const renderAudio = (props: any) => {
    return <RenderAudio {...props} />;
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View
          style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{height: '100%', justifyContent: 'center'}}
            onPress={() => navigation.popToTop({ screen: 'ChatHome' })}>
            <Image
              source={require('../../../assets/images/back.png')}
              style={styles.backImg}
            />
          </TouchableOpacity>
          <View
            style={{flexDirection: 'row', marginLeft: 20}}
            onStartShouldSetResponder={() => {
              navigation.navigate('ViewProfile', {
                userId: receiverId,
              });
              return false;
            }}>
            <View style={styles.avatarContainer}>
              {profileImageSource ? (
                <Image
                  source={{uri: profileImageSource}}
                  style={styles.avatarImage}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/placeholder.jpg')}
                  style={styles.avatarImage}
                />
              )}
            </View>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Text style={styles.nameText}>{userName}</Text>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>
        </View>
        <View style={styles.callIconsContainer}>
          <TouchableOpacity style={styles.callIcon}>
            {/* <Image source={require('../../../assets/images/call.png')} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.callIcon}>
            <Image source={require('../../../assets/images/call.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
        messagesContainerStyle={{
          backgroundColor: Colors.secondaryWhite,
          borderRadius: 15,
        }}
        renderMessageVideo={renderVideo}
        renderCustomView={renderCustomView}
        renderMessageAudio={renderAudio}
        renderAvatar={null}
        renderBubble={renderCustomBubble}
        messages={messages}
        user={{
          _id: userId,
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
  nameText: {
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
    marginBottom: -5,
  },
  statusText: {
    fontFamily: Fonts.regular,
    color: Colors.quadraryColor,
    fontSize: 12,
  },
  callIconsContainer: {
    flexDirection: 'row',
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  callIcon: {
    height: '80%',
    justifyContent: 'center',
  },
});
