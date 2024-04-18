import { Image, Text, View } from "react-native";
import Colors from "../../../../assets/colors/colors";

const RenderCustomView = (props: any) => {
  const {currentMessage} = props;

  if (currentMessage?.document) {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Image
          source={require('../../../../assets/images/individualChatDoc.png')}
        />
        <Text style={{color: Colors.secondaryColor, paddingTop: 10}}>
          {currentMessage.documentName}
        </Text>
      </View>
    );
  }
  return null;
};
export default RenderCustomView;
