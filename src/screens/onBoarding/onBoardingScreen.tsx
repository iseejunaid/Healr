import React, { useState } from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import * as onBoardingConstants from './onBoardingConstantData';


const onBoarding = () => {
  const onBoarding1H1 = onBoardingConstants.onBoarding1H1;
  const onBoarding1H2 = onBoardingConstants.onBoarding1H2;
  const onBoarding1P = onBoardingConstants.onBoarding1P;
  const onBoarding2H1 = onBoardingConstants.onBoarding2H1;
  const onBoarding2H2 = onBoardingConstants.onBoarding2H2;
  const onBoarding2P = onBoardingConstants.onBoarding2P;
  const onBoarding3H1 = onBoardingConstants.onBoarding3H1;
  const onBoarding3H2 = onBoardingConstants.onBoarding3H2;
  const onBoarding3P = onBoardingConstants.onBoarding3P;
  const onBoarding4H1 = onBoardingConstants.onBoarding4H1;
  const onBoarding4H2 = onBoardingConstants.onBoarding4H2;
  const onBoarding4P = onBoardingConstants.onBoarding4P;



  const [onBoardingH1, setOnBoardingH1] = useState(onBoarding1H1);
  const [onBoardingH2, setOnBoardingH2] = useState(onBoarding1H2);
  const [onBoardingP, setOnBoardingP] = useState(onBoarding1P);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>{onBoardingH1}</Text>
        <Text style={styles.h2}>{onBoardingH2}</Text>
      </View>
      <View style={styles.pictureContainer}>
      <Image
        style={styles.img}
        source={require('../../../assets/images/ob1.png')}
      />
      </View>
      <View style={styles.bodyTextContainer}>
        <Text style={styles.p}>{onBoardingP}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.ellipseContainer}>
        <Image
          style={styles.ellipseIcon}
          source={require('../../../assets/images/ellipseBlack.png')}
        />
        <Image
          style={styles.ellipseIcon}
          source={require('../../../assets/images/ellipseWhite.png')}
        />
        <Image
          style={styles.ellipseIcon}
          source={require('../../../assets/images/ellipseWhite.png')}
        />
        <Image
          style={styles.ellipseIcon}
          source={require('../../../assets/images/ellipseWhite.png')}
        />
        </View>
        <Text style={styles.skipbtntxt}>Skip</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor:'#90D1D4'
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
  p:{
    fontSize: 12,
    color: '#222831',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal:'11.2%',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ellipseContainer: {
    flexDirection: 'row',
  },
  ellipseIcon: {
    height: 8,
    width: 8,
    marginHorizontal:'0.4%',
  },
  skipbtntxt: {
    fontSize: 12,
    color: '#222831',
    fontFamily: 'Poppins-Regular',
    marginTop:'1.5%',
  },
});

export default onBoarding;
