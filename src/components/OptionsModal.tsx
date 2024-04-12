import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text,Image} from 'react-native';
import Fonts from '../../assets/fonts/fonts';

interface OptionsModalProps {
  visible: boolean;
  modalStyle?: any;
  foregroundColor?: string;
  onClose: () => void;
  onOptionClick: (option: string) => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  visible,
  modalStyle,
  foregroundColor,
  onClose,
  onOptionClick,
}) => {
  const renderModalContent = () => (
    <View style={styles.modalContent}>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => onOptionClick('Option 1')}>
        <Image style={[styles.img,{tintColor:foregroundColor || 'green'}]} source={require('../../assets/images/cameraIcon.png')}/>
        <Text style={{color: foregroundColor || 'green',fontFamily:Fonts.regular}}>Option 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => onOptionClick('Option 2')}>
        <Text style={{color: foregroundColor || 'green',fontFamily:Fonts.regular}}>Option 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => onOptionClick('Option 3')}>
        <Text style={{color: foregroundColor || 'green',fontFamily:Fonts.regular}}>Option 3</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalBackground} onPressOut={onClose}>
        <View
          style={[styles.modalContainer,modalStyle]}>
          {renderModalContent()}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    position: 'absolute',
    borderRadius: 8,
    elevation: 2,
  },
  modalContent: {
    alignItems: 'flex-start',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor:"red",
    marginBottom: 10,
  },
  img:{
    marginRight: 10,
    width: 21,
    height: 16,
  }
});

export default OptionsModal;
