import { StyleSheet } from "react-native";
import colors from "../utils/Colors";
import { fontStyles } from "../utils/Fonts";
import { moderateScale, verticalScale, horizontalScale } from "../utils/scaling";

export const VerifyOtpScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    title: {
      fontSize: moderateScale(24),
      marginBottom: verticalScale(20),
      fontWeight: 'bold',
    },
    otpText: {
      marginTop: verticalScale(10),
      fontSize: moderateScale(18),
      color: colors.black,
    },
    loginContainer: {
      padding: 30,
      flex: 1,
    },
    inputContainer: {
      marginBottom: verticalScale(16),
    },
    bottomContainer: { justifyContent: "center", marginBottom: verticalScale(10) },
    bottomTxt: { fontSize: moderateScale(18), fontFamily: fontStyles.fontFamily },
    chekBoxWrapper: { flexDirection: "row", marginHorizontal: horizontalScale(10), marginTop: verticalScale(12) },
    otpInput: {
      width:horizontalScale(50),
      height:verticalScale(40),
      borderRadius: 8,
      borderColor: '#000',
      paddingHorizontal:horizontalScale(10),
      marginHorizontal:horizontalScale(5),
      textAlign: 'center',
      fontSize: moderateScale(20),
      textAlignVertical: 'center',
      backgroundColor:"#E2E9FF"
    },
  });
  