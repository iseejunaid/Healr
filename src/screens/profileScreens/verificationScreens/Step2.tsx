import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';
import ScreensHeader from './ScreensHeader';
import {verificationData} from './VerificationData';
import InputField from '../../../components/InputField';
import DatePicker from 'react-native-date-picker';

const GetVerifiedStep2: React.FC = ({navigation}: any) => {
  const [fullName, setFullName] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [dob, setDob] = useState('');
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    if (fullName && nationalID && dob) {
      verificationData.fullName = fullName.trim();
      verificationData.nationalID = nationalID.trim();
      verificationData.dob = dob;
      navigation.navigate('GetVerifiedStep3');
    } else {
      Alert.alert('Fill All Fields', 'Please fill all fields to proceed');
    }
  };

  const onPress = () => {
    setOpen(true);
  };

  return (
    <View style={styles.container}>
      <ScreensHeader
        navigation={navigation}
        text="Step 2"
        rightText="Next"
        rightTextPress={handleNext}
      />
      <View style={styles.body}>
        <Text style={styles.headingText}>Enter your personal information</Text>
        <View style={{marginTop: 50}}>
          <Text style={styles.subHeadingText}>
            Full Name as per your National ID
          </Text>
          <InputField
            style={{width: '100%', marginLeft: 0}}
            placeholder="Full Name"
            value={fullName}
            handleChange={setFullName}
            width={95}
          />
          <Text style={styles.subHeadingText}>National ID</Text>
          <InputField
            style={{width: '100%', marginLeft: 0}}
            placeholder="00000000000 (without dashes or spaces)"
            value={nationalID}
            handleChange={setNationalID}
            width={95}
          />
          <Text style={styles.subHeadingText}>Date of Birth</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.dobInput}>
              {dob ? dob.toString() : 'Select Date of Birth'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        modal
        open={open}
        mode="date"
        date={dob ? new Date(dob) : new Date()}
        onConfirm={date => {
          setOpen(false);
          const formattedDate = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`;
          setDob(formattedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tertiaryColor,
  },
  body: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headingText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.secondaryColor,
  },
  subHeadingText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.secondaryWhite,
  },
  dobInput: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.tertiaryColor,
    backgroundColor: Colors.secondaryWhite,
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
});

export default GetVerifiedStep2;
