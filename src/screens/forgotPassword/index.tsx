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

const ForgotPassScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handleSubmit = () => {
    setEmail('');
    navigation.navigate('ForgotPassOTPScreen');
  };
  const backbtnHandler = () => {
    setEmail('');
    navigation.pop();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.toptxt}>Password</Text>
        <Text style={styles.toptxt}>slip-up?</Text>
        <Text style={styles.toptxt}>We'll sort it!</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.middletxtView}>
          <Text style={styles.middletxt}>
            Please enter your phone number or
          </Text>
          <Text style={styles.middletxt}>email address to receive the</Text>
          <Text style={[styles.middletxt, {color: Colors.primaryColor}]}>
            verification code.
          </Text>
        </View>
        <InputField
          handleChange={handleEmailChange}
          value={email}
          placeholder="Phone Number or Email Address"
          width={95}
        />
        <View style={styles.submitbtn}>
          <PressableBtn text="Next" onPress={handleSubmit} />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Back to </Text>
          <TouchableOpacity onPress={backbtnHandler}>
            <Text style={styles.bottombtntxt}>Login</Text>
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
    height: 330,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  toptxt: {
    color: Colors.primaryColor,
    lineHeight: 50,
    fontSize: 40,
    fontFamily: Fonts.semiBold,
  },
  middle: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middletxtView: {
    alignItems: 'center',
  },
  middletxt: {
    color: Colors.secondaryColor,
    letterSpacing: 0.8,
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 170,
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
    marginTop: '10%',
  },
});

export default ForgotPassScreen;
