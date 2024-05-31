import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../../assets/colors/colors';
import Fonts from '../../../../assets/fonts/fonts';
import ScreensHeader from './ScreensHeader';

const GetVerifiedStep1: React.FC = ({navigation}: any) => {
  const [country, setCountry] = useState('');
  let countryPickerRef: any = null;
  const onpress = () => {
    countryPickerRef.open();
  };
  return (
    <View style={styles.container}>
      <ScreensHeader
        navigation={navigation}
        text="Get Verified"
        rightText="Next"
      />
      <View style={styles.body}>
        <Text style={styles.countryText}>Select Your Country</Text>
        <Text style={styles.countryInput} onPress={onpress}>
          {country ? country : 'Select Country'}
        </Text>
      </View>
      {/* <CountryPicker
        countryPickerRef={(ref: any) => {
          countryPickerRef = ref;
        }}
        enable={true}
        countryCode={'US'}
        containerConfig={{
          showFlag: true,
          showCountryName: true,
          showCountryCode: true,
        }}
        modalConfig={{
          showFlag: true,
          showCallingCode: false,
          showCountryName: true,
          showCountryCode: false,
        }}
        onSelectCountry={(data: any) => {
          console.log('DATA', data);
          setCountry(data.name);
        }}
        onInit={(data: any) => {
          console.log('DATA', data);
        }}
        containerStyle={{
          container: {display: 'none'},
        }}
        modalStyle={{
          container: {
            backgroundColor:Colors.tertiaryColor
          },
          searchStyle: {
            backgroundColor:Colors.secondaryColor,
          },
          tileStyle: {},
          itemStyle: {
            itemContainer: {
                backgroundColor:Colors.tertiaryColor
            },
            flagStyle: {},
            countryCodeStyle: {},
            countryNameStyle: {},
            callingNameStyle: {},
          },
        }}
        title={'Country'}
        searchPlaceholder={'Search'}
        showCloseButton={true}
        showModalTitle={true}
      /> */}
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
