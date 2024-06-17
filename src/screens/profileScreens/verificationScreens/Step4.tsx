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
import {SubmitVerificationData, verificationData} from './VerificationData';
import ImageCropPicker from 'react-native-image-crop-picker';
import Loader from '../../../components/Loader';

const GetVerifiedStep4: React.FC = ({navigation}: any) => {
  const [selfieImgPath, setSelfieImagePath] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (selfieImgPath) {
      verificationData.selfieImgPath = selfieImgPath;
      setLoading(true);
      await SubmitVerificationData();
      navigation.navigate('GetVerifiedStep5');
      setLoading(false);
    } else {
      Alert.alert('Missing Image', 'Please upload your selfie to proceed.');
    }
  };

  const selectPic = () => {
    ImageCropPicker.openCamera({}).then((image: any) => {
      setSelfieImagePath(image.path);
    });
  };

  return (
    <View style={styles.container}>
      <ScreensHeader
        navigation={navigation}
        text="Step 4"
        rightText={loading ? '' : 'Submit'}
        rightTextPress={handleSubmit}
      />
      <View style={styles.body}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Text style={styles.headingText}>Upload your Selfie</Text>
            <View style={{marginTop: 50, alignItems: 'center'}}>
              <View style={styles.placeHolder}>
                {!selfieImgPath ? (
                  <TouchableOpacity
                    onPress={selectPic}
                    style={{
                      height: '100%',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../../../assets/images/addImage.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <ImageBackground
                    style={[styles.placeHolder, {overflow: 'hidden'}]}
                    source={{uri: selfieImgPath || ''}}
                  />
                )}
              </View>
            </View>
          </>
        )}
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
  placeHolder: {
    width: 200,
    height: 200,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 100,
    marginTop: 10,
  },
});

export default GetVerifiedStep4;
