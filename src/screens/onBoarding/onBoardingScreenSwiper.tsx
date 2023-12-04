import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import Fonts from '../../../assets/fonts/fonts';
import OnBoardingScreen1 from './onBoardingScreen1';
import OnBoardingScreen2 from './onBoardingScreen2';
import OnBoardingScreen3 from './onBoardingScreen3';
import OnBoardingScreen4 from './onBoardingScreen4';

const OnBoardingSwiper = ({navigation}: {navigation: any}) => {
  const renderPagination = (index: number, total: number) => {
    const dots = [];
    const ActiveDot = (
      <View style={styles.activeDot} key={`activeDot-${index}`} />
    );

    for (let i = 0; i < total; i++) {
      dots.push(
        i === index ? (
          React.cloneElement(ActiveDot)
        ) : (
          <View style={styles.dot} key={`dot-${i}`} />
        ),
      );
    }

    const btnHandler = () => {
      navigation.navigate('LoginScreen');
    };

    return (
      <View style={styles.dotsContainer}>
        <View style={styles.dotRow}>{dots}</View>
        <TouchableOpacity style={styles.btn} onPress={btnHandler}>
          <Text style={styles.btnText}>{index === 3 ? 'Next' : 'Skip'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        renderPagination={(index, total) => renderPagination(index, total)}>
        <View style={styles.slide}>
          <OnBoardingScreen1 />
        </View>
        <View style={styles.slide}>
          <OnBoardingScreen2 />
        </View>
        <View style={styles.slide}>
          <OnBoardingScreen3 />
        </View>
        <View style={styles.slide}>
          <OnBoardingScreen4 />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center',
  },
  dotRow: {
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    marginVertical: 3,
  },
  activeDot: {
    backgroundColor: '#222831',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    marginVertical: 3,
  },
  btn: {
    top: '30%',
  },
  btnText: {
    fontSize: 12,
    color: 'black',
    fontFamily: Fonts.regular,
    alignSelf: 'center',
    marginTop: '1%',
  },
});

export default OnBoardingSwiper;
