import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputField from '../components/InputField';
import PressableBtn from '../components/PressableBtn';
import Colors from '../../assets/colors/colors';
import Fonts from '../../assets/fonts/fonts';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    navigation.navigate('SignupScreen6', {
      phnNumber: '//db.phnNumber//',
      login: true,
      heading: 'One-time code verification!',
      
    });
  };

  const passwordIconHandler = () => {
    setShowPassword(!showPassword);
  };

  const forgotbtnHandler = () => {
    navigation.navigate('ForgotPassScreen');
    setEmail('');
    setPassword('');
  };
  const signupHandler = () => {
    navigation.navigate('SignupScreen');
    setEmail('');
    setPassword('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.toptxt}>Login</Text>
      </View>
      <View style={styles.middle}>
        <InputField
          handleChange={handleEmailChange}
          value={email}
          placeholder="Phone Number or Email Address"
          width={95}
        />
        <InputField
          handleChange={handlePasswordChange}
          value={password}
          placeholder="Password"
          secureTextEntry={showPassword}
          width={86}
          iconPressed={passwordIconHandler}
          source={
            showPassword
              ? require('../../assets/images/eyeslash.png')
              : require('../../assets/images/eyeslash1.png')
          }
        />

        <View style={styles.forgotbtn}>
          <TouchableOpacity onPress={forgotbtnHandler}>
            <Text style={styles.forgotbtntxt}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitbtn}>
          <PressableBtn text="Submit" onPress={handleSubmit} />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>New to Healr? </Text>
          <TouchableOpacity onPress = {signupHandler}>
            <Text style={styles.bottombtntxt}>Let's Begin!</Text>
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
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toptxt: {
    color: Colors.primaryColor,
    fontSize: 56,
    fontFamily: Fonts.semiBold,
  },
  middle: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 160,
  },
  submitbtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
  },
  forgotbtn: {
    width: '83%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: '-2%',
  },
  forgotbtntxt: {
    color: Colors.primaryColor,
    fontFamily: Fonts.semiBold,
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

export default LoginScreen;
