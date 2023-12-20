import React, {useRef, useState} from 'react';
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
import {TextInput} from 'react-native-gesture-handler';

const SignupScreen6 = ({navigation, route}: {navigation: any; route: any}) => {
  const {phnNumber, heading, email, login} = route.params;
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(0);
  const [val4, setVal4] = useState(0);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);

  const handleNext = () => {
    if(login){
      navigation.navigate('HomeScreen');
    }
    else if (email) {
      navigation.navigate('CreateNewPassScreen');
    } else {
      navigation.navigate('SignupScreen7');
    }
  };
  const ResendBtnHandler = () => {
    console.log('ResendBtnHandler');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stepsCountView}>
        {!login ? (
          <Text style={[styles.stepsCountTxt, {color: Colors.primaryColor}]}>
            {phnNumber ? 'Step ' : null}
          </Text>
        ) : null}
        {!login ? (
          <Text style={styles.stepsCountTxt}>
            {phnNumber ? '4 of 5' : null}
          </Text>
        ) : null}
      </View>
      <View style={styles.top}>
        <Text style={styles.toptxt}>{heading}</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.middletxt}>
          Please enter the code we sent to{'\n'}
          <Text style={{color: Colors.primaryColor}}>
            {phnNumber ? phnNumber : email}
          </Text>
        </Text>
        <View style={styles.PinInputView}>
          <TextInput
            style={styles.PinTextInput}
            returnKeyType={'done'}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={value => {
              const numericValue = parseInt(value, 10);
              setVal1(isNaN(numericValue) ? 0 : numericValue);

              if (value.length === 1 && inputRef1.current) {
                inputRef1.current.focus();
              }
            }}
            ref={inputRef4}
          />
          <TextInput
            style={styles.PinTextInput}
            returnKeyType={'done'}
            keyboardType="number-pad"
            maxLength={1}
            ref={inputRef1}
            onChangeText={value => {
              const numericValue = parseInt(value, 10);
              setVal2(isNaN(numericValue) ? 0 : numericValue);
              if (value.length === 1 && inputRef2.current) {
                inputRef2.current.focus();
              }
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && inputRef4.current) {
                inputRef4.current.focus();
                inputRef4.current.clear();
              }
            }}
          />
          <TextInput
            style={styles.PinTextInput}
            returnKeyType={'done'}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={value => {
              const numericValue = parseInt(value, 10);
              setVal3(isNaN(numericValue) ? 0 : numericValue);
              if (value.length === 1 && inputRef3.current) {
                inputRef3.current.focus();
              }
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && inputRef1.current) {
                inputRef1.current.focus();
                inputRef1.current.clear();
              }
            }}
            ref={inputRef2}
          />
          <TextInput
            style={styles.PinTextInput}
            returnKeyType={'done'}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={value => {
              const numericValue = parseInt(value, 10);
              setVal4(isNaN(numericValue) ? 0 : numericValue);
            }}
            ref={inputRef3}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && inputRef2.current) {
                inputRef2.current.focus();
                inputRef2.current.clear();
              }
            }}
          />
        </View>
        <View style={styles.submitbtn}>
          <PressableBtn text="Submit" onPress={handleNext} />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.bottomtxt}>Didn't get code? </Text>
          <TouchableOpacity onPress={ResendBtnHandler}>
            <Text style={styles.bottombtntxt}>Resend</Text>
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
    maxWidth: 250,
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
  },
  middle: {
    height: 338,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PinInputView: {
    justifyContent: 'space-between',
    width: '75%',
    marginTop: 15,
    flexDirection: 'row',
  },
  PinTextInput: {
    width: 63,
    height: 56,
    fontSize: 20,
    paddingLeft: 25,
    color: 'black',
    borderRadius: 12,
    backgroundColor: Colors.secondaryColor,
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

export default SignupScreen6;
