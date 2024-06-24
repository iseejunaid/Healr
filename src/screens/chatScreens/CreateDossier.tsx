import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '../../../assets/colors/colors';
import Fonts from '../../../assets/fonts/fonts';
import ImageCropPicker from 'react-native-image-crop-picker';
import InputField from '../../components/InputField';
import {saveDossier, sendDossier} from './ChatHelper';
import {ScrollView} from 'react-native-gesture-handler';

const CreateDossier = ({navigation, route}: any) => {
  var messages = route.params.messages;
  if (messages) messages = JSON.parse(messages);

  const [sliderData, setSliderData] = useState([
    {id: 'addImage', path: 'Add Image'},
  ]);
  const [title, setTitle] = useState('');
  const [mrn, setMrn] = useState('');
  const [description, setDescription] = useState('');

  const openImagePicker = async () => {
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(data => {
        const newImages = data.map((image, index) => ({
          id: `image-${Date.now()}-${index}`,
          path: image.path,
        }));

        setSliderData([...newImages, ...sliderData]);
      })
      .catch(err => {
        console.log(err);
      });

    ImageCropPicker.clean();
  };
  const handleSend = async () => {
    if (sliderData.length <= 1) {
      Alert.alert('Missing Images', 'Please add at least One image');
      return;
    }
    if (!title) {
      Alert.alert('Title Missing', 'Please Enter Title');
      return;
    }
    const imagespaths = sliderData
      .filter(item => item.id !== 'addImage')
      .map(item => item.path);

    sendDossier(
      route.params.receiverId,
      imagespaths,
      title,
      mrn,
      description,
    );
    Alert.alert(
      'Making Dossier',
      'PDF generation takes time, It will be sent when Finished.',
    );
    navigation.pop();
  };

  const handleSave = ()=>{
    if (!title) {
      Alert.alert('Title Missing', 'Please Enter Title');
      return;
    }
    const imagespaths = sliderData
      .filter(item => item.id !== 'addImage')
      .map(item => item.path);

    saveDossier(
      imagespaths,
      messages,
      title,
      mrn,
      description,
    );
    Alert.alert(
      'Making Dossier',
      'PDF generation takes time, It will be saved to Healr Files when Finished.',
    );
    navigation.pop();
  }

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.cardContainer,
          item.id === 'addImage' ? styles.addImageContainer : null,
        ]}
        onPress={item.id === 'addImage' ? openImagePicker : undefined}>
        {item.id === 'addImage' && (
          <Image
            source={require('../../../assets/images/addImage.png')}
            style={styles.addImageIcon}
          />
        )}
        {item.id !== 'addImage' && (
          <Image
            source={{uri: item.path}}
            style={{height: '100%', width: '100%', borderRadius: 12}}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{height: '100%', justifyContent: 'center'}}
          onPress={() => navigation.pop()}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headerText}>New dossier</Text>
        </View>
        {messages ? (
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.sendbtn}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSend}>
            <Text style={styles.sendbtn}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View style={styles.sliderContainer}>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            data={sliderData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'fast'}
          />
        </View>
          {messages && (
            <>
              <Text style={styles.messagesHeading}>Included Messages:</Text>
              <View style={{paddingHorizontal:40}}>
                {messages.map((message: any, index: number) => (
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      color: Colors.tertiaryColor,
                      lineHeight: 20,
                    }}
                    key={index}>
                    {message.message}
                  </Text>
                ))}
              </View>
            </>
          )}
        <View style={styles.body}>
          <InputField
            style={{elevation: 5}}
            placeholder="Title"
            width={95}
            value={title}
            handleChange={setTitle}
          />
          <InputField
            style={{elevation: 5}}
            placeholder="MRN"
            width={95}
            value={mrn}
            handleChange={setMrn}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor={Colors.quadraryColor}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateDossier;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
  },
  headerContainer: {
    height: 55,
    backgroundColor: Colors.secondaryColor,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backImg: {
    height: 20,
    width: 22,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
  },
  sendbtn: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primaryColor,
  },
  sliderContainer: {
    height: 200,
    alignItems: 'center',
  },
  cardContainer: {
    height: 150,
    width: 150,
    borderRadius: 12,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addImageContainer: {
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageIcon: {
    height: 50,
    width: 50,
  },
  body: {
    height: 550,
    alignItems: 'center',
  },
  messagesHeading: {
    fontFamily: Fonts.semiBold,
    color: Colors.tertiaryColor,
    paddingLeft: 35,
  },
  input: {
    fontFamily: Fonts.regular,
    borderRadius: 6,
    padding: 10,
    width: '83%',
    minHeight: 250,
    margin: '3%',
    backgroundColor: Colors.secondaryWhite,
    color: 'black',
    elevation: 5,
  },
});
