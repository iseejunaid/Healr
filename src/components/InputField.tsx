import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Colors from '../../assets/colors/colors';
import Fonts from '../../assets/fonts/fonts';

interface InputFieldProps {
  style?: any;
  handleChange?: (text: string) => void;
  value?: string;
  placeholder?: string;
  width: number;
  keyboardType?: any;
  source?: ImageSourcePropType;
  secureTextEntry?: boolean;
  iconPressed?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  handleChange,
  value,
  style,
  placeholder,
  width,
  source,
  secureTextEntry,
  keyboardType,
  iconPressed,
}) => {
  return (
    <View style={[styles.input,{ ...style }]}>
      <TextInput
        style={{width: `${width}%`, fontFamily: Fonts.regular, top: 2,color:'black'}}
        onChangeText={handleChange}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry || false}
        keyboardType={keyboardType || 'default'}
      />
      {source && (
        <TouchableOpacity style={styles.imgContainer} onPress={iconPressed}>
          <Image style={styles.img} source={source} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: '83%',
    margin: '3%',
    backgroundColor: Colors.secondaryWhite,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    height: 45,
    width: '8.5%',
    justifyContent: 'center',
  },
  img: {
    height: 20,
    width: 22,
  },
});

export default InputField;
