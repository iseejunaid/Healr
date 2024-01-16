import React, { useState } from 'react';
import {View, StyleSheet,ScrollView} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import InputField from '../../components/InputField';

const ChatScreen: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (text: string) => {
    setSearchValue(text);
  };

  return (
    <View style={styles.container}>
      <Header text="Chats" LefticonName="cameraIcon" RighticonName="dotsIcon" />
      <ScrollView style={styles.chatsContainer}>
      <InputField
      style={{
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
        alignSelf: 'center',
        width:'90%',
      }}
          handleChange={handleSearchValueChange}
          value={searchValue}
          placeholder="Search"
          width={95}
        />
      </ScrollView>
    </View>
  );
};
export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
  },
  chatsContainer: {
    height: 630,
    width: '100%',
  },
});
