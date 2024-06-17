import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';
import ScreensHeader from './ScreensHeader';

const GetVerifiedStep5: React.FC = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.tertiaryColor}
        barStyle="light-content"
      />
      <ScreensHeader
        leftIcon={require('../../../../assets/images/close.png')}
        leftIconPress={() => navigation.pop(6)}
        navigation={navigation}
        text="Documents Submitted"
      />

      <View style={styles.body}>
        <Image source={require('../../../../assets/images/docSubmitted.png')} />
        <Text style={styles.thanks}>Thank you!</Text>
        <Text style={styles.bodyText}>
          Your documents have been uploaded successfully. Please wait while we
          verify your information. This process may take a few days.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Go </Text>
          <TouchableOpacity onPress={() => navigation.pop(6)}>
            <Text style={styles.bottombtntxt}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.tertiaryColor,
  },
  body: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  thanks: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.primaryColor,
    marginVertical: '5%',
  },
  bodyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.secondaryWhite,
    textAlign: 'center',
  },
  footer: {
    flex: 0.13,
  },
  bottomtxt: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.secondaryColor,
  },
  bottombtntxt: {
    color: Colors.primaryColor,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    marginTop: '2%',
  },
});

export default GetVerifiedStep5;
