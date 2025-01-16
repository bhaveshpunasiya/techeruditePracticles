import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, TextStyle, ViewStyle, ActivityIndicator } from 'react-native';
import colors from '../utils/Colors';
import { fontStyles } from '../utils/Fonts';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activityIndicatorColor?: string; 
}

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  loading = false,
  buttonStyle,
  textStyle,
  activityIndicatorColor = colors.white,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={activityIndicatorColor} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.CommanBlue,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(50),
  },
  buttonText: {
    color: colors.white,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    fontFamily: fontStyles.fontFamily,
  },
});

export default CommonButton;
