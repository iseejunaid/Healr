import {db} from '../configs/firebaseConfig'; // Import your Firebase Firestore instance
import {getDocs, collection, query, where} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserData = async (user: object) => {
  const uid = user.uid;
  const name = user.displayName;
  var docid = '';
  var category = '';
  var isIntern = false;
  var expertise = '';
  var expertiseInput = '';
  var workplace = '';
  var about = '';
  try {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const userData = doc.data();
      
      docid = doc.id;      
      category = userData.category;
      isIntern = userData.isIntern;
      expertise = userData.expertise;
      if (userData.expertiseInput) {
        expertiseInput = userData.expertiseInput;
      }
      if (userData.workplace) {
        workplace = userData.workplace;
      }
      about = userData.about;
    });

    try {
      const dataToStore = [
        ['uid', uid.toString()],
        ['docid', docid.toString()],
        ['name', name.toString()],
        ['category', category.toString()],
        ['isIntern', isIntern.toString()],
        ['expertise', expertise.toString()],
        ['about', about.toString()],
      ];

      if (expertiseInput) {
        dataToStore.push(['expertiseInput', expertiseInput.toString()]);
      }

      if (workplace) {
        dataToStore.push(['workplace', workplace.toString()]);
      }
      await AsyncStorage.multiSet(dataToStore as [string, string][]);
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error.message);
    }
  } catch (error) {
    console.error('Error fetching Firestore data:', error.message);
  }
};
