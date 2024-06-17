import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';

interface ScreensHeaderProps {
  navigation: any;
  text: string;
  leftIcon?: boolean;
  leftIconPress?: () => void;
  rightText?: string;
  rightTextPress?: () => void;
}

const ScreensHeader: React.FC<ScreensHeaderProps> = ({
  navigation,
  text,
  leftIcon,
  leftIconPress,
  rightText,
  rightTextPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{height: '100%', justifyContent: 'center',width:55,alignItems:'flex-start'}}
        onPress={leftIconPress? leftIconPress : () => navigation.pop()}>
        <Image
          source={ leftIcon ? leftIcon :require('../../../../assets/images/back.png')}
          tintColor={Colors.secondaryWhite}
        />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 22,
        }}>
        <Text style={styles.headerText}>{text}</Text>
      </View>
      <TouchableOpacity
        onPress={rightTextPress}
        style={{
          justifyContent: 'center',
          width:55,
          height: '100%',
          alignItems: 'flex-end',
        }}>
        <Text style={styles.rightText}>{rightText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScreensHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.07,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.secondaryWhite,
  },
  rightText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.primaryColor,
  },
});
