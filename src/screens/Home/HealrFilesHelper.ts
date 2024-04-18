import RNFS from 'react-native-fs';
import { db, storage } from '../../../configs/firebaseConfig';
import { fetchUserId } from '../chatScreens/ChatHelper';
import { Alert } from 'react-native';

export const uploadFile = async (data: any) => {
    const uid = await fetchUserId();
    try {
        const file = data[0];
        let fileType = '';

        if (file.type.includes('image')) {
            fileType = 'Image';
        } else if (file.type.includes('video')) {
            fileType = 'Video';
        } else if (file.type.includes('pdf')) {
            fileType = 'pdf';
        } else if (file.type.includes('text')) {
            fileType = 'text';
        } else {
            fileType = file.type.split('/')[0];
        }
        const date = new Date().toISOString();
        const name = file.name;
        const uri = file.uri;
        const timestamp = Date.now();
        const filePath = `${RNFS.DocumentDirectoryPath}/${file.name}`;

        const uploadFileToStorage = async (localPath: string, fileName: string) => {
            const reference = storage.ref(`HealrFiles/${timestamp}`);
            const response = await fetch(`file://${localPath}`);
            const blob = await response.blob();
            try {
                await reference.put(blob);
                const downloadURL = await reference.getDownloadURL();

                const fileData = {
                    name: fileName,
                    type: fileType,
                    date: date,
                    url: downloadURL,
                };
                await db.collection('fileReferences').doc(uid).collection('files').doc(timestamp.toString()).set(fileData);
            } catch (error) {
                console.log('Error uploading file:', error);
                throw error;
            }
        };
        await copyFile(uri, filePath);
        await uploadFileToStorage(filePath, name);

        Alert.alert("Success", 'File uploaded successfully');
    } catch (err) {
        console.log(err);
    }
};

const copyFile = async (src: string, dest: string) => {
    try {
        await RNFS.copyFile(src, dest);
    } catch (error) {
        console.log('Error copying file:', error);
        throw error;
    }
};

export const fetchFiles = async () => {
    const uid = await fetchUserId();
    try {
        const snapshot = await db.collection('fileReferences').doc(uid).collection('files').get();
        const filesData: any[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            filesData.push({
                id: doc.id,
                name: data.name,
                type: data.type,
                date: data.date,
                url: data.url,
            });
        });

        return filesData;
    } catch (error) {
        console.log('Error fetching files:', error);
        throw error;
    }
};

export const formatDate = (date:Date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}
