import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Composer, Send} from 'react-native-gifted-chat';
import Colors from '../../../assets/colors/colors';

const customtInputToolbar = ({
  text,
  setText,
  onSend,
}: {
  text: string;
  setText: (val: string) => void;
  onSend: (mes: any) => void;
}) => {
  return (
    <View style={styles.customInputView}>
      <TouchableOpacity
        style={{paddingTop: 6}}
        onPress={() => console.log('Pressed')}>
        <Image source={require('../../../assets/images/chatOptions.png')} />
      </TouchableOpacity>
      <Composer
        placeholder="Message"
        text={text}
        onTextChanged={val => {
          setText(val);
        }}
        textInputStyle={styles.composerTxt}
      />
      <Send
        containerStyle={styles.sendBtnContainer}
        alwaysShowSend
        onSend={mes => onSend(mes)}
        text={text}
        label="Send">
        {text !== '' ? (
          <Image source={require('../../../assets/images/sendMessage.png')} />
        ) : (
          <Image source={require('../../../assets/images/recordMessage.png')} />
        )}
      </Send>
    </View>
  );
};

export default customtInputToolbar;

const styles = StyleSheet.create({
  customInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 2,
    backgroundColor: Colors.secondaryColor,
  },
  composerTxt: {
    height: 45,
    backgroundColor: Colors.secondaryWhite,
    borderRadius: 6,
  },
  sendBtnContainer: {
    marginLeft: 10,
    paddingBottom: 3,
  },
});
