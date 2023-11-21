import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

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
    backgroundColor: '#00ADB5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitbtntxt: {
    color: '#222831',
    fontSize: 18,
    fontFamily: 'Poppins-regular',
  },
});

export default PressableBtn;
