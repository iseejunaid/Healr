import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import { requestCameraPermission } from '../../helpers/permissions';

interface HeaderProps {
  text: string;
  LefticonName?: string;
  RighticonName?: string;
  onrightIconPress?: () => void;
  onleftIconPress?: () => void;
  navigation?: any;
}

const Header: React.FC<HeaderProps> = ({text, LefticonName, RighticonName,
  onrightIconPress,onleftIconPress,navigation
}) => {
  const renderImage = (ImageName: string | undefined) => {
    switch (ImageName) {
      case 'cameraIcon':
         return require('../../assets/images/cameraIcon.png');
      case 'dotsIcon':
        return require('../../assets/images/dotsIcon.png');
      default:
        break;
    }
  };
  const getIconStyles = () => {
    if (RighticonName === 'settingsIcon') {
      return styles.settingsimg;
    }
    return styles.dotsimg;
  };

  const imgPressHandler = async (name: any) => {
    switch (name) {
      case 'cameraIcon':
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
              navigation.navigate('Search', { data: [formattedData] });
            })
            .catch(err => {
              console.log(err);
            });
        }
        break;
      case 'dotsIcon':
        console.log('dotsIcon pressed');
        console.log(text);
        break;
      case 'settingsIcon':
        console.log('settingsIcon pressed');
        break;
    }
  }
  

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.camerabtn} onPress={onleftIconPress? onleftIconPress:() => imgPressHandler(LefticonName)}>

        <Image source={renderImage(LefticonName)} style={styles.cameraimg} />
      </TouchableOpacity>

      <View style={[styles.MainText,{width: RighticonName === 'settingsIcon' ? '80%' : '84%',}]}>
        <Text style={styles.headerTxt}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.dotsbtn} onPress={onrightIconPress? onrightIconPress:() => imgPressHandler(RighticonName)}>
      <Image source={renderImage(RighticonName)} style={getIconStyles()} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 40,
    lineHeight: 50,
    color: Colors.tertiaryColor,
    fontFamily: Fonts.semiBold,
    letterSpacing: 1.5,
    textShadowColor: Colors.primaryColor,
    textShadowOffset: {width: 0, height: 1.5},
    textShadowRadius: 2,
  },
  cameraimg: {
    width: 29,
    height: 22,
  },
  dotsimg: {
    width: 5,
    height: 20,
  },
  MainText: {   
    alignItems: 'center',
    justifyContent: 'center',
  },
  camerabtn: {
    width: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  dotsbtn: {
    width: 30,
    height: 30,
    paddingRight:15,
    alignItems:'center',
    justifyContent:'center',
  },
  settingsimg: {
    width: 22,
    height: 22,
  },
});

export default Header;
