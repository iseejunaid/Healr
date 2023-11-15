import React, {Component} from 'react';
import {View, Text, ViewStyle, TextStyle, StyleProp} from 'react-native';
import Swiper from 'react-native-swiper';
import OnBoardingScreen1 from './onBoardingScreen1';
import OnBoardingScreen2 from './onBoardingScreen2';
import OnBoardingScreen3 from './onBoardingScreen3';
import OnBoardingScreen4 from './onBoardingScreen4';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {}

interface State {}

const renderPagination = (
  index: number,
  total: number,
): React.ReactElement => {
  let dots: React.ReactElement[] = [];
  const ActiveDot = (
    <View
      style={{
        backgroundColor: '#222831',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  );
  const Dot = (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  );
  for (let i = 0; i < total; i++) {
    dots.push(
      i === index
        ? React.cloneElement(ActiveDot, {key: i})
        : React.cloneElement(Dot, {key: i}),
    );
  }
  const btnHanlder = () => {
    if (index === 3) {
      console.log('Next');
    } else {
      console.log('Skip');
    }
  };

  return (
    <View style={styles.dotsContainer}>
      <View style={{ flexDirection: 'row' }}>{dots}</View>
      <TouchableOpacity style={styles.btn}
      onPress={btnHanlder}>
                {index === 3 ? (
                  <Text style={styles.btntxt}>Next</Text>
                ) : (
                  <Text style={styles.btntxt}>Skip</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        };

        export default class App extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Swiper loop={false} renderPagination={renderPagination}>
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
  }
}

const styles: {
  container: ViewStyle;
  slide: ViewStyle;
  dotsContainer: ViewStyle;
  btn: ViewStyle;
  btntxt: TextStyle;
} = {
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
  btn: {
    top: '30%',
  },
  btntxt: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    marginTop: '1%',
  },
};
