import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../assets/colors/colors';
import Fonts from '../../assets/fonts/fonts';

interface PressableBtnProps {
  onPress: () => void;
  text: string;
}

const PressableBtn: React.FC<PressableBtnProps> = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.submitbtn} onPress={onPress}>
      <Text style={styles.submitbtntxt}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitbtn: {
    width: '83%',
    height: 45,
    backgroundColor: Colors.primaryColor,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitbtntxt: {
    color: '#222831',
    fontSize: 18,
    marginTop:5,
    fontFamily: Fonts.regular,
  },
});

export default PressableBtn;
