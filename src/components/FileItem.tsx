import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';
import {downloadFile, formatDate} from '../screens/Home/HealrFilesHelper';
import OptionsModal from './OptionsModal';

const FileItem = ({fileName, date, fileType, url}: any) => {
  const [imgSource, setImgSource] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0, width: 0, height: 0});
  const imageRef = useRef(null);

  date = formatDate(date);

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

  const modalOptions = [
    {text: 'Share'},
    {text: 'Rename'},
    {text: 'Delete'},
    {text: 'Save to phone'},
  ];

  const onOptionClick = async (option: string) => {
    switch (option) {
      case 'Mark as unread':
        break;
      case 'Mark as read':
        break;
      case 'Delete':
        break;
      case 'Save to phone':
        downloadFile(fileName, url,'',true);
        break;
    }
    setModalVisible(false);
  };

  return (
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
            <Text style={styles.fileName}>{fileName}</Text>
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
});

export default FileItem;
