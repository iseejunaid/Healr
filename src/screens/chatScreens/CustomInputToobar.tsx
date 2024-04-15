import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Composer, Send} from 'react-native-gifted-chat';
import Colors from '../../../assets/colors/colors';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import OptionsModal from '../../components/OptionsModal';
import ImageCropPicker from 'react-native-image-crop-picker';

const customtInputToolbar = ({
  text,
  setText,
  onSend,
}: {
  text: string;
  setText: (val: string) => void;
  onSend: (mes: any,type: string) => void;
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

  const handleOptionClick = (option: any) => {
    switch (option) {
      case 'Camera':
        console.log('Camera clicked');
        break;
      case 'Gallery':
        ImageCropPicker.openPicker({
          multiple: true,
          mediaType: 'any',        
        })
          .then(data => {
            onSend(data, 'media');
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 'Documents':
        console.log('Documents clicked');
        break;
      case 'Healr files':
        console.log('Healr files clicked');
        break;
      case 'Create dossier':
        console.log('Create dossier clicked');
        break;
      default:
        console.log('Invalid option');
    }
    setModalVisible(false);
  };

  const options = [
    {text: 'Camera', image: require('../../../assets/images/camera.png')},
    {text: 'Gallery', image: require('../../../assets/images/gallery.png')},
    {text: 'Documents', image: require('../../../assets/images/documents.png')},
    {text: 'Healr files', image: require('../../../assets/images/files.png')},
    {text: 'Create dossier', image: require('../../../assets/images/createDossier.png')},
  ];

  return (
    <View style={styles.customInputView}>
      <TouchableOpacity style={{paddingTop: 6}} onPress={toggleModal}>
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
        onSend={mes => onSend(mes, 'text')}
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
        modalStyle={styles.modal}
        foregroundColor={Colors.secondaryWhite}
        onClose={() => setModalVisible(false)}
        onOptionClick={handleOptionClick}
        options={options}
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
    color:'black'
  },
  sendBtnContainer: {
    marginLeft: 10,
    paddingBottom: 3,
  },
  modal:{
    backgroundColor: Colors.tertiaryColor,
    bottom: 50,
    left: 5,
  }
});
