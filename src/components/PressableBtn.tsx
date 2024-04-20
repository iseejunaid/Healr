import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../assets/colors/colors';
import Fonts from '../../assets/fonts/fonts';

interface PressableBtnProps {
  onPress: () => void;
  text: string;
  backgound?: any;
  fontColor?: string;
  width?: string;
}

const PressableBtn: React.FC<PressableBtnProps> = ({text, onPress,fontColor,backgound,width}) => {
  return (
    <TouchableOpacity 
  style={[
    styles.submitbtn,
    { 
      backgroundColor: backgound ? backgound : Colors.primaryColor, 
      width: width ? width : '83%' 
    }
  ]} 
  onPress={onPress}
>

      <Text style={[styles.submitbtntxt, { color: fontColor || '#222831' }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitbtn: {
    width: '83%',
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitbtntxt: {
    fontSize: 18,
    marginTop:5,
    fontFamily: Fonts.regular,
  },
});

export default PressableBtn;
