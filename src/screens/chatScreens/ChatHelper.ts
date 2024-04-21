import { v4 as uuidv4 } from 'uuid';
import { auth, db, storage } from '../../../configs/firebaseConfig';
import { collection, deleteDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Image } from 'react-native-compressor';
import { requestContactsPermission } from '../../../helpers/permissions';
import Contacts from 'react-native-contacts';
import RNFS from 'react-native-fs';
import { copyFile } from '../HealrFilesScreens/HealrFilesHelper';

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
        } else if (fileType === 'audio') {
            resizedFile = file.path;
        }
        var blob = null;
        if (fileType !== 'audio') {
            const response = await fetch(resizedFile);
            blob = await response.blob();
        } else {
            blob = new Blob([resizedFile], { type: 'audio/mp3' });
        }
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

export const sendDocument = async (data: any, receiver: string) => {
    try {
        const file = data[0];
        const fileType = 'document';
        const name = file.name;
        const uri = file.uri;
        const timestamp = Date.now();
        const extension = name.split('.').pop();
        const filePath = `${RNFS.DocumentDirectoryPath}/${name}`;

        const uploadFileToStorage = async (localPath: string) => {
            const uploadedFileName = timestamp + '.' + extension;
            const reference = storage.ref(`documents/${uploadedFileName}`);
            const response = await fetch(`file://${localPath}`);
            const blob = await response.blob();
            try {
                await reference.put(blob);
                const downloadURL = await reference.getDownloadURL();
                const msg = composeMsg(downloadURL, receiver, fileType, name, extension);
                db.collection('chats').doc(msg._id).set(msg);

            } catch (error) {
                console.log('Error uploading file:', error);
                throw error;
            }
        };
        await copyFile(uri, filePath);
        await uploadFileToStorage(filePath);


    } catch (error) {
        console.log(error);
    }
};

export const composeMsg = (text: string, receiver: string, type: string, name?: string, extension?: string) => {
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
        case 'document':
            const docMsg = {
                _id: uuidv4(),
                receiver_id: receiver,
                createdAt,
                document: text,
                documentName: name,
                documentExtension: extension,
                user: { _id: auth?.currentUser?.uid },
            };
            return docMsg;
        case 'audio':
            const audioMsg = {
                _id: uuidv4(),
                receiver_id: receiver,
                createdAt,
                audio: text,
                user: { _id: auth?.currentUser?.uid },
            };
            return audioMsg;
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
    const { receiver_id, image, video, audio, document, text, createdAt, user: { _id: senderId } } = doc.data();

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
            else if (audio) {
                chatData[receiver_id].text = "you: Audio";
            }
            else if (document) {
                chatData[receiver_id].text = "you: Document";
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
                else if (audio) {
                    chatData[senderId].text = "Audio";
                }
                else if (document) {
                    chatData[senderId].text = "Document";
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
            else if (audio) {
                chatData[senderId].text = "Audio";
            }
            else if (document) {
                chatData[senderId].text = "Document";
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

export const fetchUserId = async () => {
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
    const usersRef = collection(db, 'users');
    const dbContacts = query(usersRef, orderBy('name'));
    try {
        const querySnapshot = await getDocs(dbContacts);
        const contacts = querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            phnNumber: doc.data().phnNumber,
            expertise: doc.data().expertise,
            expertiseInput: doc.data().expertiseInput ? doc.data().expertiseInput : null,
            photoURL: doc.data().photoURL ? doc.data().photoURL : null,
            receiverId: doc.data().uid,
            status: doc.data().status,
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
            localContacts.sort((a, b) => a.name.localeCompare(b.name));
            return localContacts
        } else {
            console.log('Contacts permission denied');
            return [];
        }
    } catch (error) {
        console.error('Permission error: ', error);
        return [];
    }
};

export const deleteChat = async (receiverId: string, userId?: string) => {
    if (!userId) {
        userId = await fetchUserId();
    }
    try {
        const chatsCollection = collection(db, 'chats');

        const q = query(
            chatsCollection,
            where('receiver_id', '==', receiverId),
            where('user._id', '==', userId)
        );
        const q2 = query(
            chatsCollection,
            where('receiver_id', '==', userId),
            where('user._id', '==', receiverId)
        );

        const querySnapshot = await getDocs(q);
        const querySnapshot2 = await getDocs(q2);

        const deletePromises = [];

        querySnapshot.forEach((doc) => {
            deletePromises.push(deleteDoc(doc.ref));
        });

        querySnapshot2.forEach((doc) => {
            deletePromises.push(deleteDoc(doc.ref));
        });

        await Promise.all(deletePromises);
        console.log('Chat deleted');

    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error; // re-throw the error to be caught by the onOptionClick function
    }
};

export const fetchReceiverData = async (receiverId: string) => {
    const userQ = query(collection(db, 'users'), where('uid', '==', receiverId));
    let expertise = '';
    let expertiseInput = ''
    let expertiseToDisplay = '';
    let about = '';
    let workplace = ''

    try {
        const userSnapshot = await getDocs(userQ);
        userSnapshot.forEach(doc => {
            let userData = doc.data();
            expertise = userData.expertise;
            expertiseInput = userData.expertiseInput;
            about = userData.about;
            workplace = userData.workplace;
        });
        if (expertiseInput) {
            expertiseToDisplay = expertiseInput;
        } else {
            expertiseToDisplay = expertise;
        }
        if (!workplace) {
            workplace = 'Not specified';
        }
        return { expertiseToDisplay, about, workplace };
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

