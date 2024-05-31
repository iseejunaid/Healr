import RNFS from 'react-native-fs';
import { db, storage } from '../../../configs/firebaseConfig';
import { fetchUserId } from '../chatScreens/ChatHelper';
import { Alert, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

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
        const extension = name.split('.').pop();
        const uri = file.uri;
        const timestamp = Date.now();
        const filePath = `${RNFS.DocumentDirectoryPath}/${name}`;

        const uploadFileToStorage = async (localPath: string, fileName: string) => {
            const uploadedFileName = timestamp + '.' + extension;
            const reference = storage.ref(`HealrFiles/${uploadedFileName}`);
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
                    uploadedFileName: uploadedFileName,
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

export const copyFile = async (src: string, dest: string) => {
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
                uploadedFileName: data.uploadedFileName,
            });
        });

        return filesData;
    } catch (error) {
        console.log('Error fetching files:', error);
        throw error;
    }
};

export const renameFile = async (fileId: string, newName: string) => {
    const uid = await fetchUserId();
    try {
        const fileRef = db.collection('fileReferences').doc(uid).collection('files').doc(fileId);
        await fileRef.update({
            name: newName
        });
        console.log(`File ${fileId} renamed to ${newName}`);
    } catch (error) {
        console.log(`Error renaming file ${fileId}:`, error);
        throw error;
    }
};

export const deleteFile = async (fileId: string, uploadedFileName: string) => {
    const uid = await fetchUserId();
    try {
        // Delete from Firestore
        const fileRef = db.collection('fileReferences').doc(uid).collection('files').doc(fileId);
        await fileRef.delete();

        // Delete from Firebase Storage
        const storageRef = storage.ref(`HealrFiles/${uploadedFileName}`);
        await storageRef.delete();

        console.log(`File ${fileId} deleted successfully`);


    } catch (error) {
        console.log(`Error deleting file ${fileId}:`, error);
        throw error;
    }
};


export const formatDate = (date: Date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}

export const downloadFile = async (fileName: string, url: string) => {
    try {
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        const name = fileName;

        const filePath = `${dirToSave}/${name}`;
        const fileExists = await RNFetchBlob.fs.exists(filePath);

        if (fileExists) {
            console.log(`File '${fileName}' is already downloaded.`);
            Alert.alert('File downloaded', 'File is already downloaded.')
            return;
        } else {
            console.log(`File '${fileName}' is not downloaded.`);
            Alert.alert('Downloading file', 'File is being downloaded.')
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
    } catch (error) {
        console.error('An error occurred while downloading the file:', error);
    }
};

export const openFile = async (filePath: string,fileName:string,ext:string,setLoading:Function) => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`+`.${ext}`;

    if(await RNFS.exists(localFile)){
        console.log('File already exists');
        setLoading(false);
        FileViewer.open(localFile)
        return;
    }

    const options = {
        fromUrl: filePath,
        toFile: localFile,
    };
    console.log('Downloading file:', filePath);
    
    RNFS.downloadFile(options)
        .promise
        .then(() => {
            console.log('File downloaded successfully');
            FileViewer.open(localFile)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error downloading file:', error);
        });

};

export const splitFileNameAndExt = (fileName: string) => {
    const lastIndex = fileName.lastIndexOf('.');
    const renameAbleFilename = lastIndex !== -1 ? fileName.slice(0, lastIndex) : fileName;
    const ext = lastIndex !== -1 ? fileName.slice(lastIndex + 1) : '';

    return { renameAbleFilename, ext };
};



