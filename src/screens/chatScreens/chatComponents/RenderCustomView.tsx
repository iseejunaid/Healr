import { Image, Text, View,TouchableOpacity } from "react-native";
import Colors from "../../../../assets/colors/colors";
import { downloadFile } from "../../HealrFilesScreens/HealrFilesHelper";

const RenderCustomView = (props: any) => {
  const {currentMessage} = props;
    
  const openDocument = () => {
    if (currentMessage?.document) {
      downloadFile(currentMessage.documentName, currentMessage.document,
        currentMessage.documentType,false);
    }
  }

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
        <Text style={{color: Colors.secondaryColor, paddingTop: 10}}>
          {currentMessage.documentName}
        </Text>
      </View>
    );
  }
  return null;
};
export default RenderCustomView;
