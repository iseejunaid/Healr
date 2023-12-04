import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface InputFieldProps {
  handleChange: (text: string) => void;
  value: string;
  placeholder: string;
  width: number;
  source?: ImageSourcePropType;
  secureTextEntry?: boolean;
  iconPressed?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  handleChange,
  value,
  placeholder,
  width,
  source,
  secureTextEntry,
  iconPressed,
}) => {
  return (
    <View style={styles.input}>
      <TextInput
        style={{width: `${width}%`, fontFamily: 'Poppins-regular'}}
        onChangeText={handleChange}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry || false}
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
    backgroundColor: 'white',
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