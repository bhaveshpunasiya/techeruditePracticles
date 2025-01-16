import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import { verticalScale } from '../utils/scaling';

interface CommonDualImageProps {
  backgroundImage: any;
  overlayImage: any;
  backgroundStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ImageStyle>;
}

const CommonDualImage: React.FC<CommonDualImageProps> = ({
  backgroundImage,
  overlayImage,
  backgroundStyle,
  overlayStyle,
}) => {
  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.imageContainer, backgroundStyle]} 
    >
      <Image source={overlayImage} style={[styles.image, overlayStyle]} /> 
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: verticalScale(220),
    width: '100%',
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '75%',
    width: '45%',
    resizeMode:"contain"
  },
});

export default CommonDualImage;
