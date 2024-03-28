import { db } from "../configs/firebaseConfig"; // Import your Firebase Firestore instance
import { getDocs, collection, query, where } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserData = async (user: object) => {
    const uid = user.uid;
    const name = user.displayName;
    var isIntern = false;
    var expertise = '';
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            isIntern = userData.isIntern;
            expertise = userData.expertise;
            if (expertise === 'unlisted') {
                expertise = userData.expertiseInput;
            }
        });

        try {
            await AsyncStorage.multiSet([
                ['isIntern', isIntern.toString()],
                ['name', name.toString()],
                ['expertise', expertise.toString()]
            ]);
        } catch (error) {
            console.error('Error storing data in AsyncStorage:', error.message);
        }


    } catch (error) {
        console.error('Error fetching Firestore data:', error.message);
    }
}
