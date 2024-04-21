import React, {useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Composer, Send} from 'react-native-gifted-chat';
import Colors from '../../../../assets/colors/colors';
import OptionsModal from '../../../components/OptionsModal';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  requestaudioPermission,
} from '../../../../helpers/permissions';
import DocumentPicker from 'react-native-document-picker';
import SoundRecorder from 'react-native-sound-recorder';

const customtInputToolbar = ({
  text,
  setText,
  onSend,
  receiverId,
  navigation,
}: {
  text: string;
  setText: (val: string) => void;
  onSend: (mes: any, type: string) => void;
  receiverId: string;
  navigation: any;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState('Message');


  const startRecording = async () => {
    requestaudioPermission();
    setPlaceholder('Recording...');
    try {
      SoundRecorder.start(SoundRecorder.PATH_CACHE + '/test.mp4', {
        bitrate: 128000,
        channels: 2,
        sampleRate: 44100,
        normalize: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const stopRecording = async () => {
    try {
      const filePath = await SoundRecorder.stop();
      const fileToExport = [
        {
          path: filePath.path,
          mime: 'audio/mp3',
        },
      ];
      onSend(fileToExport, 'media');
    } catch (error) {
      console.error('Error stopping recording or uploading audio:', error);
    }
    setPlaceholder('Message');
  };

  /* const cancelRecording = async () => {
    // await audioRecorderPlayer.stopRecorder();
    console.log('Recording cancelled');
  }; */

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionClick = async (option: any) => {
    switch (option) {
      case 'Camera':
        const permission = await requestCameraPermission();
        if (permission) {
          ImageCropPicker.openCamera({
            mediaType: 'any',
          })
            .then(data => {
              const formattedData = {
                path: data.path,
                mime: data.mime,
                size: data.size,
                width: data.width,
                height: data.height,
              };
              onSend([formattedData], 'media');
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          Alert.alert(
            'Permission required',
            'Please allow camera permission to use this feature',
          );
        }
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
        try {
          DocumentPicker.pick({
            allowMultiSelection: true,
            type: [DocumentPicker.types.allFiles],
          })
            .then(data => {
              console.log(data);

              const formattedDataArray = data.map(document => ({
                uri: document.uri,
                type: document.type,
                name: document.name,
              }));

              onSend(formattedDataArray, 'document');
            })
            .catch(err => {
              if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
              } else {
                console.log(err);
              }
            });
        } catch (err) {
          console.log(err);
        }
        break;

      case 'Healr files':
        navigation.navigate('Healrfiles');
        navigation.pop();
        break;
      case 'Create dossier':
        navigation.navigate('CreateDossier',{receiverId:receiverId});
        break;
      default:
        console.log('Invalid option');
    }
    setModalVisible(false);
  };

  const options = [
    {text: 'Camera', image: require('../../../../assets/images/camera.png')},
    {text: 'Gallery', image: require('../../../../assets/images/gallery.png')},
    {text: 'Documents', image: require('../../../../assets/images/documents.png')},
    {text: 'Healr files', image: require('../../../../assets/images/files.png')},
    {
      text: 'Create dossier',
      image: require('../../../../assets/images/createDossier.png'),
    },
  ];

  return (
    <View style={styles.customInputView}>
      <TouchableOpacity style={{paddingTop: 6}} onPress={toggleModal}>
        <Image source={require('../../../../assets/images/chatOptions.png')} />
      </TouchableOpacity>
      <Composer
        placeholder={placeholder}
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
          <Image source={require('../../../../assets/images/sendMessage.png')} />
        ) : (
          <TouchableOpacity
            style={{paddingTop: 6}}
            // onPressIn={startRecording}
            onPressOut={stopRecording}
            onLongPress={startRecording}
            /* onPress={cancelRecording} */
          >
            <Image
              source={require('../../../../assets/images/recordMessage.png')}
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
    color: 'black',
  },
  sendBtnContainer: {
    marginLeft: 10,
    paddingBottom: 3,
  },
  modal: {
    backgroundColor: Colors.tertiaryColor,
    bottom: 50,
    left: 5,
  },
});
