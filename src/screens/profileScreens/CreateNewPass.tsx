import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import InputField from '../../components/InputField';
import PressableBtn from '../../components/PressableBtn';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';

const CreateNewPassScreen = ({navigation}: {navigation: any}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    setPassword('');
    setConfirmPassword('');
    navigation.navigate('LoginScreen');
  };
  const backbtnHandler = () => {
    setPassword('');
    setConfirmPassword('');
    navigation.pop();
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={Colors.tertiaryColor} barStyle={'light-content'}/>
      <View style={styles.top}>
        <Text style={styles.toptxt}>Create a new</Text>
        <Text style={styles.toptxt}>password!</Text>
      </View>
      <View style={styles.middle}>
        <InputField
          handleChange={setCurrentPassword}
          value={currentPassword}
          placeholder="Old Password"
          secureTextEntry={true}
          width={95}
        />
        <InputField
          handleChange={setPassword}
          value={password}
          placeholder="New Password"
          secureTextEntry={true}
          width={95}
        />
        <InputField
          handleChange={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          width={95}
        />
        <View style={styles.submitbtn}>
          <PressableBtn text="Save" onPress={handleSubmit} />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Go </Text>
          <TouchableOpacity onPress={backbtnHandler}>
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
    marginTop: '9%',
  },
});

export default CreateNewPassScreen;