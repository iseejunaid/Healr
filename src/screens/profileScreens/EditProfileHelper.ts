import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../../configs/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { storage } from '../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


export const fetchData = async () => {
  try {
    const fullname = (await AsyncStorage.getItem('name')) ?? '';
    const phnNumber= (await AsyncStorage.getItem('phnNumber')) ?? '';
    const photoURL = (await AsyncStorage.getItem('photoURL')) ?? '';
    const workplace = (await AsyncStorage.getItem('workplace')) ?? '';
    const category = (await AsyncStorage.getItem('category')) ?? '';
    const expertiseValue = (await AsyncStorage.getItem('expertise')) ?? '';
    const expertiseInput = (await AsyncStorage.getItem('expertiseInput')) ?? '';
    const about = (await AsyncStorage.getItem('about')) ?? '';


    return {
      fullname,
      phnNumber,
      photoURL,
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

    if (newData.fullname !== currentData.fullname) {
      updatedFields['name'] = newData.fullname;
    }
    if (newData.phnNumber !== currentData.phnNumber) {
      updatedFields['phnNumber'] = newData.phnNumber;
    }
    if (newData.photoURL !== currentData.photoURL) {
      updatedFields['photoURL'] = newData.photoURL;
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
    if (newData.expertiseInput !== currentData.expertiseInput) {
      updatedFields['expertiseInput'] = newData.expertiseInput;
    }

    await AsyncStorage.multiSet(Object.entries(updatedFields));

    // Update data in Firestore
    const user = auth.currentUser;
    if (updatedFields['name']) {
      if (user) {
        await updateProfile(user, { displayName: updatedFields['name'] });
      } else {
        console.error('Error updating display name:', error.message);
      }
    }

    if (updatedFields['photoURL']) {
      try {
        const url = await uploadImage(updatedFields['photoURL'], user);
        if (url) {
          updatedFields['photoURL'] = url;
        } else {
          console.log('Error uploading image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      const docid = (await AsyncStorage.getItem('docid'));
      if (docid) {
        const userRef = db.collection('users').doc(docid);
        await userRef.update(updatedFields);
      } else {
        console.error('No docid found');
      }
    }
  } catch (error) {
    console.error('Error updating data in AsyncStorage:', error.message);
    throw error;
  }
};

export const uploadImage = async (uri: any, user: any) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "profileImages/" + user.uid);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.log("Upload Error: ", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await updateProfile(user, { photoURL: downloadURL });
              await AsyncStorage.setItem("photoURL", downloadURL);
              resolve(downloadURL);
            })
            .catch((error) => {
              console.log("Error getting download URL: ", error);
              reject(error);
            });
        }
      );
    });
  } catch (error) {
    console.log("Fetch Error: ", error);
    throw error;
  }
};
