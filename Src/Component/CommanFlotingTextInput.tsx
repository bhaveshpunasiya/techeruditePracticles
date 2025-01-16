import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';
import colors from '../utils/Colors';
import { fontStyles } from '../utils/Fonts';

interface CustomFloatingTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'number-pad' | 'decimal-pad';
  secureTextEntry?: boolean;
  borderBottomColor?: string;
  borderBottomWidth?: number;
}

const CustomFloatingTextInput: React.FC<CustomFloatingTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  containerStyle,
  inputStyle,
  labelStyle,
  keyboardType = 'default',
  secureTextEntry = false,
  borderBottomColor = '#000',
  borderBottomWidth = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderBottomColor, borderBottomWidth },
      ]}
    >
      <Text
        style={[
          styles.label,
          isFocused || value ? styles.labelFocused : styles.labelBlurred,
          labelStyle,
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={isFocused ? placeholder : ''}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: horizontalScale(0),
    top: verticalScale(14),
    fontSize: moderateScale(16),
    color: '#333A42',
  },
  labelFocused: {
    top: verticalScale(-8),
    fontSize: moderateScale(12),
    color: colors.commanTxt,
    paddingTop:8
  },
  labelBlurred: {
    color: colors.commanTxt,
    fontFamily:fontStyles.fontFamily,
    fontWeight:"bold"
  },
  input: {
    fontSize: moderateScale(16),
    color: colors.black,
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
  },
});

export default CustomFloatingTextInput;
