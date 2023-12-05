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
import {Dropdown} from 'react-native-element-dropdown';
import {Categorydata, Expertisedata} from './signupConstantData';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';

const SignupScreen2of5 = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [inputData, setInputData] = useState('');

  const handleInputData = (text: string) => {
    setInputData(text);
  };

  const handleSubmit = () => {
    // TODO: Implement login logic
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
        <Dropdown
          style={styles.dropdown}
          containerStyle={{borderRadius: 6}}
          itemTextStyle={{fontSize: 13, color: Colors.tertiaryColor}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          fontFamily={Fonts.regular}
          data={Categorydata}
          labelField="label"
          valueField="value"
          placeholder={'Profession Category'}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
        {value != null ? (
          <Dropdown
            style={styles.dropdown}
            containerStyle={{borderRadius: 6}}
            itemTextStyle={{fontSize: 13, color: Colors.tertiaryColor}}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            fontFamily={Fonts.regular}
            data={Expertisedata(value)}
            labelField="label"
            valueField="value"
            placeholder={'Area of Expertise'}
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
    height: 330,
    justifyContent: 'space-evenly',
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
  },
  bottombtntxt: {
    color: Colors.primaryColor,
    fontSize: 12,
    marginTop: '2%',
  },
  dropdown: {
    height: 50,
    marginTop: '3%',
    width: '83%',
    borderRadius: 6,
    backgroundColor: Colors.secondaryColor,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 13,
    marginTop: '2%',
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
  selectedTextStyle: {
    marginTop: '2%',
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
});

export default SignupScreen2of5;