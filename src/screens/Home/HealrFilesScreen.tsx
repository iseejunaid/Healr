import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/colors';

const HealrFilesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header text="Healr Files" RighticonName="dotsIcon" />
    </View>
  );
};
export default HealrFilesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
});
