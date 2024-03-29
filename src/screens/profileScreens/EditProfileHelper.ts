import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../../configs/firebaseConfig';
import { updateProfile } from 'firebase/auth';

export const fetchData = async () => {
  try {
    const fullname = (await AsyncStorage.getItem('name')) ?? '';
    const workplace = (await AsyncStorage.getItem('workplace')) ?? '';
    const category = (await AsyncStorage.getItem('category')) ?? '';
    const expertiseValue = (await AsyncStorage.getItem('expertise')) ?? '';
    const expertiseInput = (await AsyncStorage.getItem('expertiseInput')) ?? '';
    const about = (await AsyncStorage.getItem('about')) ?? '';

    return {
      fullname,
      workplace,
      category,
      expertiseValue,
      expertiseInput,
      about,
    };
  } catch (error) {
    console.error('Error fetching data from AsyncStorage:', error.message);
    throw error;
  }
};

export const updateData = async (updatedData: any) => {
  try {
    const currentData = await fetchData();

    const newData = { ...currentData, ...updatedData };

    const updatedFields: Record<string, any> = {};    

    if (newData.fullname !== currentData.fullname){
      updatedFields['name'] = newData.fullname;
    }
    if (newData.workplace !== currentData.workplace) {
      updatedFields['workplace'] = newData.workplace;
    }
    if (newData.category !== currentData.category) {
      updatedFields['category'] = newData.category;
    }
    if (newData.expertiseValue !== currentData.expertiseValue) {
      updatedFields['expertise'] = newData.expertiseValue;
    }
    if (newData.about !== currentData.about) {
      updatedFields['about'] = newData.about;
    }
    if(newData.expertiseInput !== currentData.expertiseInput) {
      updatedFields['expertiseInput'] = newData.expertiseInput;      
    }

    await AsyncStorage.multiSet(Object.entries(updatedFields));    

    // Update data in Firestore
    if (updatedFields['name']) {
      const user = auth.currentUser;      

      if (user) {
        await updateProfile(user, { displayName: updatedFields['name'] });
      } else {
        console.error('Error updating display name:', error.message);
      }

    }
    delete updatedFields['name'];
    
    if (Object.keys(updatedFields).length > 0) {
      const docid = (await AsyncStorage.getItem('docid'));
      if(docid) {
        const userRef = db.collection('users').doc(docid);
        await userRef.update(updatedFields);
      }else {
        console.error('No docid found');
      }
    }
  } catch (error) {
    console.error('Error updating data in AsyncStorage:', error.message);
    throw error;
  }
};