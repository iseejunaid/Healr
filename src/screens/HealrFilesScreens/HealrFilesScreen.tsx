import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';
import OptionsModal from '../../components/OptionsModal';
import DocumentPicker from 'react-native-document-picker';
import InputField from '../../components/InputField';
import FileItem from '../../components/FileItem';
import { fetchFiles, uploadFile } from './HealrFilesHelper';
import Fonts from '../../../assets/fonts/fonts';

const HealrFilesScreen: React.FC = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [modified, setModified] = useState(true);
  const [files, setFiles] = useState<any[]>([]);

  const modalOptions = [{text: 'Refresh'},{ text: 'Import Files' }, { text: 'Sort' },];

  useEffect(() => {
    if (modified) {
      const fetchData = async () => {
        const data = await fetchFiles();
        setFiles(data);
      };
      fetchData();
      setModified(false);
    }    
  }, [modified]);

  const onOptionClick = async (option: string) => {
    switch (option) {
      case 'Refresh':
        setModified(true);
        break;
      case 'Import Files':
        try {
          DocumentPicker.pick({
            allowMultiSelection: true,
            type: [DocumentPicker.types.allFiles],
          })
            .then((data) => {
              const formattedDataArray = data.map((document) => ({
                uri: document.uri,
                type: document.type,
                name: document.name,
              }));

              uploadFile(formattedDataArray).then(() => {
                setModified(true);
              });
            })
            .catch((err) => {
              if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
              } else {
                console.log(err);
              }
            });
        } catch (err) {
          console.log(err);
        }
        break;
      case 'Sort':
        console.log('Sort');
        break;
    }
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header
        text="Healr Files"
        RighticonName="dotsIcon"
        onrightIconPress={toggleModal}
      />
      <ScrollView style={styles.filesContainer}>
        <InputField
          style={styles.searchInput}
          handleChange={setSearchValue}
          value={searchValue}
          placeholder="Search"
          width={95}
        />
        {filteredFiles.length === 0 ? (
          <View
            style={{
              height: 450,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../../assets/images/noFile.png')} />
            <Text
              style={{
                marginTop: '5%',
                fontFamily: Fonts.regular,
                color: Colors.tertiaryColor,
              }}>
              Empty shelves! No files in sight.
            </Text>
          </View>
        ) : null}
        {filteredFiles.map((file, index) => {
          return (
            <FileItem
              key={index}
              navigation={navigation}
              id={file.id}
              fileName={file.name}
              fileType={file.type}
              date={file.date}
              url={file.url}
              uploadedFileName={file.uploadedFileName}
              setModified={setModified}
              deleteValue={false}
            />
          );
        })}
      </ScrollView>
      <OptionsModal
        visible={modalVisible}
        onClose={toggleModal}
        options={modalOptions}
        foregroundColor={Colors.tertiaryColor}
        onOptionClick={onOptionClick}
        modalStyle={{
          backgroundColor: Colors.secondaryWhite,
          width: 140,
          top: 50,
          right: 15,
        }}
      />
    </View>
  );
};
export default HealrFilesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
  },
  filesContainer: {
    height: '88%',
    width: '100%',
  },
  searchInput: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
  },
});
