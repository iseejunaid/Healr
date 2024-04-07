import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../../../configs/firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const composeMsg = (text: string,receiver:string) => {
    const createdAt = new Date();
    const msg = {
        _id: uuidv4(),
        receiver_id: receiver,
        createdAt,
        text,
        user: { _id: auth?.currentUser?.uid },
    };
    return msg;
};

export interface ChatData {
    [key: string]: {
        profilepic: string;
        name: string;
        text: string;
        status: string;
        createdAt: any;
    };
}

export const fetchChats = async () => {
    var chatData = {};
    const userId = await fetchUserId();
    
    const chatsCollection = collection(db, 'chats');    
    
    const senderQ = query(chatsCollection, where('user._id', '==', userId), orderBy('createdAt', 'desc'));
    const senderSnapshot = await getDocs(senderQ);

    const receiverQ = query(chatsCollection, where('receiver_id', '==', userId), orderBy('createdAt', 'desc'));
    const receiverSnapshot = await getDocs(receiverQ);

    for (const doc of senderSnapshot.docs) {
        await updateChatsData(doc, 'sender', chatData);
    }

    for (const doc of receiverSnapshot.docs) {
        await updateChatsData(doc, 'receiver', chatData);
    }
    return chatData;
};


const updateChatsData = async (doc: any, role: string,chatData:ChatData) => {
    const { receiver_id, text, createdAt, user: { _id: senderId } } = doc.data();
    
    if (role === 'sender') {
        if (chatData[receiver_id]) {
            // receiverId already exists
        } else {            
            chatData[receiver_id] = {
                profilepic: "",
                name: "",
                text: "",
                status: "",
                createdAt: null,
            };
            const userData = await fetchUser(receiver_id);

            const name = userData ? userData.name : '';
            const profilepic = userData ? userData.profilepic : '';
            const status = userData ? userData.status : '';

            chatData[receiver_id].name = name;
            chatData[receiver_id].profilepic = profilepic;
            chatData[receiver_id].status = status;
            chatData[receiver_id].text = "you: " + text;
            chatData[receiver_id].createdAt = createdAt;            
        }
    } else if (role === 'receiver') {

        if (chatData[senderId]) {                 
            if (chatData[senderId].createdAt < createdAt) {                
                chatData[senderId].text = text;
                chatData[senderId].createdAt = createdAt;
            }
        } else {

            chatData[senderId] = {
                profilepic: "",
                name: "",
                text: "",
                status: "",
                createdAt: null,
            };
            
            const userData = await fetchUser(senderId);
            const name = userData ? userData.name : '';
            const profilepic = userData ? userData.profilepic : '';
            const status = userData ? userData.status : '';
            
            chatData[senderId].name = name;
            chatData[senderId].profilepic = profilepic;
            chatData[senderId].status = status;
            chatData[senderId].text = text;
            chatData[senderId].createdAt = createdAt;
        }
    }    
};

const fetchUser = async (id: string) => {    
    const userQ = query(collection(db, 'users'), where('uid', '==', id));
    let name = '';
    let profilepic = '';
    let status = '';

    try {
        const userSnapshot = await getDocs(userQ);
        userSnapshot.forEach(doc => {
            let userData = doc.data();            
            status = userData.status;
            name = userData.name;
            profilepic = userData.photoURL;            
        });
        return { name, profilepic, status};
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

const fetchUserId = async () => {
    return await AsyncStorage.getItem('uid') ?? '';
};
