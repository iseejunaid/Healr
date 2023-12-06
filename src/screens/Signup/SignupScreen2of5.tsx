import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputField from '../../components/InputField';
import PressableBtn from '../../components/PressableBtn';
import {Categorydata, Expertisedata} from './signupConstantData';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import SelectDropdown from '../../components/SelectDropdown';
import CheckBox from '@react-native-community/checkbox';

const SignupScreen2of5 = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    setValue2(null);
  }, [value]);

  const handleInputData = (text: string) => {
    setInputData(text);
  };

  const handleSubmit = () => {
    // TODO: Implement login logic
    navigation.navigate('SignupScreen3of5');
  };
  const backBtnHandler = () => {
    navigation.pop();
    // setFName('');
    // setLName('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.stepsCountView}>
          <Text style={[styles.stepsCountTxt, {color: Colors.primaryColor}]}>
            Step{' '}
          </Text>
          <Text style={styles.stepsCountTxt}>2 of 5</Text>
        </View>
        <Text style={styles.toptxt}>
          Great "LName"! Now, select your profession.
        </Text>
      </View>
      <View style={styles.middle}>
        <SelectDropdown
          data={Categorydata}
          placeholder={'Select Category'}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
        {value == null ? (
          <View style={styles.middleChkbox}>
            <CheckBox
              disabled={false}
              tintColors={{
                true: Colors.primaryColor,
                false: Colors.secondaryColor,
              }}
              value={isChecked}
              onValueChange={newValue => setIsChecked(newValue)}
            />
            <Text style={styles.middleChkboxtxt}>Medical Trainee</Text>
          </View>
        ) : null}

        {value != null ? (
          <SelectDropdown
            data={Expertisedata(value)}
            placeholder={'Select Expertise'}
            value={value2}
            onChange={item => {
              setValue2(item.value);
            }}
          />
        ) : null}
        {value2 == 'Not Listed (Please Specify)' ? (
          <InputField
            handleChange={handleInputData}
            value={inputData}
            placeholder="Please Specify"
            width={95}
          />
        ) : null}
        <View style={styles.submitbtn}>
          <PressableBtn text="Next" onPress={handleSubmit} />
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
    width: '85%',
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
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleChkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '83%',
  },
  middleChkboxtxt: {
    color: Colors.secondaryColor,
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 129,
  },
  submitbtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
  },
  bottomtxt: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.secondaryColor,
  },
  bottombtntxt: {
    color: Colors.primaryColor,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    marginTop: '2%',
  },
});

export default SignupScreen2of5;