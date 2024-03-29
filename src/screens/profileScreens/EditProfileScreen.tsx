import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import InputField from '../../components/InputField';
import SelectDropdown from '../../components/SelectDropdown';
import {Categorydata, Expertisedata} from '../Signup/signupConstantData';
import {fetchData, updateData} from './EditProfileHelper';

const EditProfileScreen = ({navigation}: any) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [value, setValue] = useState<string | null>('');
  const [value2, setValue2] = useState<string | null>('');
  const [abouttxt, setabouttxt] = useState('');

  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const {
          firstname,
          lastname,
          workplace,
          category,
          expertiseValue,
          about,
        } = await fetchData();

        setFname(firstname);
        setLname(lastname);
        setWorkplace(workplace);
        setValue(category);
        setValue2(expertiseValue);
        setabouttxt(about);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error.message);
      }
    };

    fetchDataFromAsyncStorage();
  }, []);

  const imageBtnHandler = () => {
    console.log('Image Button Pressed');
  };

  const saveData = async () => {
    const dataFromAsyncStorage = await fetchData();
  
    if (
      fname === dataFromAsyncStorage.firstname &&
      lname === dataFromAsyncStorage.lastname &&
      workplace === dataFromAsyncStorage.workplace &&
      value === dataFromAsyncStorage.category &&
      value2 === dataFromAsyncStorage.expertiseValue &&
      abouttxt === dataFromAsyncStorage.about
    ) {
      navigation.pop();
    } else {
      updateData({
        firstname: fname,
        lastname: lname,
        workplace,
        category: value,
        expertiseValue: value2,
        about: abouttxt,
      });
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Edit Profile</Text>

        <TouchableOpacity onPress={saveData}>
          <Text style={styles.headerbtn}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileImg}>
        <View style={styles.circle} onStartShouldSetResponder={imageBtnHandler}>
          <Image
            source={require('../../../assets/images/placeholder.jpg')}
            style={styles.image}
          />
        </View>
        <View
          style={styles.editImgContainer}
          onStartShouldSetResponder={imageBtnHandler}>
          <Image
            source={require('../../../assets/images/editPictureIcon.png')}
          />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodylabels}>First Name</Text>
        <InputField handleChange={setFname} value={fname} width={95} />

        <Text style={styles.bodylabels}>Last Name</Text>
        <InputField handleChange={setLname} value={lname} width={95} />

        <Text style={styles.bodylabels}>Workplace</Text>
        <InputField
          handleChange={setWorkplace}
          placeholder="Enter Workplace"
          value={workplace}
          width={95}
        />

        <Text style={styles.bodylabels}>Profession Category</Text>
        <SelectDropdown
          data={Categorydata}
          placeholder={'Select Category'}
          value={value}
          onChange={item => {
            setValue(item.value);
            setValue2(null);
          }}
        />

        <Text style={[styles.bodylabels, {marginTop: 10}]}>
          Area of Expertise
        </Text>
        <SelectDropdown
          data={Expertisedata(value)}
          placeholder={'Select Expertise'}
          value={value2}
          onChange={item => {
            setValue2(item.value);
          }}
        />

        <Text style={[styles.bodylabels, {marginTop: 10}]}>About</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          value={abouttxt}
          onChangeText={setabouttxt}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 16,
  },
  backImg: {
    height: 20,
    width: 22,
  },
  headertxt: {
    color: Colors.tertiaryColor,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  headerbtn: {
    color: Colors.primaryColor,
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  profileImg: {
    width: '100%',
    height: 130,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: Colors.secondaryColor,
  },
  image: {
    flex: 1,
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  editImgContainer: {
    position: 'absolute',
    bottom: 20,
    right: 160,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 4,
    shadowRadius: 4,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodylabels: {
    paddingLeft: 35,
    marginBottom: -10,
    fontSize: 14,
    alignSelf: 'flex-start',
    fontFamily: Fonts.regular,
    color: Colors.tertiaryColor,
  },
  input: {
    borderRadius: 6,
    padding: 10,
    width: '83%',
    minHeight: 100,
    margin: '3%',
    backgroundColor: Colors.secondaryWhite,
  },
});
