import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle } from 'react-native';
import { moderateScale, verticalScale } from '../utils/scaling';
import colors from '../utils/Colors';

interface CommonLinkTextProps {
  text: string;
  onPress: () => void; 
  textStyle?: TextStyle; 
}

const CommonLinkText: React.FC<CommonLinkTextProps> = ({ text, onPress, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.text,
          textStyle, 
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'flex-end',
    color: colors.blue,
    marginBottom: verticalScale(30),
    fontWeight: '800',
    fontSize:moderateScale(18),
  },
});

export default CommonLinkText;
