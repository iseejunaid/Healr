import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Colors from '../../../assets/colors/colors';

interface CircleComponentProps {
  focused: boolean;
  iconName: string;
}

const CircleComponent: React.FC<CircleComponentProps> = ({
  focused,
  iconName,
}) => {
  const iconsize = 30;

  const renderImage = () => {
    switch (iconName) {
      case 'messageIcon':
        return require('../../../assets/images/messageIcon.png');
      case 'healrFilesIcon':
        return require('../../../assets/images/healrFilesIcon.png');
      case 'profileIcon':
        return require('../../../assets/images/profileIcon.png');
      default:
        return require('../../../assets/images/messageIcon.png');
    }
  };

  return (
    <View>
      {focused ? (
        <>
          <Image
            source={require('../../../assets/images/BottomTabEllipse.png')}
            style={styles.ellipse}
          />
          <View style={styles.ImgContainer}>
            <Image
              source={renderImage()}
              style={{
                width: iconName === 'healrFilesIcon' ? iconsize + 5 : iconsize,
                height: iconName === 'healrFilesIcon' ? iconsize + 5 : iconsize,
                tintColor: Colors.primaryColor,
              }}
            />
          </View>
        </>
      ) : (
        <Image
          source={renderImage()}
          style={{
            width: iconName === 'healrFilesIcon' ? iconsize + 5 : iconsize,
            height: iconName === 'healrFilesIcon' ? iconsize + 5 : iconsize,
            tintColor: Colors.secondaryColor,
          }}
        />
      )}
    </View>
  );
};

export default CircleComponent;

const styles = StyleSheet.create({
  ellipse: {
    top: -20,
    width: 114,
    height: 72,
    tintColor: Colors.secondaryColor,
  },
  ImgContainer: {
    top: -14,
    right: 28,
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tertiaryColor,
  },
});
