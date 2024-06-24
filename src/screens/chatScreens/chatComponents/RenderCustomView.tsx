import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import {openFile} from '../../HealrFilesScreens/HealrFilesHelper';
import {useEffect, useState} from 'react';
import Loader from '../../../components/Loader';
import Fonts from '../../../../assets/fonts/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RenderCustomView = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const {currentMessage} = props;
    
  useEffect(() => {
    const sentMessage = async () => {
      const userId = await AsyncStorage.getItem('uid');
      if(userId === currentMessage.user._id) setSent(true);
    };

    sentMessage();
  }, []);

  const openDocument = () => {
    if (currentMessage?.document) {
      setLoading(true);
      openFile(
        currentMessage.document,
        currentMessage.documentName,
        currentMessage.documentType,
        setLoading,
      );
    }
  };

  if (currentMessage?.document) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={openDocument}>
          {loading ? (
            <View style={{height: 65, width: 65}}>
              <Loader />
            </View>
          ) : (
            <Image
            tintColor={sent ? Colors.secondaryWhite : Colors.tertiaryColor}
              source={require('../../../../assets/images/individualChatDoc.png')}
            />
          )}
        </TouchableOpacity>
        <View style={{marginTop: 10, maxWidth: 250}}>
          <Text style={[styles.msgText,{color: sent? Colors.secondaryWhite:Colors.tertiaryColor}]}>
            {currentMessage.documentName.length > 15
              ? currentMessage.documentName.substring(0, 15) + '...'
              : currentMessage.documentName}
          </Text>
          {currentMessage.documentmrn && (
            <Text style={[styles.msgText,{color: sent? Colors.secondaryWhite:Colors.tertiaryColor}]}>
              <Text style={{fontWeight: 'bold'}}>MRN:</Text>{' '}
              {currentMessage.documentmrn}
            </Text>
          )}
          {currentMessage.documentDescription && (
            <Text style={[styles.msgText,{color: sent? Colors.secondaryWhite:Colors.tertiaryColor}]}>
              <Text style={{fontWeight: 'bold'}}>Description:</Text>{' '}
              {currentMessage.documentDescription}
            </Text>
          )}
        </View>
      </View>
    );
  }
  return null;
};
export default RenderCustomView;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 150,
  },
  msgText: {
    fontFamily: Fonts.regular,
  },
});
