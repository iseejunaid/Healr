import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import InputField from '../../components/InputField';
import PressableBtn from '../../components/PressableBtn';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import { signupConfig } from './signupVariables';

const SignupScreen = ({navigation}: {navigation: any}) => {
  const [fName, setFName] = useState('test');
  const [lName, setLName] = useState('test');

  const handlefNameChange = (text: string) => {
    setFName(text);
  };

  const handlelNameChange = (text: string) => {
    setLName(text);
  };

  const handleNext = async () => {
    if (fName === '' || lName === '') {
      Alert.alert('Error!', 'Please fill in all the fields');
      return;
    }
    signupConfig.firstName = fName.trim();
    signupConfig.lastName = lName.trim();
    navigation.navigate('SignupScreen2');
  };

  const backBtnHandler = () => {
    navigation.pop();
    setFName('');
    setLName('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.stepsCountView}>
          <Text style={[styles.stepsCountTxt, {color: Colors.primaryColor}]}>
            Step{' '}
          </Text>
          <Text style={styles.stepsCountTxt}>1 of 5</Text>
        </View>
        <Text style={styles.toptxt}>We'd love to know your full name!</Text>
      </View>
      <View style={styles.middle}>
        <InputField
          handleChange={handlefNameChange}
          value={fName}
          placeholder="First Name"
          width={95}
        />
        <InputField
          handleChange={handlelNameChange}
          value={lName}
          placeholder="Last Name"
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
    height: 270,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsCountView: {
    height: 70,
    alignItems: 'center',
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

export default SignupScreen;
