import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../../assets/colors/colors';
import Fonts from '../../assets/fonts/fonts';
import {StyleSheet} from 'react-native';

interface DropdownProps {
  data: any;
  placeholder: string;
  value: string | null;
  onChange: (value: any) => void;
}

const SelectDropdown: React.FC<DropdownProps> = ({
  data,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={{borderRadius: 6}}
      itemTextStyle={{fontSize: 13, color: Colors.tertiaryColor}}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      fontFamily={Fonts.regular}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
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
    top: 3.5,
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
  selectedTextStyle: {
    top:3.5,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
});
export default SelectDropdown;
