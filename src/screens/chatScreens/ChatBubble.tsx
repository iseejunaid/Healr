import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';

export const renderCustomBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      timeTextStyle={{
        right: {color: Colors.quadraryColor, fontFamily: Fonts.regular},
        left: {color: Colors.quadraryColor, fontFamily: Fonts.regular},
      }}
      textStyle={{
        right: {color: Colors.secondaryWhite, fontFamily: Fonts.regular},
        left: {color: 'black', fontFamily: Fonts.regular},
      }}
      wrapperStyle={{
        left: {
          padding: 2,
          backgroundColor: Colors.secondaryColor,
        },
        right: {
          padding: 2,
          backgroundColor: Colors.tertiaryColor,
        },
      }}
    />
  );
};
