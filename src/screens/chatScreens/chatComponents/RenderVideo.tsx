import {View} from 'react-native';
import Video from 'react-native-video';

const RenderVideo = (props: any) => {
  const {currentMessage} = props;
  return (
    <View>
      <Video
        source={{uri: currentMessage?.video}}
        style={{height: 200, width: 200}}
        controls={true}
      />
    </View>
  );
};

export default RenderVideo;
