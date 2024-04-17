import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../assets/colors/colors';
import InputField from '../../components/InputField';
import Fonts from '../../../assets/fonts/fonts';
import ContactItem from '../../components/ContactItem';

const NewChat = ({navigation}: any) => {
  const [search, setSearch] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/back.png')} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Select Contact</Text>
            <Text style={styles.headerSubtitle}>5 Contacts</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setSearch(!search)}>
          <Image source={require('../../../assets/images/search.png')} />
        </TouchableOpacity>
      </View>
      {search && (
        <View style={{alignItems: 'center'}}>
          <InputField style={{width: '90%'}} placeholder="Search" width={95} />
        </View>
      )}
      <ScrollView style={styles.contactListContainer}>
        <ContactItem
            navigation={navigation}
            userName="John Doe"
            expertise="React Native Developer"
            userId='1'
            receiverId='2'
        />
        <ContactItem
            navigation={navigation}
            userName="John Doe"
            expertise="React Native Developer"
            userId='1'
            receiverId='2'
        />
      </ScrollView>
    </View>
  );
};

export default NewChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
  },
  header: {
    height: 55,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 20,
  },
  headerTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.tertiaryColor,
  },
  headerSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.tertiaryColor,
    marginTop: -5,
  },
  contactListContainer: {
    height:'92%',
  },
});
