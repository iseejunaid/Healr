import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import Fonts from '../../assets/fonts/fonts';

interface Option {
  text: string;
  image?: any;
}

interface OptionsModalProps {
  visible: boolean;
  modalStyle?: any;
  foregroundColor?: string;
  onClose: () => void;
  onOptionClick: (option: string) => void;
  options: Option[];
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  visible,
  modalStyle,
  foregroundColor,
  onClose,
  onOptionClick,
  options,
}) => {
  const renderModalContent = () => (
    <View style={styles.modalContent}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => onOptionClick(option.text)}>
          {option.image && (
            <Image
              style={[styles.img, { tintColor: foregroundColor || 'green' }]}
              source={option.image}
            />
          )}
          <Text style={{ color: foregroundColor || 'green', fontFamily: Fonts.regular, marginTop: 4 }}>
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalBackground} onPressOut={onClose}>
        <View style={[styles.modalContainer, modalStyle]}>
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
    zIndex: 1,
  },
  modalContent: {
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    width: 150,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 8,
    marginBottom: 5,
  },
  img: {
    marginRight: 10,
  },
});

export default OptionsModal;
