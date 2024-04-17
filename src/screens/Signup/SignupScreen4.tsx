import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PressableBtn from '../../components/PressableBtn';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';

const SignupScreen4 = ({navigation}: {navigation: any}) => {
  const handleNext = () => {
    navigation.navigate('SignupScreen5');
  };
  const backBtnHandler = () => {
    navigation.pop();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.toptxt}>Don't Miss Out!</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.middletxt}>
          Please ensure email verification by{' '}
          <Text style={{color: Colors.primaryColor}}>clicking </Text>
          on the link you will receive from Healr.
        </Text>
      </View>
      <View style={styles.submitbtn}>
        <PressableBtn text="Next" onPress={handleNext} />
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Go </Text>
          <TouchableOpacity onPress={backBtnHandler}>
            <Text style={styles.bottombtntxt}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiaryColor,
  },
  top: {
    alignSelf: 'center',
    height: 280,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toptxt: {
    color: Colors.primaryColor,
    fontSize: 40,
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
  },
  middle: {
    height: 148,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middletxt: {
    color: Colors.secondaryColor,
    fontSize: 16,
    letterSpacing: 0.8,
    fontFamily: Fonts.regular,
    width: '83%',
    textAlign: 'center',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 230,
  },
  submitbtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 95,
  },
  bottomtxt: {
    fontSize: 12,
    color: Colors.secondaryColor,
    fontFamily: Fonts.regular,
  },
  bottombtntxt: {
    fontFamily: Fonts.semiBold,
    color: Colors.primaryColor,
    fontSize: 12,
    marginTop: '2%',
  },
});

export default SignupScreen4;
