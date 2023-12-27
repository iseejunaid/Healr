import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Fonts from '../../assets/fonts/fonts';
import Colors from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface HeaderProps {
  text: string;
  LefticonName?: string;
  RighticonName?: string;
}

const Header: React.FC<HeaderProps> = ({text, LefticonName, RighticonName}) => {
  const renderImage = (ImageName: string | undefined) => {
    switch (ImageName) {
      case 'cameraIcon':
        return require('../../assets/images/cameraIcon.png');
      case 'dotsIcon':
        return require('../../assets/images/dotsIcon.png');
      case 'settingsIcon':
        return require('../../assets/images/settingsIcon.png');
      case 'undefined':
        return null;
      default:
        return null;
    }
  };
  const getIconStyles = () => {
    if (RighticonName === 'settingsIcon') {
      return styles.settingsimg;
    }
    return styles.dotsimg;
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.camerabtn}>
        <Image source={renderImage(LefticonName)} style={styles.cameraimg} />
      </TouchableOpacity>

      <View style={[styles.MainText,{width: RighticonName === 'settingsIcon' ? '80%' : '84%',}]}>
        <Text style={styles.headerTxt}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.dotsbtn}>
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
    width: '100%',
  },
  settingsimg: {
    width: 22,
    height: 22,
  },
});

export default Header;
