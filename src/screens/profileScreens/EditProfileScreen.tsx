import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import InputField from '../../components/InputField';
import SelectDropdown from '../../components/SelectDropdown';
import {Categorydata, Expertisedata} from '../Signup/signupConstantData';
import {fetchData, updateData} from './EditProfileHelper';
import Loader from '../../components/Loader';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = ({navigation}: any) => {
  const [profileImage, setProfileImage] = useState<string | null>('');
  const [name, setName] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [value, setValue] = useState<string | null>('');
  const [value2, setValue2] = useState<string | null>('');
  const [inputData, setInputData] = useState('');
  const [abouttxt, setabouttxt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDataFromAsyncStorage = async () => {
        try {
            const {
                fullname,
                photoURL,
                workplace,
                category,
                expertiseValue,
                expertiseInput,
                about,
            } = await fetchData();

            // Update states
            Promise.all([
                setName(fullname),
                setProfileImage(photoURL),
                setWorkplace(workplace),
                setValue(category),
                setValue2(expertiseValue),
                setInputData(expertiseInput),
                setabouttxt(about)
            ]).then(() => {
                setLoading(false); // Set loading to false after all states are updated
            });
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error.message);
            setLoading(false); // Make sure to handle loading state in case of error
        }        
    };

    fetchDataFromAsyncStorage();
}, []);


  const imageBtnHandler = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: 'Edit Image',
      cropperToolbarColor: Colors.secondaryColor,
      cropperStatusBarColor: Colors.secondaryColor,
      cropperToolbarWidgetColor: Colors.tertiaryColor,
      cropperActiveWidgetColor: Colors.primaryColor,
    }).then(image => {      
      setProfileImage(image.path);
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
    return true;
  };

  
  const saveData = async () => {
    setLoading(true);
    const dataFromAsyncStorage = await fetchData();
        
    if (
      profileImage == dataFromAsyncStorage.photoURL &&
      name === dataFromAsyncStorage.fullname &&
      workplace === dataFromAsyncStorage.workplace &&
      value === dataFromAsyncStorage.category &&
      value2 === dataFromAsyncStorage.expertiseValue &&
      inputData === dataFromAsyncStorage.expertiseInput &&
      abouttxt === dataFromAsyncStorage.about
    ) {
      navigation.pop();
      setLoading(false);
    } else {
      if (value2) {                
        if (value2 === 'unlisted' ? inputData !== '' : true) {
          updateData({
            fullname: name,
            photoURL: profileImage,
            workplace: workplace,
            category: value,
            expertiseValue: value2,
            expertiseInput: inputData,
            about: abouttxt,
          }).then(() => {
            navigation.pop();
            setLoading(false);
          });
        } else {
          Alert.alert('Missing Entry', 'Please specify your Expertise');
          setLoading(false);
        }
      } else {
        Alert.alert('Missing Entry', 'Please select Area of Expertise');
        setLoading(false);
      }
    }
    ImagePicker.clean();
  };

  return (
    loading ? (
      <Loader backgroundColor={Colors.secondaryColor}/>
    ) : (
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
        {profileImage ? (
            <Image source={{uri: profileImage}} style={styles.image} />
          ) : (
          <Image
            source={require('../../../assets/images/placeholder.jpg')}
            style={styles.image}
          />
          )}
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
        <Text style={styles.bodylabels}>Full Name</Text>
        <InputField handleChange={setName} value={name} width={95} />

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
            setInputData('');
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
            setInputData('');
          }}
        />

        {value2 == 'unlisted' ? (
          <>
            <Text style={[styles.bodylabels, {marginTop: 10}]}>Expertise</Text>
            <InputField
              handleChange={setInputData}
              value={inputData}
              placeholder="Please Specify"
              width={95}
            />
          </>
        ) : null}

        <Text style={[styles.bodylabels, {marginTop: 10}]}>About</Text>
        <TextInput
          style={styles.input}
          placeholder="Write about yourself..."
          multiline={true}
          numberOfLines={4}
          value={abouttxt}
          onChangeText={setabouttxt}
        />
      </View>
    </ScrollView>
    )
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
    width: '100%',
    height: '100%',
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
