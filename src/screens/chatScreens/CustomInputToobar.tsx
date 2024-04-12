import React, { useState } from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Composer, Send} from 'react-native-gifted-chat';
import Colors from '../../../assets/colors/colors';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import OptionsModal from '../../components/OptionsModal';

const customtInputToolbar = ({
  text,
  setText,
  onSend,
}: {
  text: string;
  setText: (val: string) => void;
  onSend: (mes: any) => void;
}) => {
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [modalVisible, setModalVisible] = useState(false);

  const startRecording = async () => {
    // const audioPath = await audioRecorderPlayer.startRecorder();
    console.log('Recording started');
    // console.log('Recording started', audioPath);
  };

  const stopRecording = async () => {
    // const audioPath = await audioRecorderPlayer.stopRecorder();
    // console.log('Recording stopped', audioPath);
    console.log('Recording stopped');
  };

  const cancelRecording = async () => {
    // await audioRecorderPlayer.stopRecorder();
    console.log('Recording cancelled');
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionClick = (option:any) => {
    // setSelectedOption(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.customInputView}>
      <TouchableOpacity
        style={{paddingTop: 6}}
        onPress={toggleModal}>
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
          <TouchableOpacity
            style={{paddingTop: 6}}
            // onPressIn={startRecording}
            // onPressOut={stopRecording}
            onLongPress={startRecording}
            onPress={cancelRecording}>
            <Image
              source={require('../../../assets/images/recordMessage.png')}
            />
          </TouchableOpacity>
        )}
      </Send>
      <OptionsModal
        visible={modalVisible}
        modalStyle={{backgroundColor: Colors.tertiaryColor,bottom: 0,left: 0}}
        foregroundColor={Colors.secondaryWhite}
        onClose={() => setModalVisible(false)}
        onOptionClick={handleOptionClick}
      />
    </View>
  );
};

export default customtInputToolbar;

const styles = StyleSheet.create({
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
