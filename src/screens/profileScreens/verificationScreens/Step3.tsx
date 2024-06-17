import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';
import ScreensHeader from './ScreensHeader';
import {verificationData} from './VerificationData';
import ImageCropPicker from 'react-native-image-crop-picker';

const GetVerifiedStep3: React.FC = ({navigation}: any) => {
  const [frontImgPath, setFrontImgPath] = useState<string | null>('');
  const [backImgPath, setBackImgPath] = useState<string | null>('');
  const handleNext = () => {
    if (frontImgPath && backImgPath) {
      verificationData.frontImgPath = frontImgPath;
      verificationData.backImgPath = backImgPath;
      navigation.navigate('GetVerifiedStep4');
    } else {
      Alert.alert(
        'Missing Images',
        'Please upload both sides of your National ID',
      );
    }
  };

  const selectPic = (type: string) => () => {
    ImageCropPicker.openCamera({
      width: 500,
      height: 300,
      cropping: true,
    }).then((image: any) => {
      if (type === 'front') setFrontImgPath(image.path);
      else setBackImgPath(image.path);
    });
  };

  return (
    <View style={styles.container}>
      <ScreensHeader
        navigation={navigation}
        text="Step 3"
        rightText="Next"
        rightTextPress={handleNext}
      />
      <View style={styles.body}>
        <Text style={styles.headingText}>
          Upload both sides of your National ID
        </Text>
        <View style={{marginTop: 50}}>
          <Text style={styles.subHeadingText}>Front Side</Text>
          <View style={styles.placeHolder}>
            <TouchableOpacity
              style={styles.imageBackground}
              onPress={selectPic('front')}>
              {frontImgPath ? (
                <ImageBackground
                  source={{uri: frontImgPath}}
                  style={styles.imageBackground}
                  imageStyle={styles.image}>
                  <Image
                    source={require('../../../../assets/images/addImage.png')}
                  />
                </ImageBackground>
              ) : (
                <Image
                  source={require('../../../../assets/images/addImage.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.subHeadingText}>Back Side</Text>
          <View style={styles.placeHolder}>
            <TouchableOpacity
              style={styles.imageBackground}
              onPress={selectPic('back')}>
              {backImgPath ? (
                <ImageBackground
                  source={{uri: backImgPath}}
                  style={styles.imageBackground}
                  imageStyle={styles.image}>
                  <Image
                    source={require('../../../../assets/images/addImage.png')}
                  />
                </ImageBackground>
              ) : (
                <Image
                  source={require('../../../../assets/images/addImage.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tertiaryColor,
  },
  body: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headingText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.secondaryColor,
  },
  subHeadingText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.secondaryWhite,
  },
  placeHolder: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 6, // Add border radius if needed
  },
});

export default GetVerifiedStep3;
