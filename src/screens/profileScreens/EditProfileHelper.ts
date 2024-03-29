import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../../configs/firebaseConfig';
import { updateProfile } from 'firebase/auth';

export const fetchData = async () => {
  try {
    const fullname = (await AsyncStorage.getItem('name')) ?? '';
    const workplace = (await AsyncStorage.getItem('workplace')) ?? '';
    const category = (await AsyncStorage.getItem('category')) ?? '';
    const expertiseValue = (await AsyncStorage.getItem('expertise')) ?? '';
    const about = (await AsyncStorage.getItem('about')) ?? '';

    const [firstname, lastname] = fullname.split(' ');

    return {
      firstname,
      lastname,
      workplace,
      category,
      expertiseValue,
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

    if (newData.firstname !== currentData.firstname || newData.lastname !== currentData.lastname) {
      updatedFields['name'] = `${newData.firstname} ${newData.lastname}`;
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

    // await AsyncStorage.multiSet(Object.entries(updatedFields));

    // Update data in Firestore
    const uid = await AsyncStorage.getItem('uid');

    if (updatedFields['name']) {
      const user = auth.currentUser;

      if (user) {
        // await updateProfile(user, { displayName: updatedFields['name'] });
        console.log('Display name updated successfully:', updatedFields['name']);
      } else {
        console.error('Error updating display name:', error.message);
      }

    }
    delete updatedFields['name'];
    
    if (Object.keys(updatedFields).length > 0) {
      console.log('Updated fields:', updatedFields);
    } else {
      console.log('No fields to update');
    }
    


    // const userRef = db.collection('users').doc(uid);
    // await userRef.update(updatedFields);

  } catch (error) {
    console.error('Error updating data in AsyncStorage:', error.message);
    throw error;
  }
};