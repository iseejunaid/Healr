import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';
import {
  deleteFile,
  downloadFile,
  formatDate,
  renameFile,
  splitFileNameAndExt,
} from '../screens/HealrFilesScreens/HealrFilesHelper';
import OptionsModal from './OptionsModal';
import InputField from './InputField';
import PressableBtn from './PressableBtn';

const FileItem = ({
  id,
  navigation,
  fileName,
  date,
  fileType,
  url,
  deleteValue,
  uploadedFileName,
  setModified,
}: any) => {
  const [imgSource, setImgSource] = useState('');
  const [deleted, setDeleted] = useState(deleteValue);
  const [modalVisible, setModalVisible] = useState(false);
  const [InitialFileName, setInitialFileName] = useState(fileName);
  const [rename, setRename] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [ext, setExt] = useState('');
  const [position, setPosition] = useState({x: 0, y: 0, width: 0, height: 0});
  const imageRef = useRef(null);

  date = formatDate(date);

  useEffect(() => {
    const {renameAbleFilename, ext} = splitFileNameAndExt(fileName);
    setNewFileName(renameAbleFilename);
    setExt(ext);
  }, [fileName]);

  useEffect(() => {
    let source = require('../../assets/images/healrDocs.png');

    if (fileType === 'Image') {
      source = require('../../assets/images/healrImage.png');
    } else if (fileType === 'Video') {
      source = require('../../assets/images/healrVideo.png');
    }

    setImgSource(source);
  }, [fileType]);

  const handlePress = () => {
    downloadFile(fileName, url, fileType, false);
  };

  const toggleModal = () => {
    imageRef.current.measure((x, y, width, height, pageX, pageY) => {
      setPosition({x: pageX, y: pageY, width, height});
      setModalVisible(!modalVisible);
    });
  };

  const toggleRenameModal = () => {
    setRename(!rename);
    return false;
  };

  const modalOptions = [
    {text: 'Share'},
    {text: 'Rename'},
    {text: 'Delete'},
    {text: 'Save to phone'},
  ];

  const onOptionClick = async (option: string) => {
    switch (option) {
      case 'Share':
        navigation.navigate('Share', {url});
        break;
      case 'Rename':
        toggleRenameModal();
        break;
      case 'Delete':
        setDeleted(true);
        deleteFile(id, uploadedFileName).then(() => {
          setModified(true);
        });
        break;
      case 'Save to phone':
        downloadFile(fileName, url, '', true);
        break;
    }
    setModalVisible(false);
  };

  const handleRename = async () => {
    var oldFileName = fileName.split('.')[0];
    if (newFileName !== oldFileName) {
      try {
        setRename(false);
        const dbFilename = ext ? newFileName + '.' + ext : newFileName;
        setInitialFileName(dbFilename);
        await renameFile(id, dbFilename);
        setModified(true);
      } catch (error) {
        console.error('Error renaming file:', error);
      }
    } else {
      setRename(false);
    }
  };

  return deleted ? null : (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          ref={imageRef}
          onPress={handlePress}
          onLongPress={toggleModal}>
          <View style={styles.imageWrapper}>
            <Image source={imgSource} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.fileName}>{InitialFileName}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.fileType}>{fileType}</Text>
      </View>
      <OptionsModal
        visible={modalVisible}
        onClose={toggleModal}
        foregroundColor={Colors.tertiaryColor}
        onOptionClick={onOptionClick}
        modalStyle={{
          position: 'absolute',
          top: position.y + 50,
          left: position.x + 150,
          backgroundColor: Colors.secondaryWhite,
          width: 140,
        }}
        options={modalOptions}
      />
      <Modal
        visible={rename}
        transparent
        onRequestClose={toggleRenameModal}
        animationType="fade">
        <View
          style={styles.modalBackground}
          onStartShouldSetResponder={toggleRenameModal}>
          <View style={styles.renameModalContent}>
            <Text style={styles.renameText}>Rename</Text>
            <View style={styles.renameInputContainer}>
              <InputField
                style={styles.fileNameInput}
                value={newFileName}
                handleChange={setNewFileName}
                width={95}
              />
              <Text style={styles.extText}>.{ext}</Text>
            </View>
            <View style={styles.renameBtnContainer}>
              <PressableBtn
                text="Cancel"
                onPress={toggleRenameModal}
                fontColor="white"
                backgound="red"
                width="40%"
              />
              <PressableBtn
                text="Rename"
                onPress={handleRename}
                fontColor="white"
                backgound={Colors.primaryColor}
                width="40%"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  imageContainer: {
    height: 150,
    width: '50%',
  },
  imageWrapper: {
    height: '50%',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#9C9C9C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  fileName: {
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
  fileNameInput: {
    color: Colors.tertiaryColor,
    borderBottomColor: Colors.tertiaryColor,
    borderWidth: 1,
    width: '85%',
    marginBottom: 10,
  },
  infoContainer: {
    width: '50%',
    padding: 10,
  },
  date: {
    fontFamily: Fonts.regular,
    color: Colors.quadraryColor,
  },
  fileType: {
    fontFamily: Fonts.regular,
    color: Colors.quadraryColor,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renameModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    elevation: 5,
  },
  renameText: {
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
    marginBottom: 10,
  },
  renameInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extText: {
    fontFamily: Fonts.regular,
    color: 'grey',
  },
  renameBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default FileItem;
