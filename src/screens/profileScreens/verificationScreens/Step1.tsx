import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';
import ScreensHeader from './ScreensHeader';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import { verificationData } from './VerificationData';

const GetVerifiedStep1: React.FC = ({navigation}: any) => {
  const [country, setCountry] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const onPress = () => {
    setPickerVisible(true);
  };

  const onSelect = (selectedCountry: any) => {
    setCountry(selectedCountry.name);
    setPickerVisible(false);
  };

  const handleNext = () => {
    if (country) {
      verificationData.country = country.trim();
      navigation.navigate('GetVerifiedStep2');
    }else{
      Alert.alert('Select Country', 'Please select your country to proceed');
    }
  };

  return (
    <View style={styles.container}>
      <ScreensHeader
        navigation={navigation}
        text="Step 1"
        rightText="Next"
        rightTextPress={handleNext}
      />
      <View style={styles.body}>
        <Text style={styles.countryText}>Select Your Country</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.countryInput}>
            {country ? country : 'Select Country'}
          </Text>
        </TouchableOpacity>
      </View>
      <CountryPicker
        withFilter
        withFlag
        withAlphaFilter
        visible={isPickerVisible}
        onSelect={onSelect}
        theme={DARK_THEME}
        onClose={() => setPickerVisible(false)}
        containerButtonStyle={{display: 'none'}}
        countryCode='PK'
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
  countryText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.secondaryColor,
  },
  countryInput: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.tertiaryColor,
    backgroundColor: Colors.secondaryWhite,
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
});

export default GetVerifiedStep1;
