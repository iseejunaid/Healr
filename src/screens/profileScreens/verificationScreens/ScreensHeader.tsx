import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';

interface ScreensHeaderProps {
  navigation: any;
  text: string;
  rightText?: string;
}

const ScreensHeader: React.FC<ScreensHeaderProps> = ({
  navigation,
  text,
  rightText,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{height: '100%', justifyContent: 'center'}}
        onPress={() => navigation.pop()}>
        <Image
          source={require('../../../../assets/images/back.png')}
          tintColor={Colors.secondaryWhite}
          style={styles.backImg}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 22,
        }}>
        <Text style={styles.headerText}>{text}</Text>
      </View>
      <TouchableOpacity
      style={{
        justifyContent: 'center',
        height: '100%',
      }}
      >
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
  },
  backImg: {
    height: 20,
    width: 22,
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
