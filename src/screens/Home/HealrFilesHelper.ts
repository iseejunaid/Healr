import RNFS from 'react-native-fs';
import { db, storage } from '../../../configs/firebaseConfig';
import { fetchUserId } from '../chatScreens/ChatHelper';
import { Alert, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

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
        const externsion = name.split('.').pop();
        const uri = file.uri;
        const timestamp = Date.now();
        const filePath = `${RNFS.DocumentDirectoryPath}/${file.name}`;

        const uploadFileToStorage = async (localPath: string, fileName: string) => {
            const reference = storage.ref(`HealrFiles/${timestamp}` + `.${externsion}`);
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

export const formatDate = (date: Date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}

export const downloadFile = async (fileName: string,url: string,fileExtension:string, inform?: boolean) => {
    try {
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        const name = fileName;

        const filePath = `${dirToSave}/${name}`;
        if (inform) {
            Alert.alert('Download Started', 'Your file is being downloaded to your phone. You will be notified once the download is complete.');
        }
        const res = await RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: filePath,
                description: 'File downloaded by user',
            },
        }).fetch('GET', url);
        if (!inform) {
            openFile(filePath, fileExtension);
        }
    } catch (error) {
        console.error('An error occurred while downloading the file:', error);
    }
};

const getMIMEType = (fileExtension: string) => {
    switch (fileExtension) {
        case 'pdf':
            return 'application/pdf';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        case 'mp4':
            return 'video/mp4';
        case 'avi':
            return 'video/x-msvideo';
        case 'mov':
            return 'video/quicktime';
        default:
            return `application/${fileExtension}`;
    }
};

const openFile = (filePath:string, fileExtension:string) => {
    console.log('Opening file:', filePath);

    
    const mime = getMIMEType(fileExtension);

    if (Platform.OS === 'ios') {
      RNFetchBlob.ios.openDocument(filePath);
    } else {
      RNFetchBlob.android.actionViewIntent(filePath, mime)
        .then(() => {
          console.log('File opened successfully');
        })
        .catch((error) => {
          console.error('Error opening file:', error);
        });
    }
  };