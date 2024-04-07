import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import InputField from '../components/InputField';
import PressableBtn from '../components/PressableBtn';
import Colors from '../../assets/colors/colors';
import Fonts from '../../assets/fonts/fonts';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../configs/firebaseConfig';
import { fetchUserData } from '../../helpers/fetchUserData';
import Loader from '../components/Loader';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('junaidnadeem266@gmail.com');
  const [password, setPassword] = useState('123123123');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      
      if (user.emailVerified) {
        fetchUserData(user).then(() => {
          setLoading(false);
          navigation.navigate('HomeScreen');
        });
      } else {
        setLoading(false);
        Alert.alert('Email not verified', 'Please go to your inbox and verify your email address.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', "Login Failed! Please check your credentials and try again.");
    }
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
    loading ? (
      <Loader backgroundColor={Colors.tertiaryColor}/>
    ) : (
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.bottomtxt}>New to Healr? </Text>
            <TouchableOpacity onPress={signupHandler}>
              <Text style={styles.bottombtntxt}>Let's Begin!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
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
