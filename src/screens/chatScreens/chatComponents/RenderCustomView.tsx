import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import {downloadFile} from '../../HealrFilesScreens/HealrFilesHelper';

const RenderCustomView = (props: any) => {
  const {currentMessage} = props;

  const openDocument = () => {
    if (currentMessage?.document) {
      downloadFile(
        currentMessage.documentName,
        currentMessage.document,
        currentMessage.documentType,
        false,
      );
    }
  };

  if (currentMessage?.document) {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity onPress={openDocument}>
          <Image
            source={require('../../../../assets/images/individualChatDoc.png')}
          />
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
  msgText: {
    color: Colors.secondaryColor,
  },
});
