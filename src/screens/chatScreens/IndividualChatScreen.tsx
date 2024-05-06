import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import CustomInputToobar from './chatComponents/CustomInputToobar';
import {renderCustomBubble} from './chatComponents/ChatBubble';
import Colors from '../../../assets/colors/colors';
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
import ChatHeader from './chatComponents/ChatHeader';

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
  const [selectMode, setSelectMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const onSend = (messages: any, type: string) => {
    if (type === 'text') {
      const messageText = messages?.text;
      const msg = composeMsg(messageText, receiverId, 'text');
      setText('');
      db.collection('chats').doc(msg._id).set(msg);
    } else if (type === 'media') {
      sendMedia(messages, receiverId);
    } else if (type === 'document') {
      sendDocument(messages, receiverId);
    }
  };

  useEffect(() => {
    if (selectedMessages.length === 0) {
      setSelectMode(false);
    }    
  }, [selectedMessages]);

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
    return (
      <CustomInputToobar
        text={text}
        setText={setText}
        onSend={onSend}
        receiverId={receiverId}
        navigation={navigation}
      />
    );
  };

  const renderVideo = (props: any) => {
    return <RenderVideo {...props} />;
  };
  
  const renderCustomView = (props: any) => {
    return <RenderCustomView {...props} />;
  };

  const renderAudio = (props: any) => {
    return <RenderAudio {...props} />;
  };

  const LongPressed = (context: any, message: IMessage) => {
    setSelectMode(true);
    setMessages(
      messages.map(msg => {
        if (msg._id === message._id) {
          if (!msg.isSelected) {
            msg.isSelected = true;
            setSelectedMessages([...selectedMessages, message]);
          }
        }
        return msg;
      }),
    );
  };
  
  const onPress = (context: any, message: IMessage) => {
    if (selectMode) {
      setMessages(
        messages.map(msg => {
          if (msg._id === message._id) {
            if (!msg.isSelected) {
              msg.isSelected = true;
              setSelectedMessages([...selectedMessages, message]);
            } else {
              msg.isSelected = false;
              setSelectedMessages(selectedMessages.filter(item => item._id !== message._id));
            }
          }
          return msg;
        }),
      );
    }
  };
      

  return (
    <View style={{flex: 1}}>
      <ChatHeader
        navigation={navigation}
        userID={userId}
        receiverId={receiverId}
        profileImageSource={profileImageSource}
        userName={userName}
        status={status}
        selectMode={selectMode}
        setSelectMode={setSelectMode}
        selectedMessages={selectedMessages}
        setSelectedMessages={setSelectedMessages}
        messages={messages}
        setMessages={setMessages}
      />
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
        onLongPress={LongPressed}
        onPress={onPress}
        shouldUpdateMessage={ (props, nextProps) => messages }
      />
    </View>
  );
};

export default IndividualChatScreen;
