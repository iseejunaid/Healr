import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';
import Clipboard from '@react-native-clipboard/clipboard';
import {Timestamp, deleteDoc, doc} from 'firebase/firestore';
import {db} from '../../../../configs/firebaseConfig';
import {useEffect, useState} from 'react';
import {retrieveBlockStatus, saveFileToOnlineStorage} from '../ChatHelper';
import {downloadFile} from '../../HealrFilesScreens/HealrFilesHelper';

const ChatHeader = ({
  navigation,
  userID,
  receiverId,
  profileImageSource,
  userName,
  status,
  selectMode,
  setSelectMode,
  selectedMessages,
  setSelectedMessages,
  messages,
  setMessages,
}: any) => {
  const count = selectedMessages.length;
  const [blocked, setblocked] = useState(false);
  const [saveFile, setSaveFile] = useState(false);

  const onClose = () => {
    const msgsid = selectedMessages.map((msg: any) => {
      return msg._id;
    });
    setMessages(
      messages.map((msg: any) => {
        if (msgsid.includes(msg._id)) {
          msg.isSelected = false;
        }
        return msg;
      }),
    );
    setSelectedMessages([]);
    setSelectMode(false);
  };
  const copyMessages = () => {
    selectedMessages.map((msg: any) => {
      Clipboard.setString(msg.text);
    });
    onClose();
  };
  const deleteMessages = () => {
    selectedMessages.forEach((msg: any) => {
      const msgRef = doc(db, 'chats', msg._id);
      deleteDoc(msgRef);
    });
    onClose();
  };
  const exportMessages = () => {
    var exportableMessages: string | {message: string; time: any}[] = [];
    selectedMessages.forEach((msg: any) => {
      if (msg.user._id === userID) {
        exportableMessages.push({
          message: 'You: ' + msg.text,
          time: msg.createdAt,
        });
      } else {
        exportableMessages.push({
          message: userName + ': ' + msg.text,
          time: msg.createdAt,
        });
      }
    });
    exportableMessages = JSON.stringify(exportableMessages);
    navigation.navigate('CreateDossier', {messages: exportableMessages});
    onClose();
  };
  const saveToHealrFiles = () => {
    saveFileToOnlineStorage(selectedMessages[0]);
    onClose();
  };

  useEffect(() => {
    const checkIfBlocked = async () => {
      const isBlocked = await retrieveBlockStatus(receiverId);
      setblocked(isBlocked);
    };
    checkIfBlocked();
  }, []);

  useEffect(() => {
    if (count == 1) {
      if (
        selectedMessages[0].documentType == 'pdf' ||
        selectedMessages[0].documentType == 'docx' ||
        selectedMessages[0].documentType == 'jpg' ||
        selectedMessages[0].documentType == 'jpeg' ||
        selectedMessages[0].documentType == 'png'
      )
        setSaveFile(true);
    } else {
      setSaveFile(false);
    }
    if (count == 0) {
      setSelectMode(false);
    }
  }, [selectedMessages]);

  const download = () => {
    selectedMessages.forEach((msg: any) => {
      downloadFile('HealrFile' + getTimestamp(), msg.image);
    });
  };
  const getTimestamp = () => {
    const now = new Date();
    return now
      .toISOString()
      .replace(/[:\-T.]/g, '')
      .slice(0, 14);
  };

  return !selectMode ? (
    <View style={styles.headerContainer}>
      <View
        style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          style={{height: '100%', justifyContent: 'center'}}
          onPress={() => navigation.popToTop({screen: 'ChatHome'})}>
          <Image source={require('../../../../assets/images/back.png')} />
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
                source={require('../../../../assets/images/placeholder.jpg')}
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
      {!blocked && (
        <View style={styles.callIconsContainer}>
          <ZegoSendCallInvitationButton
            invitees={[{userID: receiverId, userName: userName}]}
            isVideoCall={false}
            resourceID={'zego_data'}
          />
          <ZegoSendCallInvitationButton
            invitees={[{userID: receiverId, userName: userName}]}
            isVideoCall={true}
            resourceID={'zego_video_call'}
          />
        </View>
      )}
    </View>
  ) : (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{height: '100%', justifyContent: 'center'}}
        onPress={onClose}>
        <Image
          source={require('../../../../assets/images/close.png')}
          style={styles.closeImg}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: Colors.tertiaryColor,
          fontSize: 18,
          fontFamily: Fonts.regular,
        }}>
        {count} Selected
      </Text>
      <View style={styles.headerOptions}>
        {selectedMessages.every(message => message.image) ? (
          <TouchableOpacity onPress={download}>
            <Image source={require('../../../../assets/images/download.png')} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity onPress={deleteMessages}>
          <Image source={require('../../../../assets/images/delete.png')} />
        </TouchableOpacity>
        {saveFile && (
          <TouchableOpacity onPress={saveToHealrFiles}>
            <Image source={require('../../../../assets/images/save.png')} />
          </TouchableOpacity>
        )}
        {selectedMessages.every(
          message => typeof message.text === 'string',
        ) && (
          <View
            style={{
              flexDirection: 'row',
              width: 60,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={copyMessages}>
              <Image source={require('../../../../assets/images/copy.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={exportMessages}>
              <Image
                tintColor={Colors.tertiaryColor}
                source={require('../../../../assets/images/createDossier.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatHeader;
const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    backgroundColor: Colors.secondaryColor,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeImg: {
    height: 15,
    width: 15,
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
    width: 90,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  callIcon: {
    height: '80%',
    justifyContent: 'center',
  },
  headerOptions: {
    flexDirection: 'row',
    height: '100%',
    width: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
