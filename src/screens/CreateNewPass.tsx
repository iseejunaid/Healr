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

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePassChange = (text: string) => {
    setPassword(text);
  };
  const handleConfirmPassChange = (text: string) => {
    setConfirmPassword(text);
  };
  const handleSubmit = () => {
    setPassword('');
    setConfirmPassword('');
  };
  const backbtnHandler = () => {
    setPassword('');
    setConfirmPassword('');
    navigation.pop(2);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.toptxt}>Create a new</Text>
        <Text style={styles.toptxt}>password!</Text>
      </View>
      <View style={styles.middle}>
        <InputField
          handleChange={handlePassChange}
          value={password}
          placeholder="New Password"
          secureTextEntry={true}
          width={95}
        />
        <InputField
          handleChange={handleConfirmPassChange}
          value={confirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={true}
          width={95}
        />
        <View style={styles.submitbtn}>
          <PressableBtn text="Save" onPress={handleSubmit} />
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
    backgroundColor: '#222831',
  },
  top: {
    height: 330,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  toptxt: {
    color: '#00ADB5',
    lineHeight: 50,
    fontSize: 40,
    fontFamily: 'Poppins-SemiBold',
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
    color: '#FFFFFF',
    letterSpacing: 0.8,
    fontSize: 13,
    fontFamily: 'Poppins-regular',
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
    color: '#FFFFFF',
    fontFamily: 'Poppins-regular',
  },
  bottombtntxt: {
    fontFamily: 'Poppins-SemiBold',
    color: '#00ADB5',
    fontSize: 12,
    marginTop: '10%',
  },
});

export default LoginScreen;
