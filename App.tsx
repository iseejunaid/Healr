import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.2,width:'100%',justifyContent:'flex-end',alignItems:'center'}}>
        <Text style={styles.heading1}>Welcome to Healr</Text>
        <Text style={styles.heading2}>Connect, Collaborate, and Care</Text>
      </View>
      <View style={{backgroundColor:'blue',flex: 0.4,width:'100%'}}>
      </View>
      <View style={{backgroundColor:'green',flex: 0.2,width:'100%'}}>
      </View>
      <View style={{backgroundColor:'red',flex:0.2,width:'100%'}}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#90D1D4'
  },
  heading1:{
    fontSize: 32,
    fontFamily:'Poppins-SemiBold',
    color: 'black'
  },
  heading2:{
    fontSize: 16,
    fontFamily:'Poppins-Regular',
    color: 'black'
  }
});

export default App;
