import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputField from '../../components/InputField';
import PressableBtn from '../../components/PressableBtn';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';

const SignupScreen7 = ({navigation}: {navigation: any}) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePassChange = (text: string) => {
    setPass(text);
  };

  const handleConfirmPassChange = (text: string) => {
    setConfirmPass(text);
  };

  const handleNext = () => {
    console.log('next');
  };
  const backBtnHandler = () => {
    navigation.pop();
    setPass('');
    setConfirmPass('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stepsCountView}>
        <Text style={[styles.stepsCountTxt, {color: Colors.primaryColor}]}>
          Step{' '}
        </Text>
        <Text style={styles.stepsCountTxt}>5 of 5</Text>
      </View>
      <View style={styles.top}>
        <Text style={styles.toptxt}>Last step! Lets finish strong.</Text>
      </View>
      <View style={styles.middle}>
        <InputField
          handleChange={handlePassChange}
          value={pass}
          placeholder="Password"
          width={95}
        />
        <InputField
          handleChange={handleConfirmPassChange}
          value={confirmPass}
          placeholder="Confirm Password"
          width={95}
        />
        <View style={styles.submitbtn}>
          <PressableBtn text="Done" onPress={handleNext} />
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
    maxWidth: 250,
    fontFamily: Fonts.semiBold,
  },
  middle: {
    height: 310,
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
    height: 165,
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

export default SignupScreen7;
