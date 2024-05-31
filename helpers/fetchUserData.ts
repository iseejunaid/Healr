import {db} from '../configs/firebaseConfig'; // Import your Firebase Firestore instance
import {getDocs, collection, query, where} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';

export const fetchUserData = async (user: object,token:string,navigation:any) => {

  const uid = user.uid;
  const photoURL = user.photoURL;
  const name = user.displayName;
  var docid = '';
  var category = '';
  var phnNumber = '';
  var expertise = '';
  var expertiseInput = '';
  var workplace = '';
  var status = '';
  var about = '';
  var isVerified = false;
    
  try {    
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const userData = doc.data();
      
      docid = doc.id;      
      category = userData.category;
      phnNumber = userData.phnNumber;
      expertise = userData.expertise;
      if (userData.expertiseInput) {
        expertiseInput = userData.expertiseInput;
      }
      if (userData.workplace) {
        workplace = userData.workplace;
      }
      status = userData.status;
      about = userData.about;
      isVerified = userData.isVerified;
    });

    try {
      const dataToStore = [
        ['loggedIn', true.toString()],
        ['token', token.toString()],
        ['uid', uid.toString()],
        ['docid', docid.toString()],
        ['name', name.toString()],
        ['category', category.toString()],
        ['phnNumber', phnNumber.toString()],
        ['expertise', expertise.toString()],
        ['status', status.toString()],
        ['about', about.toString()],
        ['isVerified', isVerified.toString()],
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
      initZego(uid,name,navigation);
      
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error.message);
    }
  } catch (error) {
    console.error('Error fetching Firestore data:', error.message);
  }
};

const initZego = (userId:string,userName:string,navigation:any) =>{
  ZegoUIKitPrebuiltCallService.init(
    610729301,
    "0d499d4cb395f5474c0b4d07754f8100dbfcdd44c2f37227d8d87bcc3a26b3c5",
    userId,
    userName,
    [ZIM, ZPNs],
    {
      ringtoneConfig: {
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      notifyWhenAppRunningInBackgroundOrQuit: true,
      androidNotificationConfig: {
        channelID: "zego_video_call",
        channelName: "zego_video_call",
      },
      requireConfig: (data:any)=>{
        return{
          onHangUp:(duration:any)=>{
            console.log("Hangup Called", duration);
            navigation.navigate('HomeScreen');
          }
        }
      }
    }
  )
}