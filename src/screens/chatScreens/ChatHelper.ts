import { v4 as uuidv4 } from 'uuid';
import { auth, db, storage } from '../../../configs/firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Image } from 'react-native-compressor';
import { requestContactsPermission } from '../../../helpers/permissions';
import Contacts from 'react-native-contacts';

export const sendMedia = async (data: any, receiver: string) => {
    try {
        const file = data[0];
        const fileType = file.mime.split('/')[0];

        let resizedFile;
        if (fileType === 'image') {
            const resizedImage = await Image.compress(file.path, { quality: 0.5 });
            resizedFile = resizedImage;
        } else if (fileType === 'video') {
            resizedFile = file.path;
        }

        const response = await fetch(resizedFile);
        const blob = await response.blob();

        const timestamp = Date.now();
        const storageRef = ref(storage, `media/${timestamp}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.log('Upload Error: ', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const msg = composeMsg(downloadURL, receiver, fileType);
                    db.collection('chats').doc(msg._id).set(msg);
                });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export const composeMsg = (text: string, receiver: string, type: string) => {
    const createdAt = new Date();
    switch (type) {
        case 'image':
            const msg = {
                _id: uuidv4(),
                receiver_id: receiver,
                createdAt,
                image: text,
                user: { _id: auth?.currentUser?.uid },
            };
            return msg;
        case 'video':
            const videoMsg = {
                _id: uuidv4(),
                receiver_id: receiver,
                createdAt,
                video: text,
                user: { _id: auth?.currentUser?.uid },
            };
            return videoMsg;
        default: {
            const msg = {
                _id: uuidv4(),
                receiver_id: receiver,
                createdAt,
                text,
                user: { _id: auth?.currentUser?.uid },
            };
            return msg;
        }
    }
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


const updateChatsData = async (doc: any, role: string, chatData: ChatData) => {
    const { receiver_id, image, video, text, createdAt, user: { _id: senderId } } = doc.data();

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
            if (image) {
                chatData[receiver_id].text = "you: Image";
            }
            else if (video) {
                chatData[receiver_id].text = "you: Video";
            }
            else {
                chatData[receiver_id].text = "you: " + text;
            }
            chatData[receiver_id].createdAt = createdAt;
        }
    } else if (role === 'receiver') {

        if (chatData[senderId]) {
            if (chatData[senderId].createdAt < createdAt) {
                if (image) {
                    chatData[senderId].text = "Image";
                }
                else if (video) {
                    chatData[senderId].text = "Video";
                }
                else {
                    chatData[senderId].text = text;
                }
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
            if (image) {
                chatData[senderId].text = "Image";
            }
            else if (video) {
                chatData[senderId].text = "Video";
            }
            else {
                chatData[senderId].text = text;
            }
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
        return { name, profilepic, status };
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

const fetchUserId = async () => {
    return await AsyncStorage.getItem('uid') ?? '';
};

export const fetchContacts = async () => {
    const dbContacts = await fetchDbContacts();
    const localContacts = await fetchLocalContacts();
    
    const HealrContacts = dbContacts.filter(dbContact => 
        localContacts.some(localContact => localContact.phoneNumber === dbContact.phnNumber)
    );
    const invitableContacts = localContacts.filter((contact) => 
        !dbContacts.some(dbContact => dbContact.phnNumber === contact.phoneNumber))
    
    return { HealrContacts, invitableContacts };
};

const fetchDbContacts = async () => {
    const dbContacts = collection(db, 'users');
    try {
        const querySnapshot = await getDocs(dbContacts);
        const contacts = querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            phnNumber: doc.data().phnNumber,
            expertise: doc.data().expertise,
            expertiseInput: doc.data().expertiseInput ? doc.data().expertiseInput : null,
            photoURL: doc.data().photoURL ? doc.data().photoURL : null,
        }));
        return contacts;
    } catch (error) {
        console.error('Error retrieving phone numbers: ', error);        
        return [];
    }
};

const fetchLocalContacts = async () => {
    try {
        const granted = await requestContactsPermission();
        if (granted) {
            const contacts = await Contacts.getAll();
            const localContacts = contacts.map((contact) => ({
                name: contact.displayName,
                phoneNumber: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : '',
            }));
            return localContacts;
        } else {
            console.log('Contacts permission denied');
            return [];
        }
    } catch (error) {
        console.error('Permission error: ', error);
        return [];
    }
};
