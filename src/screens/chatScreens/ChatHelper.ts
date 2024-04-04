import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../../../configs/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

const chatData = {
     
};

export const fetchChats = async () => {
    const chatsCollection = collection(db, 'chats');

    const senderQ = query(chatsCollection, where('user._id', '==', userId));
    const senderSnapshot = await getDocs(senderQ);

    const receiverQ = query(chatsCollection, where('receiver_id', '==', userId));
    const receiverSnapshot = await getDocs(receiverQ);

    senderSnapshot.docs.forEach(doc => updateChatsData(doc, 'sender'));
    receiverSnapshot.docs.forEach(doc => updateChatsData(doc, 'receiver'));
};

const updateChatsData = (doc: any, role: string) => {
    const { receiver_id, text, createdAt } = doc.data();
    
    if (role === 'sender') {
        if (chatData[receiver_id]) {
            console.log(`Receiver with ID ${receiver_id} already exists in chatData`);
        } else {
            chatData[receiver_id] = {
                text: [],
                createdAt: []
            };
            chatData[receiver_id].text.push(text);
            chatData[receiver_id].createdAt.push(createdAt);
        }
    } else if (role === 'receiver') {
        // Add receiver-specific logic if needed
    }
    console.log(chatData);
};
