import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Linking} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';
import {formatDate} from '../screens/Home/HealrFilesHelper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FileItem = ({fileName, date, fileType, url}: any) => {
  const [imgSource, setImgSource] = useState('');
  
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
    Linking.openURL(url);
  }
  

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={imgSource} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.fileName}>{fileName}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.fileType}>{fileType}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 20,
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
