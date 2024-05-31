import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import {openFile} from '../../HealrFilesScreens/HealrFilesHelper';
import { useState } from 'react';
import Loader from '../../../components/Loader';

const RenderCustomView = (props: any) => {
  const [loading, setLoading] = useState(false);
  const {currentMessage} = props;

  const openDocument = () => {
    if (currentMessage?.document) {
      setLoading(true);
      openFile(
        currentMessage.document,
        currentMessage.documentName,
        currentMessage.documentType,
        setLoading
      )
    }
  };

  if (currentMessage?.document) {
    return (
      <View
        style={styles.container}>
        <TouchableOpacity onPress={openDocument}>
          {loading ? <View style={{height:65,width:65}}><Loader/></View>
          :
          <Image
            source={require('../../../../assets/images/individualChatDoc.png')}
          />}
        </TouchableOpacity>
        <View style={{marginTop: 10, maxWidth: 250}}>
          <Text style={styles.msgText}>
            {currentMessage.documentName}
          </Text>
          {currentMessage.documentmrn && <Text style={styles.msgText}>
            <Text style={{fontWeight: 'bold'}}>MRN:</Text>{' '}
            {currentMessage.documentmrn}
          </Text>}
          {currentMessage.documentDescription && <Text style={styles.msgText}>
            <Text style={{fontWeight: 'bold'}}>Description:</Text>{' '}
            {currentMessage.documentDescription}
          </Text>}
        </View>
      </View>
    );
  }
  return null;
};
export default RenderCustomView;

const styles = StyleSheet.create({
  container:{
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  msgText: {
    color: Colors.secondaryColor,
  },
});
