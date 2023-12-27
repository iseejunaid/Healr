import React from 'react';
import { View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';


const ProfileScreen = () => {
    return (
        <View style={styles.container}>
          <Header text="Profile" RighticonName="settingsIcon" />
        </View>
      );
    };
    export default ProfileScreen;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.secondaryColor,
      },
    });