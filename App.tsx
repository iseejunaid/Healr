import React from 'react';
import OnBoardingScreen from './src/screens/onBoarding/onBoardingScreen';
import { View, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <OnBoardingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
