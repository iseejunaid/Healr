import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import Colors from '../../../../assets/colors/colors';

const RenderAudio = (props: any) => {
  const { currentMessage } = props;
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentMessage.audio) {
      const audioPath = currentMessage.audio;      
      const soundObj = new Sound(audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log('duration in seconds: ' + soundObj.getDuration());
      });
      setSound(soundObj);
    }
    
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, [currentMessage.audio]);

  const playSound = () => {
    if (sound) {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      setIsPlaying(true);
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop();
      setIsPlaying(false);
    }
  };
  return (
    <View>
      <Text style={{color:Colors.secondaryColor,padding:10}}>Audio Message</Text>
      <TouchableOpacity onPress={isPlaying ? stopSound : playSound} style={{alignItems:'center'}}>
        <Text style={{color:Colors.secondaryColor}}>{isPlaying ? 'Stop' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenderAudio;
