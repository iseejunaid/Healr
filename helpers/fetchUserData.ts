import {db} from '../configs/firebaseConfig'; // Import your Firebase Firestore instance
import {getDocs, collection, query, where} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserData = async (user: object,token:string) => {

  const uid = user.uid;
  const photoURL = user.photoURL;
  const name = user.displayName;
  var docid = '';
  var category = '';
  var isIntern = false;
  var expertise = '';
  var expertiseInput = '';
  var workplace = '';
  var status = '';
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
      status = userData.status;
      about = userData.about;
    });

    try {
      const dataToStore = [
        ['loggedIn', true.toString()],
        ['token', token.toString()],
        ['uid', uid.toString()],
        ['docid', docid.toString()],
        ['name', name.toString()],
        ['category', category.toString()],
        ['isIntern', isIntern.toString()],
        ['expertise', expertise.toString()],
        ['status', status.toString()],
        ['about', about.toString()],
      ];

      if(photoURL){        
        dataToStore.push(['photoURL', photoURL.toString()]);
      }else{
        dataToStore.push(['photoURL', '']);
      }
          
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
