import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../../../configs/firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import ProfileScreen from '../profileScreens/ProfileScreen';

const userId = auth?.currentUser?.uid;

export const composeMsg = (text: string) => {
    const createdAt = new Date();
    const msg = {
        _id: uuidv4(),
        receiver_id: 1,
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
        createdAt: any;
    };
}
let chatData: ChatData = {};

export const fetchChats = async () => {
    chatData = {};
    const chatsCollection = collection(db, 'chats');

    const senderQ = query(chatsCollection, where('user._id', '==', userId), orderBy('createdAt', 'desc'));
    const senderSnapshot = await getDocs(senderQ);

    const receiverQ = query(chatsCollection, where('receiver_id', '==', userId), orderBy('createdAt', 'desc'));
    const receiverSnapshot = await getDocs(receiverQ);

    senderSnapshot.docs.forEach(doc => updateChatsData(doc, 'sender'));
    receiverSnapshot.docs.forEach(doc => updateChatsData(doc, 'receiver'));

    return chatData;
};

const updateChatsData = async (doc: any, role: string) => {
    const { receiver_id, text, createdAt, user: { _id: senderId } } = doc.data();

    if (role === 'sender') {
        if (chatData[receiver_id]) {
            //receiverId already exists
        } else {
            chatData[receiver_id] = {
                profilepic: "",
                name: "",
                text: "",
                createdAt: null,
            };
            const { name, profilepic } = await fetchUser(receiver_id) || { name: '', profilepic: '' };
            chatData[receiver_id].name = name;
            chatData[receiver_id].profilepic = profilepic;
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
                createdAt: null,
            };
            chatData[senderId].text = text;
            chatData[senderId].createdAt = createdAt;
        }
    }
};

const fetchUser = async (id: string) => {
    const userQ = query(collection(db, 'users'), where('uid', '==', id));
    let name = '';
    let profilepic = '';

    try {
        const userSnapshot = await getDocs(userQ);
        userSnapshot.forEach(doc => {
            let userData = doc.data();
            name = userData.name;
            profilepic = userData.profilepic;
        });
        return { name, profilepic };
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};
