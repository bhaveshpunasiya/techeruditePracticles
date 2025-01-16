import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { fontStyles } from '../utils/Fonts';
import colors from '../utils/Colors';
import { moderateScale } from '../utils/scaling';

interface CommonTextProps {
  text: string;
  textStyle?: TextStyle; 
}

const CommonText: React.FC<CommonTextProps> = ({
  text,
  textStyle,
}) => {
  return (
    <Text
      style={[
        styles.text,
        textStyle, 
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color:colors.black,
    fontFamily:fontStyles.fontFamily,
    fontWeight:"bold",fontSize:moderateScale(35)
  },
});

export default CommonText;
