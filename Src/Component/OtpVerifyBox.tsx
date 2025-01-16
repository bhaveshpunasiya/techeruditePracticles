import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../utils/scaling';
import colors from '../utils/Colors';

interface OTPInputProps {
  length: number;
  onChange: (otp: string[]) => void;  // Callback for OTP changes
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange }) => {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(''));

  // Handle OTP input change
  const handleChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
    onChange(updatedOtp);  // Pass updated OTP to the parent component
  };

  return (
    <View style={styles.inputContainer}>
      {otp?.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  input: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderColor: colors.primaryGrayColor,
    fontSize: moderateScale(20),
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.boxColors,
    marginTop: verticalScale(30),
  },
});

export default OTPInput;
