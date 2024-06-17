import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db, storage } from "../../../../configs/firebaseConfig";
import { fetchUserId } from "../../chatScreens/ChatHelper";

interface VerificationData {
    country: string;
    fullName: string;
    nationalID: string;
    dob: string;
    frontImgPath: string;
    backImgPath: string;
    selfieImgPath: string;
}

const verificationData: VerificationData = {
    country: '',
    fullName: '',
    nationalID: '',
    dob: '',
    frontImgPath: '',
    backImgPath: '',
    selfieImgPath: '',
}
export { verificationData };

export const SubmitVerificationData = async () => {
    const { country, fullName, nationalID, dob, frontImgPath, backImgPath, selfieImgPath } = verificationData;
    const uid = await fetchUserId();
    try {
        const frontImgURL = await uploadImage(uid, frontImgPath, 'front');
        const backImgURL = await uploadImage(uid, backImgPath, 'back');
        const selfieImgURL = await uploadImage(uid, selfieImgPath, 'selfie');
        const data = {
            fullName,
            country,
            nationalID,
            dob,
            frontImgURL,
            backImgURL,
            selfieImgURL,
            createdAt: new Date(),
            phone: await AsyncStorage.getItem('phnNumber'),
            email: auth.currentUser?.email
        };
        await db.collection('verificationData').doc(uid).set(data);
        await updateStatusToPending(uid);
        console.log('Verification data submitted');
    } catch (error) {
        console.log('Error submitting verification data:', error);
    }
}

const uploadImage = async (uid: string, path: string, fileName: string) => {
    const reference = storage.ref(`VerificationImages/${uid}/${fileName}`);
    const response = await fetch(`file://${path}`);
    const blob = await response.blob();
    try {
        await reference.put(blob);
        const downloadURL = await reference.getDownloadURL();
        return downloadURL;
    } catch (error) {
        console.log('Error uploading file:', error);
        throw error;
    }
}

const updateStatusToPending = async (uid: string) => {
    const usersCollection = db.collection('users');
    const query = usersCollection.where('uid', '==', uid);

    query.get().then((querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                doc.ref.update({ verificationStatus: 'pending' })
                    .then(() => {
                        console.log('Document successfully updated!');
                    })
                    .catch((error) => {
                        console.error('Error updating document: ', error);
                    });
            });
        } else {
            console.log('No matching documents found.');
        }
    }).catch((error) => {
        console.error('Error getting documents: ', error);
    })
    AsyncStorage.setItem('verifiedStatus', 'pending');
}