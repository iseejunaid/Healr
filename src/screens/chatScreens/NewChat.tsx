import React, {useEffect, useState} from 'react';
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
import {fetchContacts} from './ChatHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const NewChat = ({navigation}: any) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [healerContacts, setHealerContacts] = useState<
    {
      photoURL: any;
      name: any;
      phnNumber: any;
      expertise: any;
      expertiseInput: any;
      receiverId: any;
      status: any;
    }[]
  >([]);
  const [invitableContacts, setInvitableContacts] = useState<
    {name: string; phoneNumber: string}[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const {HealrContacts, invitableContacts} = await fetchContacts();
      setHealerContacts(HealrContacts);
      setInvitableContacts(invitableContacts);
    };
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('uid');
      setUserId(id || '');
    };
    fetchUserId();
    fetchData().then(() => setLoading(false));
  }, []);

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
      {loading ? (
        <View style={styles.contactListContainer}>
          <Loader backgroundColor={Colors.secondaryColor} />
        </View>
      ) : (
        <ScrollView style={styles.contactListContainer}>
          {healerContacts.length > 0 && (
            <>
              <View style={styles.heading}>
                <Text style={styles.headingText}>Contacts on Healr</Text>
              </View>
              {healerContacts.map((contact, index) => (
                <ContactItem
                  key={index}
                  navigation={navigation}
                  profileImageSource={contact.photoURL}
                  userName={contact?.name || 'Unknown'}
                  expertise={contact?.expertise || 'N/A'}
                  userId={userId}
                  status={contact?.status || 'unavailable'}
                  receiverId={contact?.receiverId || 'Unknown'}
                />
              ))}
            </>
          )}
          {invitableContacts.length > 0 && (
            <>
              <View style={styles.heading}>
                <Text style={styles.headingText}>Invite to Healr</Text>
              </View>
              {invitableContacts.map((contact, index) => (
                <ContactItem
                  key={index}
                  navigation={navigation}
                  userName={contact?.name || 'Unknown'}
                  expertise="Invite"
                  invitable
                />
              ))}
            </>
          )}
        </ScrollView>
      )}
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
    height: '92%',
  },
  heading: {
    paddingLeft: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  headingText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.quadraryColor,
  },
});
