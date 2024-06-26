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
import { isValidEmail } from './signupConstantData';
import {signupConfig} from './signupVariables';

const SignupScreen3 = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [isValidEmailInput, setValidEmailInput] = useState(true);

  const handleEmailChange = (newEmail:string) => {
    setEmail(newEmail);
    setValidEmailInput(isValidEmail(newEmail));
  };

  const handleNext = () => {
    if (email == '' || !isValidEmailInput) {
      Alert.alert('Error!','Please enter valid email');
      return;
    }
    signupConfig.email = email.trim();
    navigation.navigate('SignupScreen4');
  };
  const backBtnHandler = () => {
    navigation.pop();
    setEmail('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.stepsCountView}>
          <Text style={[styles.stepsCountTxt, {color: Colors.primaryColor}]}>
            Step{' '}
          </Text>
          <Text style={styles.stepsCountTxt}>3 of 5</Text>
        </View>
        <Text style={styles.toptxt}>Great Profession!</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.middletxt}>
          Email, please! We're all about speed, so your address (
          <Text style={{color: Colors.primaryColor}}>
            institutional preferred
          </Text>
          ) will help us verify you faster!
        </Text>
        <InputField
          handleChange={handleEmailChange}
          value={email}
          placeholder="Email Address"
          width={95}
          style={{borderColor: isValidEmailInput ? 'black' : 'red'}}
        />
        <View style={styles.submitbtn}>
          <PressableBtn text="Next" onPress={handleNext} />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Change </Text>
          <TouchableOpacity onPress={backBtnHandler}>
            <Text style={styles.bottombtntxt}>Profession</Text>
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
    height: 270,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsCountView: {
    height: 70,
    alignItems: 'flex-start',
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
    letterSpacing: 0.8,
    fontFamily: Fonts.regular,
    width: '83%',
    textAlign: 'center',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 143,
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

export default SignupScreen3;
