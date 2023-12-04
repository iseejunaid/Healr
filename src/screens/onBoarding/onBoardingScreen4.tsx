import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import * as onBoardingConstants from './onBoardingConstantData';
import Fonts from '../../../assets/fonts/fonts';

const OnBoardingScreen4 = () => {
  const onBoarding4H1 = onBoardingConstants.onBoarding4H1;
  const onBoarding4H2 = onBoardingConstants.onBoarding4H2;
  const onBoarding4P = onBoardingConstants.onBoarding4P;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>{onBoarding4H1}</Text>
        <Text style={styles.h2}>{onBoarding4H2}</Text>
      </View>
      <View style={styles.pictureContainer}>
        <Image
          style={styles.img}
          source={require('../../../assets/images/ob4.png')}
        />
      </View>
      <View style={styles.bodyTextContainer}>
        <Text style={styles.p}>{onBoarding4P}</Text>
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
    fontFamily: Fonts.semiBold,
    lineHeight: 37,
  },
  h2: {
    fontSize: 16,
    color: '#222831',
    fontFamily: Fonts.regular,
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
    fontFamily: Fonts.regular,
    paddingHorizontal: '11.2%',
    textAlign: 'center',
  },
});

export default OnBoardingScreen4;
