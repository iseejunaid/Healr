import { PermissionsAndroid, Platform } from 'react-native';

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestContactsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Permission error: ', error);
    return false;
  }
};

export const requestaudioPermission = async () => {
  const atLeastAndroid13 = Platform.OS === 'android' && Platform.Version >= 33;
  
  const permissions = atLeastAndroid13
    ? [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO]
    : [
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ];

  try {
    const grants = await PermissionsAndroid.requestMultiple(permissions);
    const allPermissionsGranted = Object.values(grants).every(
      (result) => result === PermissionsAndroid.RESULTS.GRANTED
    );

    if (!allPermissionsGranted) {
      console.log('All required permissions not granted');
      return false;
    }
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
