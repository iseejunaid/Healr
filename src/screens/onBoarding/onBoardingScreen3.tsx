import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import * as onBoardingConstants from './onBoardingConstantData';

const OnBoardingScreen3 = () => {
  const onBoarding3H1 = onBoardingConstants.onBoarding3H1;
  const onBoarding3H2 = onBoardingConstants.onBoarding3H2;
  const onBoarding3P = onBoardingConstants.onBoarding3P;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>{onBoarding3H1}</Text>
        <Text style={styles.h2}>{onBoarding3H2}</Text>
      </View>
      <View style={styles.pictureContainer}>
        <Image
          style={styles.img}
          source={require('../../../assets/images/ob3.png')}
        />
      </View>
      <View style={styles.bodyTextContainer}>
        <Text style={styles.p}>{onBoarding3P}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#90D1D4',
  },
  headerContainer: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  h1: {
    fontSize: 32,
    color: '#222831',
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 37,
  },
  h2: {
    fontSize: 16,
    color: '#222831',
    fontFamily: 'Poppins-Regular',
  },
  pictureContainer: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 700,
    height: 550,
    resizeMode: 'contain',
  },
  bodyTextContainer: {
    flex: 0.2,
    width: '100%',
  },
  p: {
    fontSize: 12,
    color: '#222831',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: '11.2%',
    textAlign: 'center',
  },
});

export default OnBoardingScreen3;
