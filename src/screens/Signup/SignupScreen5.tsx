import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import InputField from '../../components/InputField';
import PressableBtn from '../../components/PressableBtn';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import { signupConfig } from './signupVariables';

const SignupScreen5 = ({navigation}: {navigation: any}) => {
  const [phoneNumber, setPhoneNumber] = useState('03212322321');

  const handleEmailChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handleNext = () => {
    if (phoneNumber.length < 11) {
      Alert.alert('Error!','Please enter a valid phone number');
      return;
    }
    signupConfig.phnNumber = phoneNumber;
    navigation.navigate('SignupScreen7');
  };

  const backBtnHandler = () => {
    navigation.pop();
    setPhoneNumber('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stepsCountView}>
        <Text style={[styles.stepsCountTxt, {color: Colors.primaryColor}]}>
          Step{' '}
        </Text>
        <Text style={styles.stepsCountTxt}>4 of 5</Text>
      </View>
      <View style={styles.top}>
        <Text style={styles.toptxt}>Provide Your Phone Number!</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.middletxt}>
        We're almost done! Please provide your phone number to proceed with the final step.
        </Text>
        <InputField
          handleChange={handleEmailChange}
          value={phoneNumber}
          placeholder="Phone Number"
          keyboardType={'numeric'}
          width={95}
        />
        <View style={styles.submitbtn}>
          <PressableBtn text="Next" onPress={handleNext} />
        </View>
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
    height: 222,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsCountView: {
    height: 58,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stepsCountTxt: {
    color: Colors.secondaryColor,
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  toptxt: {
    color: Colors.primaryColor,
    fontSize: 40,
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
  },
  middle: {
    height: 338,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middletxt: {
    color: Colors.secondaryColor,
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 320,
    letterSpacing: 0.8,
    fontFamily: Fonts.regular,
    width: '83%',
    textAlign: 'center',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 135,
  },
  submitbtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
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

export default SignupScreen5;
